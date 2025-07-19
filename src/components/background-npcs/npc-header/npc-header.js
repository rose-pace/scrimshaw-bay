/**
 * NPC Header component for displaying NPC name, role, and quick preview
 * Uses shadow DOM for style encapsulation
 */

import { ShadowComponent } from '@/components/base/shadow-component.js';
import styles from './npc-header.css' with { type: 'css' };

export class NpcHeader extends ShadowComponent {
  constructor() {
    super();
    this.npcData = null;
  }

  /**
   * Define observed attributes
   */
  static get observedAttributes() {
    return ['npc-name', 'npc-role'];
  }

  /**
   * Handle attribute changes
   * @param {string} name - Attribute name
   * @param {string} oldValue - Old value
   * @param {string} newValue - New value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.isReady()) return;

    if (name === 'npc-name' || name === 'npc-role') {
      this.updateHeaderContent();
    }
  }

  /**
   * Setup shadow DOM structure and styles
   */
  setupShadowDOM() {
    this.applyStyles(styles);
    
    this._shadowRoot.innerHTML = `
      <div class="npc-header">
        <div class="npc-name-container">
          <h5 class="npc-name"></h5>
          <div class="npc-role"></div>
        </div>
      </div>
    `;

    this.nameElement = this._shadowRoot.querySelector('.npc-name');
    this.roleElement = this._shadowRoot.querySelector('.npc-role');
  }

  /**
   * Process pending data that was stored before connection
   */
  processPendingData() {
    if (this.pendingData) {
      this.setNpcData(this.pendingData);
    }
  }

  /**
   * Set NPC data and render header
   * @param {Object} npcData - NPC data object
   */
  setNpcData(npcData) {
    if (!this.isReady()) {
      this.storePendingData(npcData);
      return;
    }

    this.npcData = npcData;
    this.renderHeader();
  }

  /**
   * Update header content from attributes
   */
  updateHeaderContent() {
    if (!this.nameElement || !this.roleElement) return;

    const name = this.getAttribute('npc-name');
    const role = this.getAttribute('npc-role');

    if (name) {
      this.nameElement.textContent = name;
    }

    if (role) {
      this.roleElement.textContent = role;
      this.roleElement.style.display = 'block';
    } else {
      this.roleElement.style.display = 'none';
    }
  }

  /**
   * Render the NPC header content
   */
  renderHeader() {
    if (!this.npcData || !this.nameElement) return;

    // Set name
    this.nameElement.textContent = this.npcData.name || 'Unknown NPC';

    // Set role
    if (this.npcData.role) {
      this.roleElement.textContent = this.npcData.role;
      this.roleElement.style.display = 'block';
    } else {
      this.roleElement.style.display = 'none';
    }
  }

  /**
   * Get NPC name
   * @returns {string} NPC name
   */
  getNpcName() {
    return this.npcData?.name || this.getAttribute('npc-name') || '';
  }

  /**
   * Get NPC role
   * @returns {string} NPC role
   */
  getNpcRole() {
    return this.npcData?.role || this.getAttribute('npc-role') || '';
  }

  /**
   * Factory method to create NPC header instances
   * @returns {NpcHeader} New NPC header element
   */
  static create() {
    return document.createElement('npc-header');
  }
}

customElements.define('npc-header', NpcHeader);
