"use client";

import React from "react";
import Button from "@/components/Button";

export default function ContactForm({ locale, ctaBtnText }) {
  const isEn = locale === "en";

  // Fallback nativo: Si no viene texto desde Sanity, se asigna el texto editorial por defecto
  const resolvedButtonText = ctaBtnText || (isEn ? "Send Message" : "Enviar Mensaje");

  return (
    <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/50 font-sans">
            {isEn ? "Full Name" : "Nombre Completo"}
          </label>
          <input 
            type="text" 
            className="w-full bg-transparent border-b border-white/20 text-white py-3 px-2 focus:outline-none focus:border-studio-copper transition-colors font-light"
            placeholder={isEn ? "Jane Doe" : "Ej. Ana Pérez"}
          />
        </div>
        {/* Empresa */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/50 font-sans">
            {isEn ? "Company" : "Empresa"}
          </label>
          <input 
            type="text" 
            className="w-full bg-transparent border-b border-white/20 text-white py-3 px-2 focus:outline-none focus:border-studio-copper transition-colors font-light"
            placeholder={isEn ? "Your Company" : "Tu Empresa"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Correo */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/50 font-sans">
            {isEn ? "Email" : "Correo Electrónico"}
          </label>
          <input 
            type="email" 
            className="w-full bg-transparent border-b border-white/20 text-white py-3 px-2 focus:outline-none focus:border-studio-copper transition-colors font-light"
            placeholder="email@example.com"
          />
        </div>
        {/* Teléfono */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/50 font-sans">
            {isEn ? "Phone" : "Teléfono"}
          </label>
          <input 
            type="tel" 
            className="w-full bg-transparent border-b border-white/20 text-white py-3 px-2 focus:outline-none focus:border-studio-copper transition-colors font-light"
            placeholder="+1 234 567 890"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tipo de Servicio */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/50 font-sans">
            {isEn ? "Type of Service" : "Tipo de Servicio"}
          </label>
          <select className="w-full bg-transparent border-b border-white/20 text-white/80 py-3 px-2 focus:outline-none focus:border-studio-copper transition-colors font-light appearance-none rounded-none">
            <option value="" className="bg-[#0c0c0a]">{isEn ? "Select a service..." : "Selecciona un servicio..."}</option>
            <option value="branding" className="bg-[#0c0c0a]">Branding & Identity</option>
            <option value="web" className="bg-[#0c0c0a]">Web Design & Dev</option>
            <option value="ecommerce" className="bg-[#0c0c0a]">E-commerce</option>
            <option value="booking" className="bg-[#0c0c0a]">Booking System</option>
            <option value="other" className="bg-[#0c0c0a]">{isEn ? "Other / Combined" : "Otro / Combinado"}</option>
          </select>
        </div>
        {/* Presupuesto */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/50 font-sans">
            {isEn ? "Estimated Budget" : "Presupuesto Estimado"}
          </label>
          <select className="w-full bg-transparent border-b border-white/20 text-white/80 py-3 px-2 focus:outline-none focus:border-studio-copper transition-colors font-light appearance-none rounded-none">
            <option value="" className="bg-[#0c0c0a]">{isEn ? "Select budget range..." : "Selecciona un rango..."}</option>
            <option value="1k-3k" className="bg-[#0c0c0a]">$1,000 - $3,000</option>
            <option value="3k-5k" className="bg-[#0c0c0a]">$3,000 - $5,000</option>
            <option value="5k+" className="bg-[#0c0c0a]">$5,000+</option>
          </select>
        </div>
      </div>

      {/* URL actual */}
      <div className="flex flex-col space-y-2">
        <label className="text-xs uppercase tracking-widest text-white/50 font-sans">
          {isEn ? "Current Business URL (Optional)" : "URL Actual del Negocio (Opcional)"}
        </label>
        <input 
          type="url" 
          className="w-full bg-transparent border-b border-white/20 text-white py-3 px-2 focus:outline-none focus:border-studio-copper transition-colors font-light"
          placeholder="https://www.yourwebsite.com"
        />
      </div>

      {/* Mensaje */}
      <div className="flex flex-col space-y-2">
        <label className="text-xs uppercase tracking-widest text-white/50 font-sans">
          {isEn ? "Short Message" : "Mensaje Breve"}
        </label>
        <textarea 
          rows="4"
          className="w-full bg-transparent border-b border-white/20 text-white py-3 px-2 focus:outline-none focus:border-studio-copper transition-colors font-light resize-none"
          placeholder={isEn ? "Tell us a bit about your project..." : "Cuéntanos un poco sobre tu proyecto..."}
        ></textarea>
      </div>

      <div className="pt-6">
        <Button variant="primary" type="submit" className="w-full sm:w-auto px-10">
          {resolvedButtonText}
        </Button>
      </div>
    </form>
  );
}