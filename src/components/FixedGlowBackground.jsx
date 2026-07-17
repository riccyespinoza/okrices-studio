"use client";

import React, { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform vec2 u_resolution;

  // Calibración para un fondo ultra oscuro y sobrio (Alineado con Okrices Studio)
  const vec3 colorDark      = vec3(7.0/255.0, 9.0/255.0, 11.0/255.0);
  const vec3 colorDeepNavy = vec3(13.0/255.0, 20.0/255.0, 25.0/255.0);
  const vec3 colorNavy     = vec3(10.0/255.0, 14.0/255.0, 18.0/255.0);
  const vec3 colorBlue     = vec3(22.0/255.0, 34.0/255.0, 46.0/255.0);
  const vec3 colorOrange   = vec3(165.0/255.0, 81.0/255.0, 48.0/255.0);

  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 1.0/7.0; 
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    
    // Tiempo estático (como lo tenías)
    float t = 35.0 * 0.15;

    float warpX = snoise(vec3(uv * 0.8, t)) * 0.45;
    float warpY = snoise(vec3(uv * 0.8 + 5.0, t * 0.9)) * 0.45;
    vec2 warpedUV = uv + vec2(warpX, warpY);
    
    warpedUV.x *= aspect;

    // Coordenadas puras de ESCRITORIO
    vec2 posOrangeLeft  = vec2(-0.1, -0.1);
    vec2 posOrangeRight = vec2(aspect * 1.2, 0.2);
    vec2 posBlueTop     = vec2(0.3, 0.9);
    vec2 posBlueBottom  = vec2(aspect * 0.7, 0.1);

    // Radios originales de escritorio
    float blobOrangeLeft  = smoothstep(0.65, 0.0, length(warpedUV - posOrangeLeft));
    float blobOrangeRight = smoothstep(0.65, 0.0, length(warpedUV - posOrangeRight));
    float blobBlueTop     = smoothstep(1.5, 0.0, length(warpedUV - posBlueTop));
    float blobBlueBottom  = smoothstep(1.4, 0.0, length(warpedUV - posBlueBottom));

    blobOrangeLeft  = pow(blobOrangeLeft, 2.5);
    blobOrangeRight = pow(blobOrangeRight, 2.5);
    blobBlueTop     = pow(blobBlueTop, 1.4);
    blobBlueBottom  = pow(blobBlueBottom, 1.6);

    float bgMix = clamp(uv.y * 0.7 + warpY * 0.4, 0.0, 1.0);
    vec3 finalColor = mix(colorDark, colorDeepNavy, smoothstep(0.0, 0.4, bgMix));
    finalColor = mix(finalColor, colorNavy, smoothstep(0.4, 1.0, bgMix));

    // Opacidades ultra oscuras originales
    finalColor = mix(finalColor, colorBlue, blobBlueTop * 0.42);
    finalColor = mix(finalColor, colorBlue, blobBlueBottom * 0.38);
    finalColor = mix(finalColor, colorOrange, blobOrangeLeft * 0.10);
    finalColor = mix(finalColor, colorOrange, blobOrangeRight * 0.12);

    float staticGrain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += (staticGrain - 0.5) * 0.018;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Error compilando shader fijo:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

export default function FixedGlowBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    const drawFrame = () => {
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      
      // Tomamos el tamaño de la ventana gráfica para que el shader calcule el aspecto correctamente
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      
      drawFrame();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      gl.deleteBuffer(positionBuffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
      
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] z-[-1] bg-[#07090b] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}