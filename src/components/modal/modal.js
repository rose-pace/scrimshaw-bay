/**
 * Modal component for displaying detailed information
 */

import { ModalService } from '@/services/modal-service.js';
import { DataService } from '@/services/data-service.js';
import { LocationDetailModal } from '@/components/location-detail-modal/location-detail-modal.js';
import { cloneTemplate } from '@/utils/template-utils.js';
import { processObjectToList, processArrayFields } from '@/utils/common-utils.js';

export class Modal {
  constructor() {
    this.modalService = new ModalService();
    this.dataService = new DataService();
  }
  /**
   * Shows NPC details in a modal
   * @param {string} npcKey - NPC identifier
   */
  showNpcDetails(npcKey) {
    const npc = this.dataService.getNpc(npcKey);
    if (!npc) {
      console.error(`NPC not found: ${npcKey}`);
      return;
    }

    const headerContent = this.createNpcHeader(npc);
    const bodyContent = this.createNpcBody(npc, npcKey);
    
    return this.modalService.createModal({
      headerContent: headerContent,
      content: bodyContent,
      className: 'npc-modal',
      closeOnOverlayClick: true
    });
  }

  /**
   * Shows threat details in a modal
   * @param {string} threatKey - Threat identifier
   */
  showThreatDetails(threatKey) {
    const threat = this.dataService.getThreat(threatKey);
    if (!threat) {
      console.error(`Threat not found: ${threatKey}`);
      return;
    }

    const headerContent = this.createThreatHeader(threat);
    const bodyContent = this.createThreatBody(threat, threatKey);
    
    return this.modalService.createModal({
      headerContent: headerContent,
      content: bodyContent,
      className: 'threat-modal',
      closeOnOverlayClick: true
    });
  }

  /**
   * Shows location details in a modal using the new LocationDetailModal component
   * @param {string} locationKey - Location identifier
   */
  showLocationDetails(locationKey) {
    const location = this.dataService.getLocation(locationKey);
    if (!location) {
      console.error(`Location not found: ${locationKey}`);
      return;
    }

    const headerContent = this.createLocationHeader(location);
    
    // Create modal first, then populate with component
    const modalId = this.modalService.createModal({
      headerContent: headerContent,
      content: '<div id="location-content-placeholder">Loading...</div>',
      className: 'location-modal',
      closeOnOverlayClick: true
    });

    // Get the modal body and replace placeholder with component
    setTimeout(() => {
      const modalElement = document.querySelector(`[data-modal-id="${modalId}"]`);
      if (modalElement) {
        const placeholder = modalElement.querySelector('#location-content-placeholder');
        if (placeholder) {
          const locationModal = LocationDetailModal.create();
          placeholder.parentNode.replaceChild(locationModal, placeholder);
          locationModal.setLocationData(location);
        }
      }
    }, 0);

    return modalId;
  }

  /**
   * Shows event details in a modal
   * @param {string} eventKey - Event identifier
   */
  showEventDetails(eventKey) {
    const event = this.dataService.getEvent(eventKey);
    if (!event) {
      console.error(`Event not found: ${eventKey}`);
      return;
    }

    const headerContent = this.createEventHeader(event);
    const bodyContent = this.createEventBody(event, eventKey);
    
    return this.modalService.createModal({
      headerContent: headerContent,
      content: bodyContent,
      className: 'event-modal',
      closeOnOverlayClick: true
    });
  }

