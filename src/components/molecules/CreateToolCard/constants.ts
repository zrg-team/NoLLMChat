import { SchemaItemType } from '../CreateSchemaCard/Field/type'

export const PREDEFINE_TOOLS: {
  name: string
  description: string
  schema: SchemaItemType[]
  handler: string
}[] = [
  {
    name: 'speak',
    description: "Speak text using the browser's speech synthesis API.",
    handler: `
const text = input.text || '';
const voice = input.voice;
const utter = new window.SpeechSynthesisUtterance(text);
  if (voice) {
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.name === voice);
    if (match) utter.voice = match;
  }
window.speechSynthesis.speak(utter);
  `,
    schema: [
      {
        name: 'text',
        type: 'string',
        description: 'The text to speak.',
        required: true,
      },
      {
        name: 'voice',
        type: 'string',
        description: 'The voice to use for speech synthesis.',
        required: false,
      },
    ],
  },
  {
    name: 'get_location',
    description: 'Get the current location of the user.',
    handler: `
const location = await (new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      (err) => reject(err.message || "Geolocation error"),
    );
  }));
  return location;
`,
    schema: [],
  },
  {
    name: 'sleep',
    description: 'Sleep for a specified number of seconds.',
    handler: `
const seconds = input.seconds || 1;
await (new Promise((resolve) => setTimeout(resolve, seconds * 1000)));
`,
    schema: [
      {
        name: 'seconds',
        type: 'number',
        description: 'The number of seconds to sleep.',
        required: false,
      },
    ],
  },
  {
    name: 'get_time',
    description: 'Get the current date and time.',
    handler: `
const now = new Date();
return now.toISOString();
`,
    schema: [],
  },
  {
    name: 'math_eval',
    description: 'Evaluate a math expression.',
    handler: `
const expression = input.expression || '';
// Only allow numbers, spaces, and math symbols: + - * / % ( ) .
if (!/^[\\d\\s+\\-*/%.()]+$/.test(expression)) {
  throw new Error("Invalid characters in expression.");
}
return Function('"use strict";return (' + expression + ")")();
`,
    schema: [
      {
        name: 'expression',
        type: 'string',
        description: 'he math expression (e.g., \\"2 + 2 * (3 - 1)\\").',
        required: true,
      },
    ],
  },
]
