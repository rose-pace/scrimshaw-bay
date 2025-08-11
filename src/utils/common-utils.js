/**
 * String utility functions for text processing and formatting
 */

/**
 * Converts camelCase string to readable words
 * @param {string} camelCaseStr - String in camelCase format
 * @returns {string} Human-readable string with proper capitalization
 * 
 * @example
 * camelCaseToWords('gmNotes') // 'GM Notes'
 * camelCaseToWords('hiddenItems') // 'Hidden Items'
 * camelCaseToWords('secretPassages') // 'Secret Passages'
 */
export const camelCaseToWords = (camelCaseStr) => {
  return camelCaseStr
    // Replace underscores with spaces
    .replace(/_/g, ' ')
    // Insert space before uppercase letters
    .replace(/([A-Z])/g, ' $1')
    // Clean up multiple spaces and trim
    .replace(/\s+/g, ' ')
    .trim()
    // Convert to lowercase
    .toLowerCase();
};

/**
 * Processes a dynamic object into HTML list items based on value types
 * @param {Object} obj - Object to process
 * @param {Object} options - Processing options
 * @param {Function} options.keyFormatter - Function to format keys (defaults to camelCaseToWords)
 * @param {Object} options.specialHandlers - Object with key-specific handlers
 * @returns {Array<string>} Array of HTML list item strings
 * 
 * @example
 * processObjectToList({
 *   gmNotes: "Some secret info",
 *   hiddenItems: [{item: "Key", location: "Desk", description: "Opens vault"}],
 *   secretPassages: ["Behind bookshelf", "Under stairs"]
 * })
 */
export const processObjectToList = (obj, options = {}) => {
  const {
    keyFormatter = camelCaseToWords,
    specialHandlers = {}
  } = options;
  
  const items = [];
  
  Object.entries(obj).forEach(([key, value]) => {
    // Check for special handler first
    if (specialHandlers[key]) {
      const result = specialHandlers[key](value, key);
      if (Array.isArray(result)) {
        items.push(...result);
      } else if (result) {
        items.push(result);
      }
      return;
    }
    
    // Generic type-based processing
    const formattedKey = keyFormatter(key);
    
    if (Array.isArray(value)) {
      // Handle arrays - each item gets its own entry
      value.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          // For objects, try to extract meaningful info
          const displayText = item.description || item.name || item.item || JSON.stringify(item);
          const location = item.location ? ` (${item.location})` : '';
          const prefix = item.item || item.name ? `<strong>${item.item || item.name}</strong>` : `<strong>${formattedKey}:</strong>`;
          items.push(`${prefix}${location}: ${displayText}`);
        } else {
          items.push(`<strong>${formattedKey}:</strong> ${item}`);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      // For nested objects, recursively process
      const nestedItems = processObjectToList(value, options);
      items.push(`<strong>${formattedKey}:</strong><ul>${nestedItems.map(item => `<li>${item}</li>`).join('')}</ul>`);
    } else if (value && typeof value === 'string') {
      // Handle string values
      items.push(`<strong>${formattedKey}:</strong> ${value}`);
    }
  });
  
  return items;
};

/**
 * Converts an array to HTML list items with optional formatting
 * @param {Array} items - Array of items to convert
 * @param {Object} options - Formatting options
 * @param {Function} options.formatter - Custom formatter function for each item
 * @param {string} options.itemWrapper - HTML wrapper for each item (default: 'li')
 * @returns {string} HTML string of formatted list items
 * 
 * @example
 * arrayToHtmlList(['item1', 'item2']) // '<li>item1</li><li>item2</li>'
 * arrayToHtmlList(items, { 
 *   formatter: item => `<strong>${item}</strong>`,
 *   itemWrapper: 'div'
 * })
 */
