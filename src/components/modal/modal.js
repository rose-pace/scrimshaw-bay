/**
 * Modal component for displaying detailed information
 */

import { ModalService } from '@/services/modal-service.js';
import { DataService } from '@/services/data-service.js';
import { LocationDetailModal } from '@/components/location-detail-modal/location-detail-modal.js';
import { cloneTemplate } from '@/utils/template-utils.js';
import { 
  createModalHeader, 
  createNetworkLinks, 
  createNetworkSections, 
  processModalFields, 
  processSecretsData,
  NETWORK_CONFIGS, 
  MODAL_FIELD_CONFIGS 
} from '@/utils/modal-utils.js';

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
    return createModalHeader(npc, {
      tagText: npc.location || '',
      tagClass: 'npc-location-tag',
      headerClass: 'npc-header-info'
    });
  }
  /**
   * Creates NPC body content
   * @param {Object} npc - NPC data
   * @param {string} npcKey - NPC key
   * @returns {string} NPC body HTML
   */
  createNpcBody(npc, npcKey) {
    // Process fields using shared utility
    const processedFields = processModalFields(npc, MODAL_FIELD_CONFIGS.npc);

    const template = cloneTemplate('npc-modal-template', {
      role: npc.role,
      description: npc.description,
      quickInfo: processedFields.quick_infoHasItems,
      quickInfoList: processedFields.quick_infoList,
      services: processedFields.servicesHasItems,
      servicesList: processedFields.servicesList,
      knowledge: processedFields.knowledgeHasItems,
      knowledgeList: processedFields.knowledgeList,
      secrets: processedFields.secretsHasItems,
      secretsList: processedFields.secretsList,
      motivations: processedFields.motivationsHasItems,
      motivationsList: processedFields.motivationsList,
      abilities: processedFields.abilitiesHasItems,
      abilitiesList: processedFields.abilitiesList
    }, { returnElement: true });

    // Add network sections
    const networkHtml = createNetworkSections(npc, NETWORK_CONFIGS.npc);
    if (networkHtml) {
      template.innerHTML += networkHtml;
    }

    return template.outerHTML;
  }
  /**
   * Creates threat header content
   * @param {Object} threat - Threat data
   * @returns {string} Threat header HTML
   */
  createThreatHeader(threat) {
    return createModalHeader(threat, {
      tagText: threat.corruptionLevel || 'Unknown',
      tagClass: 'corruption-level',
      headerClass: 'threat-header-info'
    });
  }
  /**
   * Creates threat body content
   * @param {Object} threat - Threat data
   * @param {string} threatKey - Threat key
   * @returns {string} Threat body HTML
   */
  createThreatBody(threat, threatKey) {
    // Process fields using shared utility
    const processedFields = processModalFields(threat, MODAL_FIELD_CONFIGS.threat);

    const template = cloneTemplate('threat-modal-template', {
      type: threat.type,
      description: threat.description,
      abilities: processedFields.abilitiesHasItems,
      abilitiesList: processedFields.abilitiesList,
      effects: processedFields.effectsHasItems,
      effectsTitle: processedFields.effectsTitle,
      effectsList: processedFields.effectsList,
      creatures: processedFields.creaturesHasItems,
      creatureList: processedFields.creatureList,
      encounterNotes: processedFields.encounter_notesHasItems,
      encounterNotesList: processedFields.encounter_notes,
      process: processedFields.processHasItems,
      processList: processedFields.processList,
      stages: processedFields.stagesHasItems,
      stagesList: processedFields.stagesList,
      timeline: threat.timeline ? true : false,
      timelineText: threat.timeline || '',
      stats: threat.stats ? true : false,
      statsText: threat.stats || '',
      gameStats: threat.gameStats ? true : false,
      gameStatsText: threat.gameStats || '',
      weaknesses: processedFields.weaknessesHasItems,
      weaknessesList: processedFields.weaknessesList
    }, { returnElement: true });

    // Add network sections using the utility
    const networkHtml = createNetworkSections(threat, NETWORK_CONFIGS.threat);
    if (networkHtml) {
      template.innerHTML += networkHtml;
    }

    return template.outerHTML;
  }
  /**
   * Creates location header content
   * @param {Object} location - Location data
   * @returns {string} Location header HTML
   */
  createLocationHeader(location) {
    return createModalHeader(location, {
      tagText: location.type || 'Location',
      tagClass: 'location-type-tag',
      headerClass: 'location-header-info'
    });
  }
  /**
   * Creates location body content
   * @param {Object} location - Location data
   * @param {string} locationKey - Location key
   * @returns {string} Location body HTML
   */
  createLocationBody(location, locationKey) {
    // Process fields using shared utility
    const processedFields = processModalFields(location, MODAL_FIELD_CONFIGS.location);
    
    // Process secrets using shared utility
    const { secretsList, hasSecrets } = processSecretsData(location.secrets);

    const template = cloneTemplate('location-modal-template', {
      description: location.description,
      features: processedFields.featuresHasItems,
      featuresList: processedFields.featuresList,
      atmosphere: location.atmosphere ? true : false,
      atmosphereText: location.atmosphere || '',
      history: location.history ? true : false,
      historyText: location.history || '',
      hazards: processedFields.hazardsHasItems,
      hazardsList: processedFields.hazardsList,
      secrets: hasSecrets,
      secretsList: secretsList
    }, { returnElement: true });

    // Add network sections using the utility
    const networkHtml = createNetworkSections(location, NETWORK_CONFIGS.location);
    if (networkHtml) {
      template.innerHTML += networkHtml;
    }

    return template.outerHTML;
  }

  /**
   * Creates event header content
   * @param {Object} event - Event data
   * @returns {string} Event header HTML
   */
  createEventHeader(event) {
    return createModalHeader(event, {
      tagText: 'Strange Event',
      tagClass: 'event-type-tag',
      headerClass: 'event-header-info'
    });
  }

  /**
   * Creates event body content
   * @param {Object} event - Event data
   * @param {string} eventKey - Event key
   * @returns {string} Event body HTML
   */
  createEventBody(event, eventKey) {
    // Process fields using shared utility
    const processedFields = processModalFields(event, MODAL_FIELD_CONFIGS.event);

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

    // Build main content
    let eventContent = `
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
      </div>
    `;

    // Add network sections using the utility
    const networkHtml = createNetworkSections(event, NETWORK_CONFIGS.event);
    if (networkHtml) {
      eventContent += networkHtml;
    }

    return eventContent;
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