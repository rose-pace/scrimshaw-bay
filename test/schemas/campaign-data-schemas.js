/**
 * JSON Schemas for Campaign Data Objects
 * These schemas define the expected structure of various objects in data.js
 */

// Settlement Schema
export const settlementSchema = {
  type: 'object',
  required: ['name', 'type', 'population', 'description', 'notableLocations', 'keyNpcs', 'inhabitants', 'darkSecrets'],
  properties: {
    name: { type: 'string' },
    type: { type: 'string' },
    population: { type: 'string' },
    description: { type: 'string' },
    layout: {
      type: 'object',
      properties: {
        village_structure: { type: 'object' },
        districts: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'description', 'buildings'],
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              buildings: { type: 'array', items: { type: 'string' } }
            }
          }
        }
      }
    },
    notableLocations: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name', 'shortDesc', 'npcs', 'hasDetails'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          shortDesc: { type: 'string' },
          npcs: { type: 'array', items: { type: 'string' } },
          hasDetails: { type: 'boolean' }
        }
      }
    },
    keyNpcs: { type: 'array', items: { type: 'string' } },
    backgroundNpcs: { type: 'array', items: { type: 'string' } },
    inhabitants: { type: 'array', items: { type: 'string' } },
    darkSecrets: { type: 'array', items: { type: 'string' } }
  }
};

// Base NPC Schema (for minimal NPCs)
export const baseNpcSchema = {
  type: 'object',
  required: ['name', 'location', 'role', 'description'],
  properties: {
    name: { type: 'string' },
    location: { type: 'string' },
    role: { type: 'string' },
    description: { type: 'string' },
    secrets: { type: 'array', items: { type: 'string' } },
    abilities: { type: 'array', items: { type: 'string' } },
    motivations: { type: 'array', items: { type: 'string' } },
    quick_info: { type: 'array', items: { type: 'string' } },
    relatedThreats: { type: 'array', items: { type: 'string' } },
    relatedLocations: { type: 'array', items: { type: 'string' } },
    relatedEvents: { type: 'array', items: { type: 'string' } },
    knowledge: {
      type: 'array',
      items: {
        type: 'object',
        required: ['topic', 'info'],
        properties: {
          topic: { type: 'string' },
          info: { type: 'string' }
        }
      }
    },
    services: { type: 'array', items: { type: 'string' } }
  }
};

// Location Schema
export const locationSchema = {
  type: 'object',
  required: ['id', 'name', 'settlement', 'type', 'description', 'publicDescription'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    settlement: { type: 'string' },
    type: { type: 'string' },
    description: { type: 'string' },
    publicDescription: { type: 'string' },
    layout: {
      type: 'object',
      properties: {
        groups: {
          type: 'array',
          items: {
            type: 'object',
            required: ['title', 'type', 'items'],
            properties: {
              title: { type: 'string' },
              type: { type: 'string' },
              items: { type: 'array' }
            }
          }
        },
        areas: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'description'],
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              features: { type: 'array', items: { type: 'string' } }
            }
          }
        }
      }
    },
    npcs: { type: 'array', items: { type: 'string' } },
    inventory: {
      type: 'object',
      properties: {
        drinks: {
          type: 'array',
          items: {
            type: 'object',
            required: ['item', 'price'],
            properties: {
              item: { type: 'string' },
              price: { type: 'string' },
              quality: { type: 'string' },
              description: { type: 'string' }
            }
          }
        },
        food: {
          type: 'array',
          items: {
            type: 'object',
            required: ['item', 'price'],
            properties: {
              item: { type: 'string' },
              price: { type: 'string' },
              description: { type: 'string' }
            }
          }
        },
        services: {
          type: 'array',
          items: {
            type: 'object',
            required: ['service', 'price'],
            properties: {
              service: { type: 'string' },
              price: { type: 'string' },
              description: { type: 'string' }
            }
          }
        },
        valuable_items: {
          type: 'array',
          items: {
            type: 'object',
            required: ['item', 'location', 'value', 'description'],
            properties: {
              item: { type: 'string' },
              location: { type: 'string' },
              value: { type: 'string' },
              description: { type: 'string' }
            }
          }
        },
        corrupted_substances: {
          type: 'array',
          items: {
            type: 'object',
            required: ['item', 'location', 'danger', 'description'],
            properties: {
              item: { type: 'string' },
              location: { type: 'string' },
              danger: { type: 'string' },
              description: { type: 'string' }
            }
          }
        }
      }
    },
    secrets: {
      type: 'object',
      properties: {
        gmNotes: { type: 'string' },
        hiddenItems: {
          type: 'array',
          items: {
            type: 'object',
            required: ['item', 'location', 'description'],
            properties: {
              item: { type: 'string' },
              location: { type: 'string' },
              description: { type: 'string' }
            }
          }
        },
        secretDoors: { type: 'array', items: { type: 'string' } },
        traps: { type: 'array', items: { type: 'string' } },
        observations: { type: 'array', items: { type: 'string' } }
      }
    },
    inhabitants: { type: 'array', items: { type: 'string' } },
    questHooks: { type: 'array', items: { type: 'string' } },
    relatedThreats: { type: 'array', items: { type: 'string' } },
    relatedEvents: { type: 'array', items: { type: 'string' } }
  }
};

