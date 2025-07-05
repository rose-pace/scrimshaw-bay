/**
 * NPC Card component for displaying NPC information
 */

import { createElement } from '@/utils/dom-utils.js';
import { DataService } from '@/services/data-service.js';

export class NpcCard {
  constructor() {
    this.dataService = new DataService();
  }

  /**
   * Create an NPC card element
   * @param {Object} npc - NPC data
   * @param {string} npcKey - NPC key
   * @returns {HTMLElement} NPC card element
   */
  create(npc, npcKey) {
    const card = createElement('div', {
      className: 'npc-card',
      attributes: {
        'data-npc': npcKey,
        'role': 'button',
        'tabindex': '0'
      }
    });

    const header = createElement('div', {
      className: 'npc-header',
      innerHTML: `
        <h3 class="npc-name">${npc.name}</h3>
        <span class="npc-location">${npc.location}</span>
      `
    });

    const role = createElement('p', {
      className: 'npc-role',
      innerHTML: npc.role
    });

    const description = createElement('p', {
      className: 'npc-description',
      innerHTML: this.truncateDescription(npc.description, 120)
    });

    const detailsBtn = createElement('button', {
      className: 'npc-link',
      attributes: {
        'data-npc': npcKey
      },
      innerHTML: 'View Details'
    });

    card.appendChild(header);
    card.appendChild(role);
    card.appendChild(description);
    card.appendChild(detailsBtn);

    return card;
  }

  /**
   * Create all NPC cards
   * @returns {HTMLElement} Container with all NPC cards
   */
  createAllCards() {
    const container = createElement('div', {
      className: 'npc-grid'
    });

    const npcs = this.dataService.getAllNpcs();
    
    npcs.forEach(npc => {
      const card = this.create(npc, npc.key);
      container.appendChild(card);
    });

    return container;
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
}
