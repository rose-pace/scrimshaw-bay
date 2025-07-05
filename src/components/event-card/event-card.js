/**
 * Event Card component for displaying event information
 */

import { DataService } from '@/services/data-service.js';
import { createEventCard } from '@/utils/template-utils.js';

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
    const card = createEventCard(event, eventKey);

    // Add click handler
    card.addEventListener('click', () => {
      this.dispatchEventClickEvent(eventKey);
    });

    // Add keyboard handler
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.dispatchEventClickEvent(eventKey);
      }
    });

    return card;
  }
  /**
   * Create all event cards
   * @returns {HTMLElement} Container with all event cards
   */
  createAllCards() {
    const container = document.createElement('div');
    container.className = 'events-list';

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
    const section = document.createElement('div');
    section.className = 'event-encounters';

    if (encounters.ritual) {
      const ritualDiv = document.createElement('div');
      ritualDiv.className = 'event-ritual';
      ritualDiv.innerHTML = `
        <h4>Ritual Details:</h4>
        <ol>
          ${encounters.ritual.map(step => `<li>${step}</li>`).join('')}
        </ol>
      `;
      section.appendChild(ritualDiv);
    }

    if (encounters.creatures) {
      const creaturesDiv = document.createElement('div');
      creaturesDiv.className = 'event-creature';
      creaturesDiv.innerHTML = `
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
      `;
      section.appendChild(creaturesDiv);
    }

    if (encounters.clues) {
      const cluesDiv = document.createElement('div');
      cluesDiv.className = 'event-clues';
      cluesDiv.innerHTML = `
        <h4>Investigation Clues:</h4>
        <ul>
          ${encounters.clues.map(clue => `<li>${clue}</li>`).join('')}
        </ul>
      `;
      section.appendChild(cluesDiv);
    }

    return section;
  }

  /**
   * Dispatch event click event
   * @param {string} eventKey - Event key
   */
  dispatchEventClickEvent(eventKey) {
    const event = new CustomEvent('eventClick', {
      detail: { event: eventKey }
    });
    document.dispatchEvent(event);
  }
}
