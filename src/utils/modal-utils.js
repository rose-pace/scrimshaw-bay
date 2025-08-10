/**
 * Utility functions for modal components
 * Provides shared functionality to eliminate code duplication across modal implementations
 */

import { DataService } from '@/services/data-service.js';
import { processArrayFields, processObjectToList } from '@/utils/common-utils.js';

/**
 * Shared DataService instance for modal utilities
 * @type {DataService}
 */
const dataService = new DataService();

/**
 * Entity type mappings for consistent naming
 * @type {Record<string, Object>}
 */
const ENTITY_TYPES = {
  npc: {
    getMethod: 'getNpc',
    nameProperty: 'name',
    className: 'npc-link',
    dataAttribute: 'data-npc'
  },
  location: {
    getMethod: 'getLocation',
    nameProperty: 'name',
    className: 'location-link',
    dataAttribute: 'data-location'
  },
  threat: {
    getMethod: 'getThreat',
    nameProperty: 'name',
    className: 'threat-link',
    dataAttribute: 'data-threat'
  },
  event: {
    getMethod: 'getEvent',
    nameProperty: 'name',
    className: 'event-link',
    dataAttribute: 'data-event'
  },
  settlement: {
    getMethod: 'getSettlement',
    nameProperty: 'name',
    className: 'settlement-link',
    dataAttribute: 'data-settlement'
  }
};

/**
 * Creates network links for modal content
 * @param {Array<string>} items - Array of entity keys
 * @param {string} type - Entity type (npc, location, threat, etc.)
 * @param {Object} options - Configuration options
 * @param {boolean} options.asButtons - Create button elements instead of spans
 * @param {boolean} options.useDisplayName - Use entity name instead of key
 * @returns {string} HTML string of network links
 */
export function createNetworkLinks(items, type, options = {}) {
  if (!items || items.length === 0) return '';

  const entityConfig = ENTITY_TYPES[type];
  if (!entityConfig) {
    console.warn(`Unknown entity type: ${type}`);
    return '';
  }

  const { asButtons = true, useDisplayName = true } = options;
  const elementType = asButtons ? 'button' : 'span';

  return items.map(key => {
    let displayName = key;

    if (useDisplayName) {
      const entity = dataService[entityConfig.getMethod](key);
      displayName = entity ? entity[entityConfig.nameProperty] : key;
    }

    return `<${elementType} class="network-link ${entityConfig.className}" ${entityConfig.dataAttribute}="${key}">${displayName}</${elementType}>`;
  }).join('');
}

/**
 * Creates DOM elements for network links (for Shadow DOM usage)
 * @param {Array<string>} items - Array of entity keys
 * @param {string} type - Entity type (npc, location, threat, etc.)
 * @param {Object} options - Configuration options
 * @param {boolean} options.asButtons - Create button elements instead of spans
 * @param {boolean} options.useDisplayName - Use entity name instead of key
 * @param {boolean} options.useKeyFormatting - Apply camelCase to display formatting
 * @returns {Element|null} Container element with network links or null if no items
 */
export function createNetworkLinksElement(items, type, options = {}) {
  if (!items || items.length === 0) return null;

  const entityConfig = ENTITY_TYPES[type];
  if (!entityConfig) {
    console.warn(`Unknown entity type: ${type}`);
    return null;
  }

  const { 
    asButtons = false, 
    useDisplayName = true, 
    useKeyFormatting = false 
  } = options;

  const container = document.createElement('div');
  container.className = 'network-links';

  items.forEach(key => {
    let displayName = key;

    if (useDisplayName) {
      const entity = dataService[entityConfig.getMethod](key);
      displayName = entity ? entity[entityConfig.nameProperty] : key;
    }

    if (!useDisplayName && useKeyFormatting) {
      displayName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }

    const elementType = asButtons ? 'button' : 'span';
    const link = document.createElement(elementType);
    link.className = `network-link ${entityConfig.className}`;
    link.textContent = displayName;
    link.setAttribute(entityConfig.dataAttribute.replace('data-', ''), key);
    
    container.appendChild(link);
  });

  return container;
}

/**
 * Creates modal header content with consistent structure
 * @param {Object} entity - Entity data
 * @param {Object} config - Header configuration
 * @param {string} config.title - Main title (usually entity.name)
 * @param {string} config.tagText - Tag text to display
 * @param {string} config.tagClass - CSS class for the tag
 * @param {string} config.headerClass - CSS class for the header container
 * @returns {string} HTML string for modal header
 */
export function createModalHeader(entity, config) {
  const {
    title = entity.name,
    tagText = '',
    tagClass = 'entity-tag',
    headerClass = 'entity-header-info'
  } = config;

  return `
    <div class="${headerClass}">
      <h2>${title}</h2>
      ${tagText ? `<span class="${tagClass}">${tagText}</span>` : ''}
    </div>
  `;
}

/**
 * Processes entity data for modal display
 * @param {Object} entity - Entity data
 * @param {Object} fieldConfig - Configuration for field processing
 * @returns {Object} Processed field data
 */
