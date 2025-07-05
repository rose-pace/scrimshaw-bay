/**
 * NPC Card component for displaying NPC information
 */

import { DataService } from '@/services/data-service.js';
import { createNpcCard } from '@/utils/template-utils.js';

export class NpcCard {
  constructor() {
    this.dataService = new DataService();
  }

  /**
   * Create an NPC card element
   * @param {Object} npc - NPC data
   * @param {string} npcKey - NPC key
   * @returns {HTMLElement} NPC card element
   */  create(npc, npcKey) {
    const card = createNpcCard(npc, npcKey);

    // Add click handler
    card.addEventListener('click', () => {
      this.dispatchNpcClickEvent(npcKey);
    });

    // Add keyboard handler
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.dispatchNpcClickEvent(npcKey);
      }
    });

    return card;
  }
  /**
   * Create all NPC cards
   * @returns {HTMLElement} Container with all NPC cards
   */
  createAllCards() {
    const container = document.createElement('div');
    container.className = 'npc-grid';

    const npcs = this.dataService.getAllNpcs();
    
    npcs.forEach(npc => {
      const card = this.create(npc, npc.key);
      container.appendChild(card);
    });

    return container;
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
