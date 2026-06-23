'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'Okrices Studio CMS',

  // Conexión segura con las variables de tu archivo .env.local
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio', // La ruta integrada elegida para tu panel

  plugins: [
    structureTool(), 
    visionTool({ defaultApiVersion: '2026-06-23' })
  ],

  schema: {
    types: schema.types,
  },
})