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
    // Insert space before uppercase letters
    .replace(/([A-Z])/g, ' $1')
    // Capitalize first letter and trim any leading spaces
    .replace(/^./, str => str.toUpperCase())
    .trim();
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
