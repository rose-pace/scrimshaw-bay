/**
 * Threat Card component for displaying threat information
 */

import { createElement } from '@/utils/dom-utils.js';
import { DataService } from '@/services/data-service.js';

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
    const card = createElement('div', {
      className: `threat-card ${this.getThreatClass(threat.type)}`,
      attributes: {
        'data-threat': threatKey
      }
    });

    const title = createElement('h3', {
      innerHTML: threat.name
    });

    const type = createElement('p', {
      className: 'threat-type',
      innerHTML: threat.type
    });

    const description = createElement('p', {
      innerHTML: this.truncateDescription(threat.description, 150)
    });

    const detailsBtn = createElement('button', {
      className: 'details-btn',
      attributes: {
        'data-threat': threatKey
      },
      innerHTML: 'View Details'
    });

    card.appendChild(title);
    card.appendChild(type);
    card.appendChild(description);

    // Add corruption indicator if present
    if (threat.corruptionLevel) {
      const corruptionIndicator = createElement('div', {
        className: `corruption-indicator ${threat.corruptionLevel.toLowerCase()}`,
        innerHTML: `${threat.corruptionLevel} Corruption`
      });
      card.appendChild(corruptionIndicator);
    }

    card.appendChild(detailsBtn);

    return card;
  }

  /**
   * Create all threat cards
   * @returns {HTMLElement} Container with all threat cards
   */
  createAllCards() {
    const container = createElement('div', {
      className: 'content-grid'
    });

    const threats = this.dataService.getAllThreats();
    
    threats.forEach(threat => {
      const card = this.create(threat, threat.key);
      container.appendChild(card);
    });

    return container;
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
