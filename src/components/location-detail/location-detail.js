/**
 * Location Detail component for displaying detailed location information
 */

import { createElement } from '@/utils/dom-utils.js';
import { DataService } from '@/services/data-service.js';

export class LocationDetail {
  constructor() {
    this.dataService = new DataService();
  }

  /**
   * Create location detail element
   * @param {string} locationKey - Location key
   * @returns {HTMLElement} Location detail element
   */
  create(locationKey) {
    const location = this.dataService.getLocation(locationKey);
    if (!location) {
      return createElement('div', {
        className: 'location-detail error',
        innerHTML: '<p>Location not found</p>'
      });
    }

    const container = createElement('div', {
      className: 'location-detail'
    });

    // Header
    const header = createElement('div', {
      className: 'location-header',
      innerHTML: `
        <h3>${location.name}</h3>
        <span class="location-type">${location.type}</span>
      `
    });

    // Description
    const description = createElement('div', {
      className: 'location-description',
      innerHTML: `<p>${location.description}</p>`
    });

    container.appendChild(header);
    container.appendChild(description);

    // Layout section
    if (location.layout) {
      const layoutSection = this.createLayoutSection(location.layout);
      container.appendChild(layoutSection);
    }

    // Inventory section
    if (location.inventory) {
      const inventorySection = this.createInventorySection(location.inventory);
      container.appendChild(inventorySection);
    }

    // NPCs section
    if (location.npcs && location.npcs.length > 0) {
      const npcsSection = this.createNpcsSection(location.npcs);
      container.appendChild(npcsSection);
    }

    // Quest hooks
    if (location.questHooks && location.questHooks.length > 0) {
      const hooksSection = this.createQuestHooksSection(location.questHooks);
      container.appendChild(hooksSection);
    }

    // GM Secrets
    if (location.secrets) {
      const secretsSection = this.createSecretsSection(location.secrets);
      container.appendChild(secretsSection);
    }

    return container;
  }

  /**
   * Create layout section
   * @param {Object} layout - Layout data
   * @returns {HTMLElement} Layout section element
   */
  createLayoutSection(layout) {
    const section = createElement('div', {
      className: 'location-section'
    });

    const header = createElement('h4', {
      innerHTML: 'Layout'
    });

    const areas = createElement('div', {
      className: 'layout-areas'
    });

    const layoutItems = layout.floors || layout.areas || [];
    layoutItems.forEach(area => {
      const areaElement = createElement('div', {
        className: 'area-entry',
        innerHTML: `
          <h5>${area.name}</h5>
          <p>${area.description}</p>
          ${area.features ? `
            <div class="area-features">
              <strong>Features:</strong>
              <ul>
                ${area.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        `
      });
      areas.appendChild(areaElement);
    });

    section.appendChild(header);
    section.appendChild(areas);

    return section;
  }

  /**
   * Create inventory section
   * @param {Object} inventory - Inventory data
   * @returns {HTMLElement} Inventory section element
   */
  createInventorySection(inventory) {
    const section = createElement('div', {
      className: 'location-section location-inventory'
    });

    const header = createElement('h4', {
      innerHTML: 'Available Goods & Services'
    });

    section.appendChild(header);

    Object.entries(inventory).forEach(([category, items]) => {
      if (items && items.length > 0) {
        const categorySection = createElement('div', {
          className: 'inventory-category',
          innerHTML: `
            <h5>${category.charAt(0).toUpperCase() + category.slice(1)}:</h5>
            <div class="inventory-items">
              ${items.map(item => `
                <div class="inventory-item">
                  <strong>${item.item || item.service}</strong> - ${item.price}
                  ${item.description ? ` (${item.description})` : ''}
                  ${item.quality ? ` - ${item.quality}` : ''}
                </div>
              `).join('')}
            </div>
          `
        });
        section.appendChild(categorySection);
      }
    });

    return section;
  }

  /**
   * Create NPCs section
   * @param {Array} npcs - Array of NPC keys
   * @returns {HTMLElement} NPCs section element
   */
  createNpcsSection(npcs) {
    const section = createElement('div', {
      className: 'location-section'
    });

    const header = createElement('h4', {
      innerHTML: 'NPCs Found Here'
    });

    const npcsList = createElement('div', {
      className: 'location-npcs'
    });

    npcs.forEach(npcKey => {
      const npc = this.dataService.getNpc(npcKey);
      if (npc) {
        const npcButton = createElement('button', {
          className: 'npc-mini-link',
          attributes: {
            'data-npc': npcKey
          },
          innerHTML: npc.name
        });
        npcsList.appendChild(npcButton);
      }
    });

    section.appendChild(header);
    section.appendChild(npcsList);

    return section;
  }

  /**
   * Create quest hooks section
   * @param {Array} hooks - Array of quest hooks
   * @returns {HTMLElement} Quest hooks section element
   */
  createQuestHooksSection(hooks) {
    const section = createElement('div', {
      className: 'location-section'
    });

    const header = createElement('h4', {
      innerHTML: 'Adventure Hooks'
    });

    const hooksList = createElement('ul', {
      innerHTML: hooks.map(hook => `<li>${hook}</li>`).join('')
    });

    section.appendChild(header);
    section.appendChild(hooksList);

    return section;
  }

  /**
   * Create secrets section
   * @param {Object} secrets - Secrets data
   * @returns {HTMLElement} Secrets section element
   */
  createSecretsSection(secrets) {
    const section = createElement('div', {
      className: 'gm-sections'
    });

    const header = createElement('div', {
      className: 'gm-header',
      innerHTML: `
        <h3>🎲 GM Information</h3>
        <p class="gm-note">The following sections contain GM-only information</p>
      `
    });

    section.appendChild(header);

    if (secrets.gmNotes) {
      const notesSection = createElement('div', {
        className: 'gm-section',
        innerHTML: `
          <h4>GM Notes:</h4>
          <p>${secrets.gmNotes}</p>
        `
      });
      section.appendChild(notesSection);
    }

    if (secrets.hiddenItems && secrets.hiddenItems.length > 0) {
      const hiddenSection = createElement('div', {
        className: 'gm-section hidden-items',
        innerHTML: `
          <h5>Hidden Items:</h5>
          ${secrets.hiddenItems.map(item => `
            <div class="hidden-item">
              <h6>${item.item}</h6>
              <p><strong>Location:</strong> ${item.location}</p>
              <p><strong>Description:</strong> ${item.description}</p>
            </div>
          `).join('')}
        `
      });
      section.appendChild(hiddenSection);
    }

    if (secrets.observations && secrets.observations.length > 0) {
      const observationsSection = createElement('div', {
        className: 'gm-section observations',
        innerHTML: `
          <h5>Observations:</h5>
          <ul>
            ${secrets.observations.map(obs => `<li>${obs}</li>`).join('')}
          </ul>
        `
      });
      section.appendChild(observationsSection);
    }

    return section;
  }
}