  /**
   * Creates NPC header content
   * @param {Object} npc - NPC data
   * @returns {string} NPC header HTML
   */
  createNpcHeader(npc) {
    return `
      <div class="npc-header-info">
        <h2>${npc.name}</h2>
        <span class="npc-location-tag">${npc.location || ''}</span>
      </div>
    `;
  }
  /**
   * Creates NPC body content
   * @param {Object} npc - NPC data
   * @param {string} npcKey - NPC key
   * @returns {string} NPC body HTML
   */
  createNpcBody(npc, npcKey) {
    // Process array fields using the utility
    const processedFields = processArrayFields(npc, {
      services: { checkLength: true },
      secrets: { checkLength: true },
      motivations: { checkLength: true },
      abilities: { checkLength: true }
    });
    
    // Special handling for knowledge (object array)
    const knowledgeList = npc.knowledge ? 
      npc.knowledge.map(knowledge => `
        <div class="knowledge-entry">
          <h5>${knowledge.topic}</h5>
          <p>${knowledge.info}</p>
        </div>
      `).join('') : '';

    const template = cloneTemplate('npc-modal-template', {
      role: npc.role,
      description: npc.description,
      services: processedFields.servicesHasItems,
      servicesList: processedFields.servicesList,
      knowledge: npc.knowledge && npc.knowledge.length > 0,
      knowledgeList: knowledgeList,
      secrets: processedFields.secretsHasItems,
      secretsList: processedFields.secretsList,
      motivations: processedFields.motivationsHasItems,
      motivationsList: processedFields.motivationsList,
      abilities: processedFields.abilitiesHasItems,
      abilitiesList: processedFields.abilitiesList
    }, { returnElement: true });

    return template.outerHTML;
  }
  /**
   * Creates threat header content
   * @param {Object} threat - Threat data
   * @returns {string} Threat header HTML
   */
  createThreatHeader(threat) {
    return `
      <div class="threat-header-info">
        <h2>${threat.name}</h2>
        <span class="corruption-level">${threat.corruptionLevel || 'Unknown'}</span>
      </div>
    `;
  }
  /**
   * Creates threat body content
   * @param {Object} threat - Threat data
   * @param {string} threatKey - Threat key
   * @returns {string} Threat body HTML
   */
  createThreatBody(threat, threatKey) {
    // Helper function to create clickable network links
    const createLinks = (items, type) => {
      if (!items || items.length === 0) return '';
      
      return items.map(key => {
        let displayName = key;
        
        if (type === 'npc') {
          const npc = this.dataService.getNpc(key);
          displayName = npc ? npc.name : key;
        } else if (type === 'location') {
          const location = this.dataService.getLocation(key);
          displayName = location ? location.name : key;
        } else if (type === 'settlement') {
          const settlement = this.dataService.getSettlement(key);
          displayName = settlement ? settlement.name : key;
        } else if (type === 'event') {
          const event = this.dataService.getEvent(key);
          displayName = event ? event.name : key;
        } else if (type === 'threat') {
          const relatedThreat = this.dataService.getThreat(key);
          displayName = relatedThreat ? relatedThreat.name : key;
        }
        
        return `<button class="network-link ${type}-link" data-${type}="${key}">${displayName}</button>`;
      }).join('');
    };
    
    // Process array fields using the utility
    const processedFields = processArrayFields(threat, {
      abilities: { checkLength: true },
      encounter_notes: { checkLength: true },
      process: { checkLength: true },
      stages: { checkLength: true },
      weaknesses: { checkLength: true }
    });
    
    // Handle effects/influence field (could be either) - using utility
    const effectsSource = threat.influence || threat.effects;
    const effectsProcessed = processArrayFields({ effects: effectsSource }, {
      effects: { checkLength: true }
    });
    
    // Special handling for creatures (complex objects)
    const creatureList = threat.creatures ? 
      threat.creatures.map(creature => `
        <div class="creature-entry">
          <h5>${creature.name} (CR ${creature.cr})</h5>
          <p>${creature.description}</p>
          <div class="creature-abilities">
            <strong>Key Abilities:</strong> ${creature.abilities.join(', ')}
          </div>
        </div>
      `).join('') : '';

    const template = cloneTemplate('threat-modal-template', {
      type: threat.type,
      description: threat.description,
      abilities: processedFields.abilitiesHasItems,
      abilitiesList: processedFields.abilitiesList,
      effects: effectsSource && effectsSource.length > 0,
      effectsTitle: threat.influence ? 'Regional Influence:' : 'Effects:',
      effectsList: effectsProcessed.effects,
      creatures: threat.creatures && threat.creatures.length > 0,
      creatureList: creatureList,
      encounterNotes: processedFields.encounter_notesHasItems,
      encounterNotesList: processedFields.encounter_notes,
      process: processedFields.processHasItems,
      processList: processedFields.process,
      stages: processedFields.stagesHasItems,
      stagesList: processedFields.stages,
      affectedNpcs: threat.affectedNpcs && threat.affectedNpcs.length > 0,
      npcLinks: createLinks(threat.affectedNpcs, 'npc'),
      affectedLocations: threat.affectedLocations && threat.affectedLocations.length > 0,
      locationLinks: createLinks(threat.affectedLocations, 'location'),
      affectedSettlements: threat.affectedSettlements && threat.affectedSettlements.length > 0,
      settlementLinks: createLinks(threat.affectedSettlements, 'settlement'),
      relatedEvents: threat.relatedEvents && threat.relatedEvents.length > 0,
      eventLinks: createLinks(threat.relatedEvents, 'event'),
      relatedThreats: threat.relatedThreats && threat.relatedThreats.length > 0,
      threatLinks: createLinks(threat.relatedThreats, 'threat'),
      timeline: threat.timeline ? true : false,
      timelineText: threat.timeline || '',
      stats: threat.stats ? true : false,
      statsText: threat.stats || '',
      gameStats: threat.gameStats ? true : false,
      gameStatsText: threat.gameStats || '',
      weaknesses: processedFields.weaknessesHasItems,
      weaknessesList: processedFields.weaknesses
    }, { returnElement: true });

    return template.outerHTML;
  }
  /**
   * Creates location header content
   * @param {Object} location - Location data
   * @returns {string} Location header HTML
   */
  createLocationHeader(location) {
    return `
      <div class="location-header-info">
        <h2>${location.name}</h2>
        <span class="location-type-tag">${location.type || 'Location'}</span>
      </div>
    `;
  }
  /**
   * Creates location body content
   * @param {Object} location - Location data
   * @param {string} locationKey - Location key
   * @returns {string} Location body HTML
   */
  createLocationBody(location, locationKey) {
    // Helper function to create clickable network links
    const createLinks = (items, type) => {
      if (!items || items.length === 0) return '';
      
      return items.map(key => {
        let displayName = key;
        
        if (type === 'npc') {
          const npc = this.dataService.getNpc(key);
          displayName = npc ? npc.name : key;
        } else if (type === 'location') {
          const relatedLocation = this.dataService.getLocation(key);
          displayName = relatedLocation ? relatedLocation.name : key;
        } else if (type === 'threat') {
          const threat = this.dataService.getThreat(key);
          displayName = threat ? threat.name : key;
        } else if (type === 'event') {
          const event = this.dataService.getEvent(key);
          displayName = event ? event.name : key;
        }
        
        return `<button class="network-link ${type}-link" data-${type}="${key}">${displayName}</button>`;
      }).join('');
    };
    
    // Process array fields using the utility
    const processedFields = processArrayFields(location, {
      features: { checkLength: true },
      hazards: { checkLength: true }
    });
    
    // Handle secrets object structure dynamically
    let secretsList = '';
    let hasSecrets = false;
    if (location.secrets && typeof location.secrets === 'object') {
      // Define special handlers for complex data structures
      const specialHandlers = {
        hiddenItems: (items) => {
          if (!Array.isArray(items)) return [];
          return items.map(item => 
            `<strong>${item.item}</strong> (${item.location}): ${item.description}`
          );
        }
      };
      
      const secretsArray = processObjectToList(location.secrets, { specialHandlers });
      
      if (secretsArray.length > 0) {
        secretsList = secretsArray.map(secret => `<li>${secret}</li>`).join('');
        hasSecrets = true;
      }
    }

    const template = cloneTemplate('location-modal-template', {
      description: location.description,
      features: processedFields.featuresHasItems,
      featuresList: processedFields.features,
      atmosphere: location.atmosphere ? true : false,
      atmosphereText: location.atmosphere || '',
      history: location.history ? true : false,
      historyText: location.history || '',
      hazards: processedFields.hazardsHasItems,
      hazardsList: processedFields.hazards,
      secrets: hasSecrets,
      secretsList: secretsList,
      npcs: location.npcs && location.npcs.length > 0,
      npcLinks: createLinks(location.npcs, 'npc'),
      connectedLocations: location.connectedLocations && location.connectedLocations.length > 0,
      locationLinks: createLinks(location.connectedLocations, 'location'),
      relatedThreats: location.relatedThreats && location.relatedThreats.length > 0,
      threatLinks: createLinks(location.relatedThreats, 'threat'),
      relatedEvents: location.relatedEvents && location.relatedEvents.length > 0,
      eventLinks: createLinks(location.relatedEvents, 'event')
    }, { returnElement: true });

    return template.outerHTML;
  }