// Threat Schema
export const threatSchema = {
  type: 'object',
  required: ['name', 'type', 'description', 'corruptionLevel'],
  properties: {
    name: { type: 'string' },
    type: { type: 'string' },
    description: { type: 'string' },
    abilities: { type: 'array', items: { type: 'string' } },
    influence: { type: 'array', items: { type: 'string' } },
    effects: { type: 'array', items: { type: 'string' } },
    process: { type: 'array', items: { type: 'string' } },
    stages: { type: 'array', items: { type: 'string' } },
    creatures: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'cr', 'description'],
        properties: {
          name: { type: 'string' },
          cr: { type: 'string' },
          description: { type: 'string' },
          abilities: { type: 'array', items: { type: 'string' } }
        }
      }
    },
    encounter_notes: { type: 'array', items: { type: 'string' } },
    stats: { type: 'string' },
    gameStats: { type: 'string' },
    timeline: { type: 'string' },
    affectedNpcs: { type: 'array', items: { type: 'string' } },
    affectedLocations: { type: 'array', items: { type: 'string' } },
    affectedSettlements: { type: 'array', items: { type: 'string' } },
    relatedEvents: { type: 'array', items: { type: 'string' } },
    relatedThreats: { type: 'array', items: { type: 'string' } },
    corruptionLevel: { type: 'string' }
  }
};

// Event Schema
export const eventSchema = {
  type: 'object',
  required: ['name', 'description', 'trigger'],
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    trigger: { type: 'string' },
    outcomes: { type: 'array', items: { type: 'string' } },
    hooks: { type: 'array', items: { type: 'string' } },
    ritual_requirements: { type: 'array', items: { type: 'string' } },
    encounter_table: { type: 'array', items: { type: 'string' } },
    gulpgrin_details: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        mechanics: { type: 'string' }
      }
    },
    winter_court_clues: {
      type: 'object',
      properties: {
        observation: { type: 'string' },
        arcana_check: { type: 'string' },
        implications: { type: 'string' }
      }
    },
    relatedNpcs: { type: 'array', items: { type: 'string' } },
    relatedLocations: { type: 'array', items: { type: 'string' } },
    relatedThreats: { type: 'array', items: { type: 'string' } }
  }
};

// Lore Schema
export const loreSchema = {
  type: 'object',
  required: ['title', 'content', 'connections'],
  properties: {
    title: { type: 'string' },
    content: { type: 'string' },
    connections: { type: 'array', items: { type: 'string' } }
  }
};

/**
 * Validate object against JSON schema
 * @param {Object} obj - Object to validate
 * @param {Object} schema - JSON schema to validate against
 * @returns {{ valid: boolean, errors: Array<string> }}
 */
export function validateSchema(obj, schema) {
  const errors = [];
  
  function validateProperty(value, propSchema, path = '') {
    if (propSchema.type === 'object') {
      if (typeof value !== 'object' || value === null) {
        errors.push(`${path}: Expected object, got ${typeof value}`);
        return;
      }
      
      // Check required properties
      if (propSchema.required) {
        for (const required of propSchema.required) {
          if (!(required in value)) {
            errors.push(`${path}: Missing required property '${required}'`);
          }
        }
      }
      
      // Validate properties
      if (propSchema.properties) {
        for (const [key, subSchema] of Object.entries(propSchema.properties)) {
          if (key in value) {
            validateProperty(value[key], subSchema, path ? `${path}.${key}` : key);
          }
        }
      }
    } else if (propSchema.type === 'array') {
      if (!Array.isArray(value)) {
        errors.push(`${path}: Expected array, got ${typeof value}`);
        return;
      }
      
      if (propSchema.items) {
        value.forEach((item, index) => {
          validateProperty(item, propSchema.items, `${path}[${index}]`);
        });
      }
    } else if (propSchema.type === 'string') {
      if (typeof value !== 'string') {
        errors.push(`${path}: Expected string, got ${typeof value}`);
      }
    } else if (propSchema.type === 'boolean') {
      if (typeof value !== 'boolean') {
        errors.push(`${path}: Expected boolean, got ${typeof value}`);
      }
    } else if (propSchema.type === 'number') {
      if (typeof value !== 'number') {
        errors.push(`${path}: Expected number, got ${typeof value}`);
      }
    }
  }
  
  validateProperty(obj, schema);
  
  return {
    valid: errors.length === 0,
    errors
  };
}
