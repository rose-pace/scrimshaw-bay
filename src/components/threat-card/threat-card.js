/**
 * Threat Card component for displaying threat information
 */

import { DataService } from '@/services/data-service.js';
import { createThreatCard } from '@/utils/template-utils.js';

export class ThreatCard {
  constructor() {
    this.dataService = new DataService();
  }
  /**
   * Create a threat card element
   * @param {Object} threat - Threat data
   * @param {string} threatKey - Threat key
   * @returns {HTMLElement} Threat card element
   */
  create(threat, threatKey) {
    const card = createThreatCard(threat, threatKey);

    // Add click handler
    card.addEventListener('click', () => {
      this.dispatchThreatClickEvent(threatKey);
    });

    // Add keyboard handler
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.dispatchThreatClickEvent(threatKey);
      }
    });

    return card;
  }

  /**
   * Create all threat cards
   * @returns {HTMLElement} Container with all threat cards
   */  createAllCards() {
    const container = document.createElement('div');
    container.className = 'content-grid';

    const threats = this.dataService.getAllThreats();
    
    threats.forEach(threat => {
      const card = this.create(threat, threat.key);
      container.appendChild(card);
    });

    return container;
  }

  /**
   * Dispatch threat click event
   * @param {string} threatKey - Threat key
   */
  dispatchThreatClickEvent(threatKey) {
    const event = new CustomEvent('threatClick', {
      detail: { threat: threatKey }
    });
    document.dispatchEvent(event);
  }

  /**
   * Get CSS class for threat type
   * @param {string} type - Threat type
   * @returns {string} CSS class name
   */
  getThreatClass(type) {
    const typeMap = {
      'Cosmic Horror': 'cosmic',
      'Corrupted Aristocrat': 'aristocratic',
      'Body Horror': 'environmental',
      'Environmental Horror': 'environmental',
      'Social Horror': 'social',
      'Industrial Horror': 'industrial',
      'Planar Horror': 'planar'
    };
    
    return typeMap[type] || 'environmental';
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
