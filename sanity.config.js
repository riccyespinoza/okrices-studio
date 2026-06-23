'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Importamos de forma segura las variables y los esquemas desde tus carpetas nativas reales
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Okrices Studio CMS',

  // Conexión limpia usando tus archivos de entorno nativos
  projectId,
  dataset,

  basePath: '/studio', // La ruta integrada que elegiste para tu panel

  plugins: [
    structureTool(), 
    visionTool({ defaultApiVersion: apiVersion })
  ],

  schema,
})