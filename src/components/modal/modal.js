/**
 * Modal component for displaying detailed information
 */

import { ModalService } from '@/services/modal-service.js';
import { DataService } from '@/services/data-service.js';
import { cloneTemplate } from '@/utils/template-utils.js';

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
   * Shows location details in a modal
   * @param {string} locationKey - Location identifier
   */
  showLocationDetails(locationKey) {
    const location = this.dataService.getLocation(locationKey);
    if (!location) {
      console.error(`Location not found: ${locationKey}`);
      return;
    }

    const headerContent = this.createLocationHeader(location);
    const bodyContent = this.createLocationBody(location, locationKey);
    
    return this.modalService.createModal({
      headerContent: headerContent,
      content: bodyContent,
      className: 'location-modal',
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
    // Prepare services list
    const servicesList = npc.services ? 
      npc.services.map(service => `<li>${service}</li>`).join('') : '';
    
    // Prepare knowledge list
    const knowledgeList = npc.knowledge ? 
      npc.knowledge.map(knowledge => `
        <div class="knowledge-entry">
          <h5>${knowledge.topic}</h5>
          <p>${knowledge.info}</p>
        </div>
      `).join('') : '';
    
    // Prepare secrets list
    const secretsList = npc.secrets ? 
      npc.secrets.map(secret => `<li>${secret}</li>`).join('') : '';
    
    // Prepare motivations list
    const motivationsList = npc.motivations ? 
      npc.motivations.map(motivation => `<li>${motivation}</li>`).join('') : '';
    
    // Prepare abilities list
    const abilitiesList = npc.abilities ? 
      npc.abilities.map(ability => `<li>${ability}</li>`).join('') : '';

    const template = cloneTemplate('npc-modal-template', {
      role: npc.role,
      description: npc.description,
      services: npc.services && npc.services.length > 0,
      servicesList: servicesList,
      knowledge: npc.knowledge && npc.knowledge.length > 0,
      knowledgeList: knowledgeList,
      secrets: npc.secrets && npc.secrets.length > 0,
      secretsList: secretsList,
      motivations: npc.motivations && npc.motivations.length > 0,
      motivationsList: motivationsList,
      abilities: npc.abilities && npc.abilities.length > 0,
      abilitiesList: abilitiesList
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
    
    // Prepare content lists
    const abilitiesList = threat.abilities ? 
      threat.abilities.map(ability => `<li>${ability}</li>`).join('') : '';
    
    const effectsList = (threat.influence || threat.effects) ? 
      (threat.influence || threat.effects).map(effect => `<li>${effect}</li>`).join('') : '';
    
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
    
    const encounterNotesList = threat.encounter_notes ? 
      threat.encounter_notes.map(note => `<li>${note}</li>`).join('') : '';
    
    const processList = threat.process ? 
      threat.process.map(step => `<li>${step}</li>`).join('') : '';
    
    const stagesList = threat.stages ? 
      threat.stages.map(stage => `<li>${stage}</li>`).join('') : '';
    
    const weaknessesList = threat.weaknesses ? 
      threat.weaknesses.map(weakness => `<li>${weakness}</li>`).join('') : '';

    const template = cloneTemplate('threat-modal-template', {
      type: threat.type,
      description: threat.description,
      abilities: threat.abilities && threat.abilities.length > 0,
      abilitiesList: abilitiesList,
      effects: (threat.effects || threat.influence) && (threat.effects || threat.influence).length > 0,
      effectsTitle: threat.influence ? 'Regional Influence:' : 'Effects:',
      effectsList: effectsList,
      creatures: threat.creatures && threat.creatures.length > 0,
      creatureList: creatureList,
      encounterNotes: threat.encounter_notes && threat.encounter_notes.length > 0,
      encounterNotesList: encounterNotesList,
      process: threat.process && threat.process.length > 0,
      processList: processList,
      stages: threat.stages && threat.stages.length > 0,
      stagesList: stagesList,
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
      weaknesses: threat.weaknesses && threat.weaknesses.length > 0,
      weaknessesList: weaknessesList
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
    
    // Prepare content lists
    const featuresList = location.features ? 
      location.features.map(feature => `<li>${feature}</li>`).join('') : '';
    
    const hazardsList = location.hazards ? 
      location.hazards.map(hazard => `<li>${hazard}</li>`).join('') : '';
    
    const secretsList = location.secrets ? 
      location.secrets.map(secret => `<li>${secret}</li>`).join('') : '';

    const template = cloneTemplate('location-modal-template', {
      description: location.description,
      features: location.features && location.features.length > 0,
      featuresList: featuresList,
      atmosphere: location.atmosphere ? true : false,
      atmosphereText: location.atmosphere || '',
      history: location.history ? true : false,
      historyText: location.history || '',
      hazards: location.hazards && location.hazards.length > 0,
      hazardsList: hazardsList,
      secrets: location.secrets && location.secrets.length > 0,
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