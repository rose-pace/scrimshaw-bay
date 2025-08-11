import { describe, it, expect } from 'vitest';
import { 
  camelCaseToWords,
  processObjectToList,
  arrayToHtmlList,
  processArrayFields,
  filterNpcs
} from '@/utils/common-utils.js';

describe('Common Utils', () => {
  describe('camelCaseToWords', () => {
    it('should convert basic camelCase to words', () => {
      expect(camelCaseToWords('camelCase')).toBe('camel case');
    });

    it('should return single word unchanged', () => {
      expect(camelCaseToWords('word')).toBe('word');
    });

    it('should convert PascalCase to words', () => {
      expect(camelCaseToWords('PascalCase')).toBe('pascal case');
    });

    it('should convert complex camelCase correctly', () => {
      expect(camelCaseToWords('thisIsALongVariableName')).toBe('this is a long variable name');
    });

    it('should handle empty string', () => {
      expect(camelCaseToWords('')).toBe('');
    });

    it('should handle single character', () => {
      expect(camelCaseToWords('a')).toBe('a');
    });

    it('should convert underscores to spaces', () => {
      expect(camelCaseToWords('ritual_requirements')).toBe('ritual requirements');
    });
  });

  describe('arrayToHtmlList', () => {
    it('should convert basic array to HTML list items', () => {
      const basicArray = ['item1', 'item2', 'item3'];
      const result = arrayToHtmlList(basicArray);
      expect(result).toBe('<li>item1</li><li>item2</li><li>item3</li>');
    });

    it('should handle empty array', () => {
      expect(arrayToHtmlList([])).toBe('');
    });

    it('should handle array with one item', () => {
      expect(arrayToHtmlList(['single'])).toBe('<li>single</li>');
    });

    it('should handle arrays with objects by converting to string representation', () => {
      const objArray = [{ name: 'item1' }, { name: 'item2' }];
      const result = arrayToHtmlList(objArray);
      expect(result).toContain('<li>[object Object]</li>');
    });

    it('should handle custom formatter', () => {
      const array = ['item1', 'item2'];
      const formatter = (item) => item.toUpperCase();
      const result = arrayToHtmlList(array, { formatter });
      expect(result).toBe('<li>ITEM1</li><li>ITEM2</li>');
    });

    it('should handle custom item wrapper', () => {
      const array = ['item1'];
      const result = arrayToHtmlList(array, { itemWrapper: 'div' });
      expect(result).toBe('<div>item1</div>');
    });
  });

  describe('processObjectToList', () => {
    it('should process basic object with default formatting', () => {
      const testObj = {
        gmNotes: 'Some secret info',
        hiddenItems: [{ item: 'Key', location: 'Desk' }],
        simpleArray: ['item1', 'item2']
      };
      const result = processObjectToList(testObj);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      // Should contain formatted keys
      expect(result.some(item => item.includes('gm notes'))).toBe(true);
    });

    it('should handle empty object', () => {
      const result = processObjectToList({});
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should apply custom key formatter', () => {
      const testObj = { testKey: 'value' };
      const formatter = (key) => key.toUpperCase();
      const result = processObjectToList(testObj, { keyFormatter: formatter });
      
      expect(result.some(item => item.includes('TESTKEY'))).toBe(true);
    });

    it('should handle special handlers for specific keys', () => {
      const testObj = {
        normalKey: 'normal value',
        arrayKey: ['item1', 'item2']
      };
      const specialHandlers = {
        arrayKey: (value) => `Array with ${value.length} items`
      };
      const result = processObjectToList(testObj, { specialHandlers });
      
      expect(result.some(item => item.includes('Array with 2 items'))).toBe(true);
    });
  });

  describe('processArrayFields', () => {
    it('should process multiple array fields with length checks', () => {
      const testData = {
        services: ['Blacksmith', 'Weapon repair'],
        secrets: ['Hidden knowledge', 'Ancient ritual'],
        empty: [],
        notArray: 'not an array'
      };

      const fieldConfig = {
        services: { checkLength: true },
        secrets: { checkLength: true },
        empty: { checkLength: true },
        notArray: { checkLength: true }
      };

      const result = processArrayFields(testData, fieldConfig);

      // Check list generation
      expect(result.servicesList).toBe('<li>Blacksmith</li><li>Weapon repair</li>');
      expect(result.secretsList).toBe('<li>Hidden knowledge</li><li>Ancient ritual</li>');
      expect(result.emptyList).toBe('');

      // Check hasItems flags
      expect(result.servicesHasItems).toBe(true);
      expect(result.secretsHasItems).toBe(true);
      expect(result.emptyHasItems).toBe(false);
      expect(result.notArrayHasItems).toBe(false);

      // Note: Original object properties are NOT preserved in this function
      expect(result.services).toBeUndefined();
      expect(result.notArray).toBeUndefined();
    });

    it('should handle fields without length check requirement', () => {
      const testData = {
        items: ['item1', 'item2']
      };

      const fieldConfig = {
        items: { checkLength: false }
      };

      const result = processArrayFields(testData, fieldConfig);
      expect(result.itemsList).toBe('<li>item1</li><li>item2</li>');
      expect(result.itemsHasItems).toBeUndefined();
    });

    it('should handle empty field configuration', () => {
      const testData = {
        items: ['item1', 'item2']
      };

      const result = processArrayFields(testData, {});
      expect(result).toEqual({});
    });

    it('should handle null/undefined inputs', () => {
      expect(processArrayFields(null, {})).toEqual({});
      expect(processArrayFields({}, null)).toEqual({});
      expect(processArrayFields(null, null)).toEqual({});
    });

    it('should handle quick_info field specially', () => {
      const testData = {
        quick_info: ['tag1', 'tag2']
      };

      const fieldConfig = {
        quick_info: { checkLength: true }
      };

      const result = processArrayFields(testData, fieldConfig);
      expect(result.quick_infoList).toBe('<span class="quick-info-tag">tag1</span><span class="quick-info-tag">tag2</span>');
      expect(result.quick_infoHasItems).toBe(true);
    });

    it('should handle custom formatters', () => {
      const testData = {
        abilities: ['strength', 'wisdom']
      };

      const fieldConfig = {
        abilities: { 
          formatter: (ability) => ability.toUpperCase(),
          checkLength: true 
        }
      };

      const result = processArrayFields(testData, fieldConfig);
      expect(result.abilitiesList).toBe('<li>STRENGTH</li><li>WISDOM</li>');
      expect(result.abilitiesHasItems).toBe(true);
    });

    it('should handle arrays with objects (converts to string)', () => {
      const testData = {
        locations: [
          { name: 'Location 1', type: 'building' },
          { name: 'Location 2', type: 'landmark' }
        ],
        simpleArray: ['a', 'b', 'c']
      };

      const fieldConfig = {
        locations: { checkLength: true },
        simpleArray: { checkLength: true }
      };

      const result = processArrayFields(testData, fieldConfig);
      expect(result.locationsHasItems).toBe(true);
      expect(result.simpleArrayHasItems).toBe(true);
      // Objects get converted to [object Object] when stringified
      expect(result.locationsList).toContain('[object Object]');
      expect(result.simpleArrayList).toBe('<li>a</li><li>b</li><li>c</li>');
    });
  });

  describe('filterNpcs', () => {
    const mockNpcs = [
      {
        name: 'Captain Ahab',
        location: 'Whaling Ship',
        role: 'Ship Captain',
        description: 'An obsessed sea captain hunting the white whale'
      },
      {
        name: 'Ishmael',
        location: 'Harbor District',
        role: 'Narrator & Sailor',
        description: 'A young sailor with tales of the sea'
      },
      {
        name: 'Queequeg',
        location: 'Inn',
        role: 'Harpooner',
        description: 'Skilled harpooner from distant lands'
      },
      {
        name: 'Father Mapple',
        location: 'Whaleman Chapel',
        role: 'Priest',
        description: 'A preacher who delivers sermons about whaling'
      },
      {
        name: 'Flask',
        location: 'Harbor District', 
        role: 'Third Mate',
        description: 'A short and stocky sailor aboard the ship'
      }
    ];

    it('should return empty array for empty or invalid filter text', () => {
      expect(filterNpcs(mockNpcs, '')).toEqual([]);
      expect(filterNpcs(mockNpcs, '   ')).toEqual([]);
      expect(filterNpcs(mockNpcs, null)).toEqual([]);
      expect(filterNpcs(mockNpcs, undefined)).toEqual([]);
    });

    it('should filter by name with highest score (4)', () => {
      const results = filterNpcs(mockNpcs, 'ahab');
      expect(results).toHaveLength(1);
      expect(results[0].filterScore).toBe(4);
      expect(results[0].value.name).toBe('Captain Ahab');
    });

    it('should filter by location with high score (4)', () => {
      const results = filterNpcs(mockNpcs, 'harbor');
      expect(results).toHaveLength(2);
      expect(results[0].filterScore).toBe(4);
      expect(results[1].filterScore).toBe(4);
      expect(results.map(r => r.value.name)).toContain('Ishmael');
      expect(results.map(r => r.value.name)).toContain('Flask');
    });

    it('should filter by role with medium score (2)', () => {
      const results = filterNpcs(mockNpcs, 'priest');
      expect(results).toHaveLength(1);
      expect(results[0].filterScore).toBe(2);
      expect(results[0].value.name).toBe('Father Mapple');
    });

    it('should filter by description with low score (1)', () => {
      const results = filterNpcs(mockNpcs, 'sailor');
      expect(results).toHaveLength(2);
      // Should contain both Ishmael and Flask
      const names = results.map(r => r.value.name);
      expect(names).toContain('Ishmael');
      expect(names).toContain('Flask');
      // Ishmael matches both role (2) and description (1) = 3
      // Flask matches only description (1) = 1
      const ishmaelResult = results.find(r => r.value.name === 'Ishmael');
      const flaskResult = results.find(r => r.value.name === 'Flask');
      expect(ishmaelResult.filterScore).toBe(3);
      expect(flaskResult.filterScore).toBe(1);
    });

    it('should combine scores from multiple field matches', () => {
      const results = filterNpcs(mockNpcs, 'captain');
      expect(results).toHaveLength(1);
      // Should match name (Captain Ahab: 4) + role (Ship Captain: 2) + description (sea captain: 1) = 7
      expect(results[0].filterScore).toBe(7);
      expect(results[0].value.name).toBe('Captain Ahab');
    });

    it('should be case-insensitive', () => {
      const results = filterNpcs(mockNpcs, 'HARBOR');
      expect(results).toHaveLength(2);
      expect(results[0].filterScore).toBe(4);
      expect(results[1].filterScore).toBe(4);
    });

    it('should sort results by filterScore in descending order', () => {
      const results = filterNpcs(mockNpcs, 'whale');
      expect(results).toHaveLength(2);
      // Father Mapple: location (Whaleman Chapel: 4) = 4
      // Captain Ahab: description (white whale: 1) = 1
      expect(results[0].filterScore).toBeGreaterThan(results[1].filterScore);
      expect(results[0].value.name).toBe('Father Mapple');
      expect(results[1].value.name).toBe('Captain Ahab');
    });

    it('should handle partial matches correctly', () => {
      const results = filterNpcs(mockNpcs, 'harp');
      expect(results).toHaveLength(1);
      expect(results[0].filterScore).toBe(3); // role (Harpooner: 2) + description (harpooner: 1)
      expect(results[0].value.name).toBe('Queequeg');
    });

    it('should return empty array when no matches found', () => {
      const results = filterNpcs(mockNpcs, 'nonexistent');
      expect(results).toEqual([]);
    });

    it('should handle empty NPC array', () => {
      const results = filterNpcs([], 'test');
      expect(results).toEqual([]);
    });

    it('should handle NPCs with missing fields gracefully', () => {
      const incompleteNpcs = [
        { name: 'John' }, // missing location, role, description
        { location: 'Harbor' }, // missing name, role, description
        { role: 'Captain' }, // missing name, location, description
        { description: 'A sailor' } // missing name, location, role
      ];
      
      const results = filterNpcs(incompleteNpcs, 'harbor');
      expect(results).toHaveLength(1);
      expect(results[0].filterScore).toBe(4);
      expect(results[0].value.location).toBe('Harbor');
    });

    it('should trim whitespace from search term', () => {
      const results = filterNpcs(mockNpcs, '  ahab  ');
      expect(results).toHaveLength(1);
      expect(results[0].value.name).toBe('Captain Ahab');
    });
  });
});
