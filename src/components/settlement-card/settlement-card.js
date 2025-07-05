/**
 * Settlement Card component for displaying settlement information
 */

import { createElement } from '@/utils/dom-utils.js';
import { DataService } from '@/services/data-service.js';

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
    const card = createElement('div', {
      className: 'settlement-card',
      attributes: {
        'data-settlement': settlementKey,
        'role': 'button',
        'tabindex': '0'
      }
    });

    const header = createElement('div', {
      className: 'settlement-header',
      innerHTML: `
        <h4 class="settlement-name">${settlement.name}</h4>
        <p class="settlement-type">${settlement.type}</p>
      `
    });

    const description = createElement('p', {
      className: 'settlement-description',
      innerHTML: this.truncateDescription(settlement.description, 100)
    });    const population = createElement('span', {
      className: 'population',
      innerHTML: settlement.population,
      attributes: {
        'title': `Population: ${settlement.population}`
      }
    });

    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(population);

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
    const container = createElement('div', {
      className: 'settlement-grid'
    });

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
   */
  createDetailView(settlementKey) {
    const settlement = this.dataService.getSettlement(settlementKey);
    if (!settlement) {
      return createElement('div', {
        className: 'settlement-detail error',
        innerHTML: '<p>Settlement not found</p>'
      });
    }

    const container = createElement('div', {
      className: 'settlement-detail'
    });

    // Header
    const header = createElement('div', {
      className: 'settlement-header',
      innerHTML: `
        <h3>${settlement.name}</h3>
        <div class="settlement-meta">
          <span class="settlement-type">${settlement.type}</span>
          <span class="settlement-population">${settlement.population}</span>
        </div>
      `
    });

    // Description
    const description = createElement('div', {
      className: 'settlement-description',
      innerHTML: `<p>${settlement.description}</p>`
    });

    // Content sections
    const content = createElement('div', {
      className: 'settlement-content'
    });

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
   */
  createLocationsSection(locations) {
    const section = createElement('div', {
      className: 'locations-section'
    });

    const header = createElement('h4', {
      innerHTML: 'Notable Locations'
    });

    const locationsList = createElement('div', {
      className: 'locations-list'
    });

    locations.forEach(location => {
      const locationItem = createElement('div', {
        className: 'location-item'
      });

      const locationHeader = createElement('div', {
        className: 'location-header',
        innerHTML: `
          <h5 class="location-name">${location.name}</h5>
          ${location.hasDetails ? '<span class="detail-indicator">📄</span>' : ''}
          ${location.hasDetails ? 
            `<button class="location-detail-btn" data-location="${location.id}">Details</button>` : ''
          }
        `
      });

      const locationDesc = createElement('p', {
        className: 'location-desc',
        innerHTML: location.shortDesc
      });

      locationItem.appendChild(locationHeader);
      locationItem.appendChild(locationDesc);

      // Add NPCs if present
      if (location.npcs && location.npcs.length > 0) {
        const npcsDiv = createElement('div', {
          className: 'location-npcs',
          innerHTML: `
            <strong>NPCs:</strong> 
            ${location.npcs.map(npc => `
              <button class="npc-mini-link" data-npc="${npc}">${this.getNpcName(npc)}</button>
            `).join('')}
          `
        });
        locationItem.appendChild(npcsDiv);
      }

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
    const section = createElement('div', {
      className: 'key-npcs-section'
    });

    const header = createElement('h4', {
      innerHTML: 'Key NPCs'
    });

    const npcsList = createElement('div', {
      className: 'key-npcs-list'
    });

    npcs.forEach(npcKey => {
      const npc = this.dataService.getNpc(npcKey);
      if (npc) {
        const npcItem = createElement('div', {
          className: 'key-npc-item',
          innerHTML: `
            <button class="npc-link" data-npc="${npcKey}">
              <span class="npc-name">${npc.name}</span>
              <span class="npc-role-small">${npc.role}</span>
            </button>
          `
        });
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
    const section = createElement('div', {
      className: 'dark-secrets gm-sections'
    });

    const header = createElement('div', {
      className: 'gm-header',
      innerHTML: `
        <h3>🎲 GM Information</h3>
        <p class="gm-note">The following sections contain GM-only information</p>
      `
    });

    const secretsContent = createElement('div', {
      className: 'gm-section',
      innerHTML: `
        <h4>Dark Secrets:</h4>
        <ul>
          ${secrets.map(secret => `<li>${secret}</li>`).join('')}
        </ul>
      `
    });

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
