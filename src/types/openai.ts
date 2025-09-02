/**
 * Centralized OpenAI type definitions for function calling and structured output
 * These types represent the standardized OpenAI API formats used throughout the application
 */

/**
 * OpenAI schema property definition for structured output
 */
export interface OpenAISchemaProperty {
  type: string
  description?: string
  enum?: string[] | number[]
  items?: OpenAISchemaProperty
  properties?: Record<string, OpenAISchemaProperty>
  required?: string[]
  default?: unknown
}

/**
 * OpenAI structured output schema format
 * Used for constraining LLM responses to specific JSON structures
 */
export interface OpenAISchema {
  name: string
  schema: {
    type: 'object'
    properties: Record<string, OpenAISchemaProperty>
    required?: string[]
    additionalProperties: false
  }
}

/**
 * OpenAI function calling tool definition
 * Used for enabling function calling capabilities in LLMs
 */
export interface OpenAPITool {
  type: 'function'
  function: {
    name: string
    description: string
    parameters: {
      type: 'object'
      properties: Record<string, OpenAISchemaProperty>
      required?: string[]
    }
  }
}

/**
 * Database schema field structure (for conversion purposes)
 */
export interface SchemaField {
  name: string
  type?: string
  description?: string
  required?: boolean
  enum?: string[] | number[]
  default?: unknown
}