  /**
   * Creates event header content
   * @param {Object} event - Event data
   * @returns {string} Event header HTML
   */
  createEventHeader(event) {
    return `
      <div class="event-header-info">
        <h2>${event.name}</h2>
        <span class="event-type-tag">Strange Event</span>
      </div>
    `;
  }

  /**
   * Creates event body content
   * @param {Object} event - Event data
   * @param {string} eventKey - Event key
   * @returns {string} Event body HTML
   */
  createEventBody(event, eventKey) {
    // Helper function to create clickable network links (reuse from threat body)
    const createLinks = (items, type) => {
      if (!items || items.length === 0) return '';
      
      return items.map(key => {
        let displayName = key;
        
        if (type === 'npc') {
          const npc = this.dataService.getNpc(key);
          displayName = npc ? npc.name : key;
        } else if (type === 'location') {
          const location = this.dataService.getLocation(key);
          displayName = location ? location.name : key;
        } else if (type === 'threat') {
          const threat = this.dataService.getThreat(key);
          displayName = threat ? threat.name : key;
        }
        
        return `<button class="network-link ${type}-link" data-${type}="${key}">${displayName}</button>`;
      }).join('');
    };

    // Process array fields
    const processedFields = processArrayFields(event, {
      outcomes: { checkLength: true },
      hooks: { checkLength: true },
      ritual_requirements: { checkLength: true },
      encounter_table: { checkLength: true }
    });

    // Prepare special content sections
    let gulpgrinContent = '';
    if (event.gulpgrin_details) {
      gulpgrinContent = `
        <div class="event-section">
          <h4>${event.gulpgrin_details.name}:</h4>
          <p>${event.gulpgrin_details.description}</p>
          ${event.gulpgrin_details.mechanics ? `<p><strong>Mechanics:</strong> ${event.gulpgrin_details.mechanics}</p>` : ''}
        </div>
      `;
    }

    let winterCourtContent = '';
    if (event.winter_court_clues) {
      winterCourtContent = `
        <div class="event-section">
          <h4>Winter Court Clues:</h4>
          <ul>
            <li><strong>Visual:</strong> ${event.winter_court_clues.observation}</li>
            <li><strong>Magic:</strong> ${event.winter_court_clues.arcana_check}</li>
            <li><strong>Implications:</strong> ${event.winter_court_clues.implications}</li>
          </ul>
        </div>
      `;
    }

    return `
      <div class="event-network-modal">
        <div class="event-section">
          <h4>Description:</h4>
          <p>${event.description}</p>
        </div>
        
        ${event.trigger ? `
          <div class="event-section">
            <h4>Trigger:</h4>
            <p>${event.trigger}</p>
          </div>
        ` : ''}
        
        ${processedFields.outcomesHasItems ? `
          <div class="event-section">
            <h4>Possible Outcomes:</h4>
            <ul>${processedFields.outcomesList}</ul>
          </div>
        ` : ''}
        
        ${processedFields.hooksHasItems ? `
          <div class="event-section">
            <h4>Adventure Hooks:</h4>
            <ul>${processedFields.hooksList}</ul>
          </div>
        ` : ''}
        
        ${processedFields.ritual_requirementsHasItems ? `
          <div class="event-section">
            <h4>Ritual Requirements:</h4>
            <ol>${processedFields.ritual_requirementsList}</ol>
          </div>
        ` : ''}
        
        ${processedFields.encounter_tableHasItems ? `
          <div class="event-section">
            <h4>Encounter Table:</h4>
            <ul>${processedFields.encounter_tableList}</ul>
          </div>
        ` : ''}
        
        ${gulpgrinContent}
        ${winterCourtContent}
        
        <div class="event-network">
          <h3>Event Network</h3>
          
          ${event.relatedNpcs && event.relatedNpcs.length > 0 ? `
            <div class="network-section">
              <h4>🧙 Related NPCs:</h4>
              <div class="network-links">${createLinks(event.relatedNpcs, 'npc')}</div>
            </div>
          ` : ''}
          
          ${event.relatedLocations && event.relatedLocations.length > 0 ? `
            <div class="network-section">
              <h4>📍 Related Locations:</h4>
              <div class="network-links">${createLinks(event.relatedLocations, 'location')}</div>
            </div>
          ` : ''}
          
          ${event.relatedThreats && event.relatedThreats.length > 0 ? `
            <div class="network-section">
              <h4>⚠️ Related Threats:</h4>
              <div class="network-links">${createLinks(event.relatedThreats, 'threat')}</div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Closes a modal
   * @param {string} modalId - Modal ID to close
   */
  closeModal(modalId) {
    this.modalService.closeModal(modalId);
  }

  /**
   * Closes all modals
   */
  closeAllModals() {
    this.modalService.closeAllModals();
  }
}