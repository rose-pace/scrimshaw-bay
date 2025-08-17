/**
 * Settlement Card component for displaying settlement information
 */

import { DataService } from '@/services/data-service.js';
import { BackgroundNpcs } from '@/components/background-npcs/background-npcs.js';
import { Accordion } from '@/components/accordion/accordion.js';
import { AccordionItem } from '@/components/accordion/accordion-item.js';
import { NpcHeader } from '@/components/background-npcs/npc-header/npc-header.js';
import { NpcContent } from '@/components/background-npcs/npc-content/npc-content.js';
import { SettlementLayout } from '@/components/settlement-layout/settlement-layout.js';
import { 
  createSettlementCard,
  createSettlementDetailHeader,
  createLocationItem} from '@/utils/template-utils.js';

export class SettlementCard {
  constructor() {
    this.dataService = new DataService();
  }  
  
  /**
   * Create a settlement card element
   * @param {Object} settlement - Settlement data
   * @param {string} settlementKey - Settlement key
   * @returns {HTMLElement} Settlement card element
   */
  create(settlement, settlementKey) {
    const card = createSettlementCard(settlement, settlementKey);

    // Add click handler
    card.addEventListener('click', () => {
      this.dispatchSettlementClickEvent(settlementKey);
    });

    // Add keyboard handler
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.dispatchSettlementClickEvent(settlementKey);
      }
    });

    return card;
  }

  /**
   * Create settlement overview cards for the main overview section
   * @returns {HTMLElement} Container with all settlement cards
   */
  createOverviewCards() {
    const container = document.createElement('div');
    container.className = 'settlement-grid';

    const settlements = this.dataService.getAllSettlements();
    
    settlements.forEach(settlement => {
      const card = this.create(settlement, settlement.key);
      container.appendChild(card);
    });

    return container;
  }

  /**
   * Create settlement detail view
   * @param {string} settlementKey - Settlement key
   * @returns {Promise<HTMLElement>} Settlement detail element
   */  
  async createDetailView(settlementKey) {
    const settlement = this.dataService.getSettlement(settlementKey);
    if (!settlement) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'settlement-detail error';
      errorDiv.innerHTML = '<p>Settlement not found</p>';
      return errorDiv;
    }

    const container = document.createElement('div');
    container.className = 'settlement-detail';// Header using template
    const headerFragment = createSettlementDetailHeader(settlement);
    const header = document.createElement('div');
    header.className = 'settlement-detail-header';
    header.appendChild(headerFragment);

    // Description
    const description = document.createElement('div');
    description.className = 'settlement-description';
    description.innerHTML = `<p>${settlement.description}</p>`;

    // Settlement Layout (if available)
    let layoutSection = null;
    if (settlement.layout) {
      layoutSection = this.createLayoutSection(settlement.layout);
    }

    // Content sections
    const content = document.createElement('div');
    content.className = 'settlement-content';

    // Notable Locations
    if (settlement.notableLocations && settlement.notableLocations.length > 0) {
      const locationsSection = this.createLocationsSection(settlement.notableLocations);
      content.appendChild(locationsSection);
    }

    // Key NPCs
    if (settlement.keyNpcs && settlement.keyNpcs.length > 0) {
      const npcsSection = await this.createNpcsSection(settlement.keyNpcs);
      content.appendChild(npcsSection);
    }

    // Background NPCs
    if (settlement.backgroundNpcs && settlement.backgroundNpcs.length > 0) {
      const backgroundNpcsSection = this.createBackgroundNpcsSection(settlement.backgroundNpcs, settlement.name);
      content.appendChild(backgroundNpcsSection);
    }

    // Dark Secrets (GM Only)
    if (settlement.darkSecrets && settlement.darkSecrets.length > 0) {
      const secretsSection = this.createSecretsSection(settlement.darkSecrets);
      content.appendChild(secretsSection);
    }

    container.appendChild(header);
    container.appendChild(description);
    
    // Add layout section if available
    if (layoutSection) {
      container.appendChild(layoutSection);
    }
    
    container.appendChild(content);

    return container;
  }

  /**
   * Create locations section for settlement detail
   * @param {Array} locations - Array of location objects
   * @returns {HTMLElement} Locations section element
   */  
  createLocationsSection(locations) {
    const section = document.createElement('div');
    section.className = 'locations-section';

    const header = document.createElement('h4');
    header.innerHTML = 'Notable Locations';

    const locationsList = document.createElement('div');
    locationsList.className = 'locations-list';

    locations.forEach(location => {
      const locationItem = createLocationItem(location);
      locationsList.appendChild(locationItem);
    });

    section.appendChild(header);
    section.appendChild(locationsList);

    return section;
  }

  /**
   * Create NPCs section for settlement detail
   * @param {Array} npcs - Array of NPC keys
   * @returns {HTMLElement} NPCs section element
   */
  async createNpcsSection(npcs) {
    const section = document.createElement('div');
    section.className = 'key-npcs-section';

    const header = document.createElement('h4');
    header.innerHTML = 'Key NPCs';

    // Create accordion wrapper for NPCs
    const accordion = Accordion.create();
    accordion.className = 'key-npcs-accordion';

    // Create accordion items for each NPC
    const accordionItemPromises = [];
    npcs.forEach(npcKey => {
      const npc = this.dataService.getNpc(npcKey);
      if (npc) {
        // Create standard accordion item
        const accordionItem = this.createKeyNpcAccordionItem(npcKey, npc);
        accordionItemPromises.push(accordionItem);
      } else {
        console.warn('SettlementCard: Key NPC not found:', npcKey);
      }
    });

    const accordionItems = await Promise.all(accordionItemPromises);

    // Add accordion items using the new method
    accordion.addAccordionItems(accordionItems);

    section.appendChild(header);
    section.appendChild(accordion);

    return section;
  }
  
  /**
   * Create dark secrets section for settlement detail
   * @param {Array} secrets - Array of secret strings
   * @returns {HTMLElement} Secrets section element
   */
  createSecretsSection(secrets) {
    const section = document.createElement('div');
    section.className = 'dark-secrets gm-sections';

    const header = document.createElement('div');
    header.className = 'gm-header';
    header.innerHTML = `
      <h3>🎲 GM Information</h3>
      <p class="gm-note">The following sections contain GM-only information</p>
    `;

    const secretsContent = document.createElement('div');
    secretsContent.className = 'gm-section';
    secretsContent.innerHTML = `
      <h4>Dark Secrets:</h4>
      <ul>
        ${secrets.map(secret => `<li>${secret}</li>`).join('')}
      </ul>
    `;

    section.appendChild(header);
    section.appendChild(secretsContent);

    return section;
  }

  /**
   * Create background NPCs section for settlement detail
   * @param {Array} backgroundNpcs - Array of background NPC keys
   * @param {string} settlementName - Name of the settlement
   * @returns {HTMLElement} Background NPCs section element
   */
  createBackgroundNpcsSection(backgroundNpcs, settlementName) {
    console.log('SettlementCard: Creating background NPCs section', { backgroundNpcs, settlementName });
    
    const backgroundNpcsComponent = BackgroundNpcs.create();
    console.log('SettlementCard: Created background-npcs element', backgroundNpcsComponent);
    
    // Listen for the component to be ready
    backgroundNpcsComponent.addEventListener('componentReady', () => {
      console.log('SettlementCard: Component ready, calling displayBackgroundNpcs');
      backgroundNpcsComponent.displayBackgroundNpcs(backgroundNpcs, settlementName);
    });
    
    return backgroundNpcsComponent;
  }

  /**
   * Factory function to create a Key NPC accordion item
   * @param {string} npcKey - The key of the NPC
   * @param {Object} npc - The NPC data object
   * @returns {Promise<AccordionItem>} A promise that resolves to the created accordion item
   */
  async createKeyNpcAccordionItem(npcKey, npc) {
    return new Promise((resolve, reject) => {
      if (!npcKey || !npc) {
        console.error('SettlementCard: Invalid NPC data for key', npcKey);
        reject(new Error('Invalid NPC data'));
        return;
      }

      const accordionItem = AccordionItem.create();

      accordionItem.addEventListener('componentReady', () => {
        console.log('SettlementCard: Accordion item component ready for key NPC', npcKey);

        // Create NPC header component
        const npcHeader = NpcHeader.create();
        npcHeader.setNpcData(npc);

        // Create NPC content component
        const npcContent = NpcContent.create();
        npcContent.setNpcData(npcKey, npc);

        // Forward npcClick events from content component
        npcContent.addEventListener('npcClick', (event) => {
          event.stopPropagation();
          this.dispatchNpcClickEvent(event.detail.npc);
        });

        // Assign components to accordion item slots
        accordionItem.setHeader(npcHeader);
        accordionItem.setContent(npcContent);
      });
      
      resolve(accordionItem);
    });
  }

  /**
   * Dispatch NPC click event
   * @param {string} npcKey - NPC key
   */
  dispatchNpcClickEvent(npcKey) {
    const event = new CustomEvent('npcClick', {
      detail: { npc: npcKey }
    });
    document.dispatchEvent(event);
  }

  /**
   * Get NPC name by key
   * @param {string} npcKey - NPC key
   * @returns {string} NPC name or key if not found
   */
  getNpcName(npcKey) {
    const npc = this.dataService.getNpc(npcKey);
    return npc ? npc.name : npcKey;
  }

  /**
   * Truncate description text
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text
   */
  truncateDescription(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  /**
   * Dispatch settlement click event
   * @param {string} settlementKey - Settlement key
   */
  dispatchSettlementClickEvent(settlementKey) {
    const event = new CustomEvent('settlementClick', {
      detail: { settlement: settlementKey }
    });
    document.dispatchEvent(event);
  }

  /**
   * Create layout section for settlement detail
   * @param {Object} layoutData - Layout data object with structure and districts
   * @returns {HTMLElement} Layout section element
   */
  createLayoutSection(layoutData) {
    const section = document.createElement('div');
    section.className = 'settlement-layout-section';

    // Create settlement layout component
    const settlementLayout = SettlementLayout.create();
    
    // Set layout data once component is ready
    if (settlementLayout.isReady && settlementLayout.isReady()) {
      settlementLayout.setLayoutData(layoutData);
    } else {
      settlementLayout.addEventListener('componentReady', () => {
        settlementLayout.setLayoutData(layoutData);
      }, { once: true });
    }

    section.appendChild(settlementLayout);
    return section;
  }
}
