/**
 * Settlement Card component for displaying settlement information
 */

import { DataService } from '@/services/data-service.js';
import { 
  cloneTemplate,
  createSettlementCard,
  createSettlementDetailHeader,
  createLocationItem,
  createNpcLink
} from '@/utils/template-utils.js';

export class SettlementCard {
  constructor() {
    this.dataService = new DataService();
  }  /**
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
   * @returns {HTMLElement} Settlement detail element
   */  createDetailView(settlementKey) {
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
      const npcsSection = this.createNpcsSection(settlement.keyNpcs);
      content.appendChild(npcsSection);
    }

    // Dark Secrets (GM Only)
    if (settlement.darkSecrets && settlement.darkSecrets.length > 0) {
      const secretsSection = this.createSecretsSection(settlement.darkSecrets);
      content.appendChild(secretsSection);
    }

    container.appendChild(header);
    container.appendChild(description);
    container.appendChild(content);

    return container;
  }

  /**
   * Create locations section for settlement detail
   * @param {Array} locations - Array of location objects
   * @returns {HTMLElement} Locations section element
   */  createLocationsSection(locations) {
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
  createNpcsSection(npcs) {
    const section = document.createElement('div');
    section.className = 'key-npcs-section';

    const header = document.createElement('h4');
    header.innerHTML = 'Key NPCs';

    const npcsList = document.createElement('div');
    npcsList.className = 'key-npcs-list';

    npcs.forEach(npcKey => {
      const npc = this.dataService.getNpc(npcKey);
      if (npc) {
        const npcItem = createNpcLink(npc, npcKey);
        npcsList.appendChild(npcItem);
      }
    });

    section.appendChild(header);
    section.appendChild(npcsList);

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
}
