import { ensureNode } from '@/utils/dom-utils.js';
import styles from './gm-section-item.css' assert { type: 'css' };

export class GmSectionItem extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Called when the element is added to the DOM
   */
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open', slotAssignment: 'manual' });
    
    // Adopt the imported stylesheet
    shadow.adoptedStyleSheets = [styles];
    
    shadow.innerHTML = `
    <div class="gm-section">
      <h4>
        <slot name="title">Section Title</slot>
      </h4>
      <slot name="content">Content goes here...</slot>
    </div>
  `;
  }

  /**
   * Create a GM section item element
   * @param {Element|Text|string} title - Section title
   * @param {Element|Text|string} content - Section content
   */
  setContent(title, content) {
    const slots = this.shadowRoot.querySelectorAll('slot');
    const titleNode = ensureNode(title);
    const contentNode = ensureNode(content);

    Array.from(slots).forEach(slot => {
      switch (slot.name) {
        case 'title':
          slot.assign(titleNode);
          break;
        case 'content':
          slot.assign(contentNode);
          break;
        default:
          slot.assign();
      }
    });
  }
}
