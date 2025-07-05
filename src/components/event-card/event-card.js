/**
 * Event Card component for displaying event information
 */

import { createElement } from '@/utils/dom-utils.js';
import { DataService } from '@/services/data-service.js';

export class EventCard {
  constructor() {
    this.dataService = new DataService();
  }

  /**
   * Create an event card element
   * @param {Object} event - Event data
   * @param {string} eventKey - Event key
   * @returns {HTMLElement} Event card element
   */
  create(event, eventKey) {
    const card = createElement('div', {
      className: 'event-card',
      attributes: {
        'data-event': eventKey
      }
    });

    const title = createElement('h3', {
      innerHTML: event.name
    });

    const description = createElement('p', {
      className: 'event-description',
      innerHTML: event.description
    });

    card.appendChild(title);
    card.appendChild(description);

    // Add trigger information
    if (event.trigger) {
      const triggerDiv = createElement('div', {
        className: 'event-details',
        innerHTML: `
          <h4>Trigger:</h4>
          <p>${event.trigger}</p>
        `
      });
      card.appendChild(triggerDiv);
    }

    // Add outcomes
    if (event.outcomes && event.outcomes.length > 0) {
      const outcomesDiv = createElement('div', {
        className: 'event-outcomes',
        innerHTML: `
          <h4>Possible Outcomes:</h4>
          <ul>
            ${event.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
          </ul>
        `
      });
      card.appendChild(outcomesDiv);
    }

    // Add hooks
    if (event.hooks && event.hooks.length > 0) {
      const hooksDiv = createElement('div', {
        className: 'event-hooks',
        innerHTML: `
          <h4>Adventure Hooks:</h4>
          <ul>
            ${event.hooks.map(hook => `<li>${hook}</li>`).join('')}
          </ul>
        `
      });
      card.appendChild(hooksDiv);
    }

    // Add encounters
    if (event.encounters) {
      const encountersDiv = this.createEncountersSection(event.encounters);
      card.appendChild(encountersDiv);
    }

    return card;
  }

  /**
   * Create all event cards
   * @returns {HTMLElement} Container with all event cards
   */
  createAllCards() {
    const container = createElement('div', {
      className: 'events-list'
    });

    const events = this.dataService.getAllEvents();
    
    events.forEach(event => {
      const card = this.create(event, event.key);
      container.appendChild(card);
    });

    return container;
  }

  /**
   * Create encounters section
   * @param {Object} encounters - Encounters data
   * @returns {HTMLElement} Encounters section
   */
  createEncountersSection(encounters) {
    const section = createElement('div', {
      className: 'event-encounters'
    });

    if (encounters.ritual) {
      const ritualDiv = createElement('div', {
        className: 'event-ritual',
        innerHTML: `
          <h4>Ritual Details:</h4>
          <ol>
            ${encounters.ritual.map(step => `<li>${step}</li>`).join('')}
          </ol>
        `
      });
      section.appendChild(ritualDiv);
    }

    if (encounters.creatures) {
      const creaturesDiv = createElement('div', {
        className: 'event-creature',
        innerHTML: `
          <h4>Creatures:</h4>
          <div class="creature-list">
            ${encounters.creatures.map(creature => `
              <div class="creature-entry">
                <h5>${creature.name}</h5>
                <p>${creature.description}</p>
                ${creature.abilities ? `
                  <div class="creature-abilities">
                    <strong>Abilities:</strong> ${creature.abilities.join(', ')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `
      });
      section.appendChild(creaturesDiv);
    }

    if (encounters.clues) {
      const cluesDiv = createElement('div', {
        className: 'event-clues',
        innerHTML: `
          <h4>Investigation Clues:</h4>
          <ul>
            ${encounters.clues.map(clue => `<li>${clue}</li>`).join('')}
          </ul>
        `
      });
      section.appendChild(cluesDiv);
    }

    return section;
  }
}
