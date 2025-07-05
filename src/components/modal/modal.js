/**
 * Modal component for displaying detailed information
 */

import { ModalService } from '@/services/modal-service.js';
import { DataService } from '@/services/data-service.js';
import { createElement } from '@/utils/dom-utils.js';

export class Modal {
  constructor() {
    this.modalService = new ModalService();
    this.dataService = new DataService();
  }

  /**
   * Shows NPC details in a modal
   * @param {string} npcKey - NPC identifier
   */
  showNpcDetails(npcKey) {
    const npc = this.dataService.getNpc(npcKey);
    if (!npc) {
      console.error(`NPC not found: ${npcKey}`);
      return;
    }

    const content = this.createNpcContent(npc, npcKey);
    
    return this.modalService.createModal({
      title: '',
      content,
      className: 'npc-modal',
      closeOnOverlayClick: true
    });
  }

  /**
   * Shows threat details in a modal
   * @param {string} threatKey - Threat identifier
   */
  showThreatDetails(threatKey) {
    const threat = this.dataService.getThreat(threatKey);
    if (!threat) {
      console.error(`Threat not found: ${threatKey}`);
      return;
    }

    const content = this.createThreatContent(threat, threatKey);
    
    return this.modalService.createModal({
      title: '',
      content,
      className: 'threat-modal',
      closeOnOverlayClick: true
    });
  }

  /**
   * Shows location details in a modal
   * @param {string} locationKey - Location identifier
   */
  showLocationDetails(locationKey) {
    const location = this.dataService.getLocation(locationKey);
    if (!location) {
      console.error(`Location not found: ${locationKey}`);
      return;
    }

    const content = this.createLocationContent(location, locationKey);
    
    return this.modalService.createModal({
      title: '',
      content,
      className: 'location-modal',
      closeOnOverlayClick: true
    });
  }