export const arrayToHtmlList = (items, options = {}) => {
  if (!Array.isArray(items) || items.length === 0) return '';
  
  const {
    formatter = (item) => item,
    itemWrapper = 'li',
    escapeHtml = true
  } = options;
  
  const escapeHtmlChars = (str) => {
    if (!escapeHtml) return str;
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  };
  
  return items
    .map(item => {
      const formattedItem = formatter(escapeHtmlChars(item));
      return `<${itemWrapper}>${formattedItem}</${itemWrapper}>`;
    })
    .join('');
};

/**
 * Processes multiple object properties into HTML lists
 * @param {Object} obj - Object containing arrays to process
 * @param {Object} fieldConfigs - Configuration for each field
 * @returns {Object} Object with processed HTML strings
 * 
 * @example
 * processArrayFields(npc, {
 *   services: {},
 *   abilities: { formatter: ability => `<strong>${ability}</strong>` },
 *   secrets: { checkLength: true }
 * })
 */
export const processArrayFields = (obj, fieldConfigs) => {
  const result = {};
  
  // Handle null/undefined inputs
  if (!obj || !fieldConfigs) {
    return result;
  }
  
  Object.entries(fieldConfigs).forEach(([fieldName, config]) => {
    const {
      formatter,
      itemWrapper = 'li',
      checkLength = false,
      fallback = ''
    } = config;
    
    const fieldValue = obj[fieldName];
    
    // Special handling for quick_info field - create tags instead of list
    if (fieldName === 'quick_info' && Array.isArray(fieldValue)) {
      const tagsHtml = fieldValue.map(info => 
        `<span class="quick-info-tag">${info}</span>`
      ).join('');
      
      result[`${fieldName}List`] = tagsHtml || fallback;
      
      if (checkLength) {
        result[`${fieldName}HasItems`] = fieldValue && fieldValue.length > 0;
      }
      return;
    }
    
    // Only process if fieldValue is actually an array
    if (!Array.isArray(fieldValue)) {
      result[`${fieldName}List`] = fallback;
      if (checkLength) {
        result[`${fieldName}HasItems`] = false;
      }
      return;
    }
    
    const listHtml = arrayToHtmlList(fieldValue, { formatter, itemWrapper });
    
    result[`${fieldName}List`] = listHtml || fallback;
    
    if (checkLength) {
      result[`${fieldName}HasItems`] = fieldValue && fieldValue.length > 0;
    }
  });
  
  return result;
};

/**
 * Filters NPCs based on search text with weighted scoring
 * @param {Array<Object>} npcs - Array of NPC objects to filter
 * @param {string} filterText - Text to search for (case-insensitive)
 * @returns {Array<Object>} Filtered and sorted array of {filterScore, value} objects
 * 
 * Scoring weights:
 * - name: 4 points
 * - location: 4 points  
 * - role: 2 points
 * - description: 1 point
 * 
 * @example
 * const npcs = [{name: 'John', location: 'Harbor', role: 'Fisher', description: 'A fisherman'}];
 * filterNpcs(npcs, 'fish') // Returns [{filterScore: 3, value: npcObject}]
 */
export const filterNpcs = (npcs, filterText) => {
  if (!filterText || typeof filterText !== 'string' || filterText.trim() === '') {
    return [];
  }

  const searchTerm = filterText.toLowerCase().trim();
  const results = [];

  npcs.forEach(npc => {
    let score = 0;

    // Search in name (weight: 4)
    if (npc.name && npc.name.toLowerCase().includes(searchTerm)) {
      score += 4;
    }

    // Search in location (weight: 4)
    if (npc.location && npc.location.toLowerCase().includes(searchTerm)) {
      score += 4;
    }

    // Search in role (weight: 2)
    if (npc.role && npc.role.toLowerCase().includes(searchTerm)) {
      score += 2;
    }

    // Search in description (weight: 1)
    if (npc.description && npc.description.toLowerCase().includes(searchTerm)) {
      score += 1;
    }

    // Only include results with score > 0
    if (score > 0) {
      results.push({
        filterScore: score,
        value: npc
      });
    }
  });

  // Sort by filterScore in descending order
  return results.sort((a, b) => b.filterScore - a.filterScore);
};
