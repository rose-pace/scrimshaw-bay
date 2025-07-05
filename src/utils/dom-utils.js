/**
 * DOM utility functions for creating and manipulating elements
 */

/**
 * Creates a DOM element with specified properties
 * @param {string} tag - HTML tag name
 * @param {Object} options - Element properties
 * @param {string} options.className - CSS class name
 * @param {string} options.innerHTML - Inner HTML content
 * @param {Object} options.attributes - HTML attributes to set
 * @param {Array<HTMLElement>} options.children - Child elements to append
 * @returns {HTMLElement} Created element
 */
export const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);
  
  if (options.className) {
    element.className = options.className;
  }
  
  if (options.innerHTML) {
    element.innerHTML = options.innerHTML;
  }
  
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  
  if (options.children) {
    options.children.forEach(child => {
      element.appendChild(child);
    });
  }
  
  return element;
};

/**
 * Removes all child nodes from an element
 * @param {HTMLElement} element - Element to clear
 */
export const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

/**
 * Safely queries for an element with error handling
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element to search within
 * @returns {HTMLElement|null} Found element or null
 */
export const safeQuerySelector = (selector, parent = document) => {
  try {
    return parent.querySelector(selector);
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return null;
  }
};

/**
 * Safely queries for multiple elements with error handling
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element to search within
 * @returns {NodeList} Found elements
 */
export const safeQuerySelectorAll = (selector, parent = document) => {
  try {
    return parent.querySelectorAll(selector);
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return [];
  }
};

/**
 * Adds event listener with automatic cleanup tracking
 * @param {HTMLElement} element - Element to attach listener to
 * @param {string} event - Event type
 * @param {Function} handler - Event handler function
 * @param {Object} options - Event listener options
 * @returns {Function} Cleanup function to remove the listener
 */
export const addEventListenerWithCleanup = (element, event, handler, options = {}) => {
  element.addEventListener(event, handler, options);
  
  return () => {
    element.removeEventListener(event, handler, options);
  };
};

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