  /**
   * Creates NPC modal content
   * @param {Object} npc - NPC data
   * @param {string} npcKey - NPC key
   * @returns {string} HTML content
   */
  createNpcContent(npc, npcKey) {
    return `
      <div class="npc-network-modal">
        <div class="modal-header">
          <div class="npc-header-info">
            <h2>${npc.name}</h2>
            <span class="npc-location-tag">${npc.location}</span>
          </div>
          <button class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="npc-section">
            <h4>Role:</h4>
            <p class="npc-role">${npc.role}</p>
          </div>
          
          <div class="npc-section">
            <h4>Description:</h4>
            <p class="npc-description">${npc.description}</p>
          </div>
          
          ${npc.services && npc.services.length > 0 ? `
            <div class="npc-section npc-services">
              <h4>Services:</h4>
              <ul>
                ${npc.services.map(service => `<li>${service}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${npc.knowledge && npc.knowledge.length > 0 ? `
            <div class="npc-section npc-knowledge">
              <h4>Knowledge:</h4>
              <div class="knowledge-list">
                ${npc.knowledge.map(knowledge => `
                  <div class="knowledge-entry">
                    <h5>${knowledge.topic}</h5>
                    <p>${knowledge.info}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <!-- GM-Only Sections -->
          <div class="gm-sections">
            <div class="gm-header">
              <h3>🎲 GM Information</h3>
              <p class="gm-note">The following sections contain GM-only information</p>
            </div>
            
            ${npc.secrets && npc.secrets.length > 0 ? `
              <div class="gm-section npc-secrets">
                <h4>Secrets:</h4>
                <ul>
                  ${npc.secrets.map(secret => `<li>${secret}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            
            ${npc.motivations && npc.motivations.length > 0 ? `
              <div class="gm-section npc-motivations">
                <h4>Motivations:</h4>
                <ul>
                  ${npc.motivations.map(motivation => `<li>${motivation}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            
            ${npc.abilities && npc.abilities.length > 0 ? `
              <div class="gm-section">
                <h4>Abilities:</h4>
                <ul>
                  ${npc.abilities.map(ability => `<li>${ability}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Creates threat modal content
   * @param {Object} threat - Threat data
   * @param {string} threatKey - Threat key
   * @returns {string} HTML content
   */
  createThreatContent(threat, threatKey) {
    return `
      <div class="threat-network-modal">
        <div class="modal-header">
          <div class="threat-header-info">
            <h2>${threat.name}</h2>
            <span class="threat-type">${threat.type}</span>
          </div>
          <button class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="threat-section">
            <h4>Description:</h4>
            <p>${threat.description}</p>
          </div>
          
          ${threat.abilities && threat.abilities.length > 0 ? `
            <div class="threat-section">
              <h4>Abilities:</h4>
              <ul>
                ${threat.abilities.map(ability => `<li>${ability}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${threat.influence && threat.influence.length > 0 ? `
            <div class="threat-section">
              <h4>Regional Influence:</h4>
              <ul>
                ${threat.influence.map(effect => `<li>${effect}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${threat.stats ? `
            <div class="threat-section">
              <h4>Game Statistics:</h4>
              <p class="threat-stats">${threat.stats}</p>
            </div>
          ` : ''}
          
          ${threat.weaknesses && threat.weaknesses.length > 0 ? `
            <div class="threat-section">
              <h4>Weaknesses:</h4>
              <ul>
                ${threat.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Creates location modal content
   * @param {Object} location - Location data
   * @param {string} locationKey - Location key
   * @returns {string} HTML content
   */
  createLocationContent(location, locationKey) {
    const createLocationLinks = (items, type) => {
      if (!items || items.length === 0) return '';
      
      return items.map(item => {
        const className = `network-link ${type}-link`;
        return `<button class="${className}" data-${type}="${item}">${item}</button>`;
      }).join('');
    };

    return `
      <div class="location-detail-modal">
        <div class="modal-header">
          <div class="location-header-info">
            <h2>${location.name}</h2>
            <span class="location-type-tag">${location.type}</span>
          </div>
          <button class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <p class="location-description">${location.description}</p>
          
          ${location.layout ? `
            <div class="location-section">
              <h4>Layout:</h4>
              <div class="layout-areas">
                ${(location.layout.floors || location.layout.areas || []).map(area => `
                  <div class="area-entry">
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
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${location.inventory ? `
            <div class="location-section location-inventory">
              <h4>Available Goods & Services:</h4>
              
              ${location.inventory.drinks ? `
                <div class="inventory-category">
                  <h5>Drinks:</h5>
                  <div class="inventory-items">
                    ${location.inventory.drinks.map(item => `
                      <div class="inventory-item">
                        <strong>${item.item}</strong> - ${item.price} (${item.quality || item.description || ''})
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              
              ${location.inventory.food ? `
                <div class="inventory-category">
                  <h5>Food:</h5>
                  <div class="inventory-items">
                    ${location.inventory.food.map(item => `
                      <div class="inventory-item">
                        <strong>${item.item}</strong> - ${item.price} ${item.description ? `(${item.description})` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              
              ${location.inventory.services ? `
                <div class="inventory-category">
                  <h5>Services:</h5>
                  <div class="inventory-items">
                    ${location.inventory.services.map(item => `
                      <div class="inventory-item">
                        <strong>${item.service}</strong> - ${item.price} ${item.description ? `(${item.description})` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          ` : ''}
          
          ${location.questHooks && location.questHooks.length > 0 ? `
            <div class="location-section">
              <h4>Adventure Hooks:</h4>
              <ul>
                ${location.questHooks.map(hook => `<li>${hook}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          <!-- GM-Only Sections -->
          <div class="gm-sections">
            <div class="gm-header">
              <h3>🎲 GM Information</h3>
              <p class="gm-note">The following sections contain GM-only information</p>
            </div>
            
            ${location.secrets ? `
              <div class="gm-section">
                <h4>GM Notes:</h4>
                <p class="gm-notes">${location.secrets.gmNotes}</p>
                
                ${location.secrets.hiddenItems && location.secrets.hiddenItems.length > 0 ? `
                  <div class="hidden-items">
                    <h5>Hidden Items:</h5>
                    ${location.secrets.hiddenItems.map(item => `
                      <div class="hidden-item">
                        <h6>${item.item}</h6>
                        <p><strong>Location:</strong> ${item.location}</p>
                        <p><strong>Description:</strong> ${item.description}</p>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
                
                ${location.secrets.observations && location.secrets.observations.length > 0 ? `
                  <div class="observations">
                    <h5>Observations:</h5>
                    <ul>
                      ${location.secrets.observations.map(obs => `<li>${obs}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
          
          <div class="location-network">
            <h3>Connections</h3>
            
            ${location.npcs && location.npcs.length > 0 ? `
              <div class="network-section">
                <h4>🧙 NPCs Found Here:</h4>
                <div class="network-links">
                  ${createLocationLinks(location.npcs, 'npc')}
                </div>
              </div>
            ` : ''}
            
            ${location.relatedThreats ? `
              <div class="network-section">
                <h4>⚠️ Related Threats:</h4>
                <div class="network-links">
                  ${createLocationLinks(location.relatedThreats, 'threat')}
                </div>
              </div>
            ` : ''}
            
            ${location.relatedEvents ? `
              <div class="network-section">
                <h4>📅 Related Events:</h4>
                <div class="network-links">
                  ${createLocationLinks(location.relatedEvents, 'event')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Closes a modal
   * @param {string} modalId - Modal ID to close
   */
  closeModal(modalId) {
    this.modalService.closeModal(modalId);
  }

  /**
   * Closes all modals
   */
  closeAllModals() {
    this.modalService.closeAllModals();
  }
}
