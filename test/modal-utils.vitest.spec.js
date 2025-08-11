import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  createNetworkLinks,
  createModalHeader,
  processModalFields,
  NETWORK_CONFIGS,
  MODAL_FIELD_CONFIGS 
} from '@/utils/modal-utils.js';

// Mock the DataService
vi.mock('@/services/data-service.js', () => ({
  DataService: vi.fn().mockImplementation(() => ({
    getNpc: vi.fn((key) => ({ name: `NPC ${key}` })),
    getLocation: vi.fn((key) => ({ name: `Location ${key}` })),
    getThreat: vi.fn((key) => ({ name: `Threat ${key}` })),
    getEvent: vi.fn((key) => ({ name: `Event ${key}` })),
    getSettlement: vi.fn((key) => ({ name: `Settlement ${key}` })),
    getEntityDetails: vi.fn(),
    processEntityForDisplay: vi.fn(),
    data: {}
  }))
}));

// Also mock data import used by DataService
vi.mock('@/data/data.js', () => ({
  campaignData: {}
}));

describe('Modal Utils', () => {
  describe('NETWORK_CONFIGS', () => {
    it('should have configurations for all entity types', () => {
      expect(NETWORK_CONFIGS.npc).toBeDefined();
      expect(NETWORK_CONFIGS.threat).toBeDefined();
      expect(NETWORK_CONFIGS.location).toBeDefined();
      expect(NETWORK_CONFIGS.event).toBeDefined();
    });

    it('should have valid configuration structure', () => {
      Object.values(NETWORK_CONFIGS).forEach(config => {
        expect(Array.isArray(config)).toBe(true);
        config.forEach(link => {
          expect(link).toHaveProperty('entityField');
          expect(link).toHaveProperty('type');
          expect(link).toHaveProperty('title');
          expect(link).toHaveProperty('icon');
        });
      });
    });
  });

  describe('MODAL_FIELD_CONFIGS', () => {
    it('should have configurations for all entity types', () => {
      expect(MODAL_FIELD_CONFIGS.npc).toBeDefined();
      expect(MODAL_FIELD_CONFIGS.threat).toBeDefined();
      expect(MODAL_FIELD_CONFIGS.location).toBeDefined();
      expect(MODAL_FIELD_CONFIGS.event).toBeDefined();
    });

    it('should have valid field configuration structure', () => {
      Object.values(MODAL_FIELD_CONFIGS).forEach(config => {
        Object.values(config).forEach(fieldConfig => {
          if (fieldConfig.checkLength !== undefined) {
            expect(typeof fieldConfig.checkLength).toBe('boolean');
          }
        });
      });
    });
  });

  describe('createNetworkLinks', () => {
    it('should create network links for array of items', () => {
      const items = ['ally1', 'ally2'];
      const result = createNetworkLinks(items, 'npc');
      
      expect(result).toContain('ally1');
      expect(result).toContain('ally2');
      expect(result).toContain('network-link');
      expect(result).toContain('npc-link');
    });

    it('should handle empty array', () => {
      const result = createNetworkLinks([], 'npc');
      expect(result).toBe('');
    });

    it('should handle null/undefined items', () => {
      expect(createNetworkLinks(null, 'npc')).toBe('');
      expect(createNetworkLinks(undefined, 'npc')).toBe('');
    });

    it('should handle unknown entity type', () => {
      const result = createNetworkLinks(['item1'], 'unknown');
      expect(result).toBe('');
    });

    it('should create spans when asButtons is false', () => {
      const items = ['ally1'];
      const result = createNetworkLinks(items, 'npc', { asButtons: false });
      
      expect(result).toContain('<span');
      expect(result).not.toContain('<button');
    });
  });

  describe('createModalHeader', () => {
    const mockEntity = {
      name: 'Test Entity',
      quick_info: ['tag1', 'tag2'],
      type: 'Noble'
    };

    it('should create header with name', () => {
      const result = createModalHeader(mockEntity, {});
      
      expect(result).toContain('Test Entity');
      expect(result).toContain('<h2>');
    });

    it('should handle custom config with tagText', () => {
      const config = { tagText: 'Noble', tagClass: 'custom-tag' };
      const result = createModalHeader(mockEntity, config);
      
      expect(result).toContain('Test Entity');
      expect(result).toContain('Noble');
      expect(result).toContain('custom-tag');
    });

    it('should handle entity without name', () => {
      const entityNoName = { type: 'Test' };
      const result = createModalHeader(entityNoName, {});
      
      expect(result).toContain('undefined');
      expect(result).toContain('<h2>');
    });
  });

  describe('processModalFields', () => {
    const mockEntity = {
      abilities: ['ability1', 'ability2'],
      secrets: ['secret1'],
      empty_array: [],
      string_field: 'test string',
      number_field: 42
    };

    it('should process array fields according to configuration', () => {
      const result = processModalFields(mockEntity, MODAL_FIELD_CONFIGS.npc);
      
      expect(result.abilitiesList).toContain('ability1');
      expect(result.abilitiesList).toContain('ability2');
      expect(result.abilitiesHasItems).toBe(true);
      
      expect(result.secretsList).toContain('secret1');
      expect(result.secretsHasItems).toBe(true);
    });

    it('should handle entity without configured fields', () => {
      const result = processModalFields({}, MODAL_FIELD_CONFIGS.npc);
      expect(typeof result).toBe('object');
    });

    it('should handle knowledge array specially', () => {
      const entityWithKnowledge = {
        knowledge: [
          { topic: 'History', info: 'Ancient knowledge' },
          { topic: 'Magic', info: 'Spellcasting secrets' }
        ]
      };
      const result = processModalFields(entityWithKnowledge, {});
      
      expect(result.knowledgeList).toContain('History');
      expect(result.knowledgeList).toContain('Ancient knowledge');
      expect(result.knowledgeHasItems).toBe(true);
    });

    it('should handle creatures array for threats', () => {
      const threatWithCreatures = {
        creatures: [
          { name: 'Goblin', cr: 1, description: 'Small humanoid', abilities: ['Stealth', 'Nimble'] }
        ]
      };
      const result = processModalFields(threatWithCreatures, {});
      
      expect(result.creatureList).toContain('Goblin');
      expect(result.creatureList).toContain('CR 1');
      expect(result.creaturesHasItems).toBe(true);
    });
  });
});