export function processModalFields(entity, fieldConfig) {
  // Process standard array fields
  const processedFields = processArrayFields(entity, fieldConfig);

  // Add any entity-specific processing here
  if (entity.knowledge && Array.isArray(entity.knowledge)) {
    processedFields.knowledgeList = entity.knowledge.map(knowledge => `
      <div class="knowledge-entry">
        <h5>${knowledge.topic}</h5>
        <p>${knowledge.info}</p>
      </div>
    `).join('');
    processedFields.knowledgeHasItems = entity.knowledge.length > 0;
  }

  // Handle complex creatures data for threats
  if (entity.creatures && Array.isArray(entity.creatures)) {
    processedFields.creatureList = entity.creatures.map(creature => `
      <div class="creature-entry">
        <h5>${creature.name} (CR ${creature.cr})</h5>
        <p>${creature.description}</p>
        <div class="creature-abilities">
          <strong>Key Abilities:</strong> ${creature.abilities.join(', ')}
        </div>
      </div>
    `).join('');
    processedFields.creaturesHasItems = entity.creatures.length > 0;
  }

  // Handle effects/influence fields (threats can have either)
  const effectsSource = entity.influence || entity.effects;
  if (effectsSource) {
    const effectsProcessed = processArrayFields({ effects: effectsSource }, {
      effects: { checkLength: true }
    });
    processedFields.effectsList = effectsProcessed.effectsList || effectsProcessed.effects;
    processedFields.effectsHasItems = effectsSource.length > 0;
    processedFields.effectsTitle = entity.influence ? 'Regional Influence:' : 'Effects:';
  }

  return processedFields;
}

/**
 * Processes secrets data for locations (handles complex object structures)
 * @param {Object} secrets - Secrets data object
 * @returns {Object} Processed secrets data
 */
export function processSecretsData(secrets) {
  let secretsList = '';
  let hasSecrets = false;

  if (secrets && typeof secrets === 'object') {
    const specialHandlers = {
      hiddenItems: (items) => {
        if (!Array.isArray(items)) return [];
        return items.map(item => 
          `<strong>${item.item}</strong> (${item.location}): ${item.description}`
        );
      }
    };

    const secretsArray = processObjectToList(secrets, { specialHandlers });

    if (secretsArray.length > 0) {
      secretsList = secretsArray.map(secret => `<li>${secret}</li>`).join('');
      hasSecrets = true;
    }
  }

  return { secretsList, hasSecrets };
}

/**
 * Creates network section HTML for modal content
 * @param {Object} entity - Entity data
 * @param {Array<Object>} networkConfigs - Array of network configurations
 * @returns {string} HTML string for network sections
 */
export function createNetworkSections(entity, networkConfigs) {
  const sections = networkConfigs
    .filter(config => entity[config.entityField] && entity[config.entityField].length > 0)
    .map(config => {
      const links = createNetworkLinks(entity[config.entityField], config.type, {
        asButtons: config.asButtons !== false,
        useDisplayName: config.useDisplayName !== false
      });

      return `
        <div class="network-section">
          <h4>${config.icon || ''} ${config.title}:</h4>
          <div class="network-links">${links}</div>
        </div>
      `;
    });

  if (sections.length === 0) return '';

  return `
    <div class="entity-network">
      <h3>Network</h3>
      ${sections.join('')}
    </div>
  `;
}

/**
 * Standard network configurations for different entity types
 */
export const NETWORK_CONFIGS = {
  npc: [
    { entityField: 'relatedNpcs', type: 'npc', title: 'Related NPCs', icon: '🧙' },
    { entityField: 'relatedLocations', type: 'location', title: 'Related Locations', icon: '📍' },
    { entityField: 'relatedThreats', type: 'threat', title: 'Related Threats', icon: '⚠️' },
    { entityField: 'relatedEvents', type: 'event', title: 'Related Events', icon: '🎭' }
  ],
  threat: [
    { entityField: 'affectedNpcs', type: 'npc', title: 'Affected NPCs', icon: '🧙' },
    { entityField: 'affectedLocations', type: 'location', title: 'Affected Locations', icon: '📍' },
    { entityField: 'affectedSettlements', type: 'settlement', title: 'Affected Settlements', icon: '🏘️' },
    { entityField: 'relatedEvents', type: 'event', title: 'Related Events', icon: '🎭' },
    { entityField: 'relatedThreats', type: 'threat', title: 'Related Threats', icon: '⚠️' }
  ],
  location: [
    { entityField: 'npcs', type: 'npc', title: 'NPCs', icon: '🧙' },
    { entityField: 'connectedLocations', type: 'location', title: 'Connected Locations', icon: '📍' },
    { entityField: 'relatedThreats', type: 'threat', title: 'Related Threats', icon: '⚠️' },
    { entityField: 'relatedEvents', type: 'event', title: 'Related Events', icon: '🎭' }
  ],
  event: [
    { entityField: 'relatedNpcs', type: 'npc', title: 'Related NPCs', icon: '🧙' },
    { entityField: 'relatedLocations', type: 'location', title: 'Related Locations', icon: '📍' },
    { entityField: 'relatedThreats', type: 'threat', title: 'Related Threats', icon: '⚠️' }
  ]
};

/**
 * Modal field configurations for different entity types
 */
export const MODAL_FIELD_CONFIGS = {
  npc: {
    services: { checkLength: true },
    secrets: { checkLength: true },
    motivations: { checkLength: true },
    abilities: { checkLength: true },
    quick_info: { checkLength: true }
  },
  threat: {
    abilities: { checkLength: true },
    encounter_notes: { checkLength: true },
    process: { checkLength: true },
    stages: { checkLength: true },
    weaknesses: { checkLength: true }
  },
  location: {
    features: { checkLength: true },
    hazards: { checkLength: true }
  },
  event: {
    outcomes: { checkLength: true },
    hooks: { checkLength: true },
    ritual_requirements: { checkLength: true },
    encounter_table: { checkLength: true }
  }
};
