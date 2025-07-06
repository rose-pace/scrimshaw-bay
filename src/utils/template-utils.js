/**
 * HTML Template Utility for working with <template> elements and data slots
 */

/**
 * Clone a template and populate it with data
 * @param {string} templateId - ID of the template element
 * @param {Object} data - Data to populate the template with
 * @param {Object} options - Additional options
 * @returns {DocumentFragment|Element} Cloned and populated template
 */
export function cloneTemplate(templateId, data = {}, options = {}) {
  const template = document.getElementById(templateId);
  if (!template) {
    throw new Error(`Template with id "${templateId}" not found`);
  }

  const clone = template.content.cloneNode(true);
  
  // Find all elements with data-slot attributes
  const slotElements = clone.querySelectorAll('[data-slot]');
  
  slotElements.forEach(element => {
    const slotName = element.getAttribute('data-slot');
    const value = data[slotName];
    
    if (value !== undefined && value !== null) {      // Check if we should set an attribute instead of content
      const attrName = element.getAttribute('data-slot-attr');
      if (attrName) {
        // For attributes like title, data-*, etc.
        if (attrName === 'title' && slotName === 'population') {
          element.setAttribute('title', `Population: ${value}`);
        } else {
          element.setAttribute(attrName, value);
        }
      }      // Set the text content or innerHTML
      if (typeof value === 'string' || typeof value === 'number') {
        // Check if this slot expects HTML content
        if (slotName === 'secretsList' || slotName === 'motivationsList' || slotName === 'abilitiesList' ||
            slotName === 'outcomesList' || slotName === 'hooksList' || slotName === 'ritualList' || 
            slotName === 'cluesList' || slotName === 'npcLinks' || slotName === 'locationLinks' || 
            slotName === 'threatLinks') {
          element.innerHTML = value;
        } else {
          element.textContent = value;
        }
      } else if (value instanceof Element || value instanceof DocumentFragment) {
        element.innerHTML = '';
        element.appendChild(value);
      }// Handle special cases for showing/hiding elements
      if (slotName === 'detailIndicator' && value) {
        element.style.display = '';
      } else if (slotName === 'detailButton' && value) {
        element.style.display = '';
        element.setAttribute('data-location', data.locationId || '');
      } else if (slotName === 'npcsContainer' && value && value.length > 0) {
        element.style.display = '';
      } else if (slotName === 'stats' && value) {
        element.style.display = '';
      } else if (slotName === 'secrets' && value) {
        element.style.display = '';
      } else if (slotName === 'motivations' && value) {
        element.style.display = '';
      } else if (slotName === 'abilities' && value) {
        element.style.display = '';
      } else if (slotName === 'trigger' && value) {
        element.style.display = '';
      } else if (slotName === 'details' && value) {
        element.style.display = '';
      } else if (slotName === 'outcomes' && value) {
        element.style.display = '';
      } else if (slotName === 'hooks' && value) {
        element.style.display = '';
      } else if (slotName === 'ritual' && value) {
        element.style.display = '';
      } else if (slotName === 'creature' && value) {
        element.style.display = '';
      } else if (slotName === 'creatureMechanics' && value) {
        element.style.display = '';
      } else if (slotName === 'clues' && value) {
        element.style.display = '';
      } else if (slotName === 'network' && value) {
        element.style.display = '';
      } else if (slotName === 'relatedNpcs' && value) {
        element.style.display = '';
      } else if (slotName === 'relatedLocations' && value) {
        element.style.display = '';
      } else if (slotName === 'relatedThreats' && value) {
        element.style.display = '';
      } else if (slotName === 'danger' && value) {
        element.style.display = '';
      } else if (slotName === 'frequency' && value) {
        element.style.display = '';
      }
    }
  });
  
  // Handle data attributes on the root element
  if (options.dataAttributes) {
    const rootElement = clone.firstElementChild;
    if (rootElement) {
      Object.entries(options.dataAttributes).forEach(([key, value]) => {
        rootElement.setAttribute(`data-${key}`, value);
      });
    }
  }
  
  return options.returnElement ? clone.firstElementChild : clone;
}

/**
 * Create a settlement card using template
 * @param {Object} settlement - Settlement data
 * @param {string} settlementKey - Settlement key
 * @returns {Element} Settlement card element
 */
export function createSettlementCard(settlement, settlementKey) {
  const cardFragment = cloneTemplate('settlement-card-template', {
    name: settlement.name,
    type: settlement.type,
    description: truncateDescription(settlement.description, 100),
    population: settlement.population
  }, {
    dataAttributes: {
      settlement: settlementKey
    },
    returnElement: true
  });
  
  return cardFragment;
}

/**
 * Create settlement detail header using template
 * @param {Object} settlement - Settlement data
 * @returns {DocumentFragment} Header fragment
 */
export function createSettlementDetailHeader(settlement) {
  return cloneTemplate('settlement-detail-header-template', {
    name: settlement.name,
    type: settlement.type,
    population: settlement.population
  });
}

/**
 * Create location item using template
 * @param {Object} location - Location data
 * @returns {Element} Location item element
 */
export function createLocationItem(location) {
  const npcsContainer = document.createElement('div');
  
  if (location.npcs && location.npcs.length > 0) {
    location.npcs.forEach(npcKey => {
      const npcLink = cloneTemplate('npc-mini-link-template', {
        name: getNpcName(npcKey) // You'll need to implement this helper
      }, { returnElement: true });
      npcLink.setAttribute('data-npc', npcKey);
      npcsContainer.appendChild(npcLink);
    });
  }
  
  return cloneTemplate('location-item-template', {
    name: location.name,
    shortDesc: location.shortDesc,
    detailIndicator: location.hasDetails,
    detailButton: location.hasDetails,
    locationId: location.id,
    npcsContainer: location.npcs && location.npcs.length > 0,
    npcs: npcsContainer
  }, { returnElement: true });
}

/**
 * Create NPC link using template
 * @param {Object} npc - NPC data
 * @param {string} npcKey - NPC key
 * @returns {Element} NPC link element
 */
export function createNpcLink(npc, npcKey) {
  const npcLink = cloneTemplate('npc-link-template', {
    name: npc.name,
    role: npc.role
  }, { returnElement: true });
  
  npcLink.setAttribute('data-npc', npcKey);
  return npcLink;
}

/**
 * Create an NPC card using template
 * @param {Object} npc - NPC data
 * @param {string} npcKey - NPC key
 * @returns {Element} NPC card element
 */
export function createNpcCard(npc, npcKey) {
  const statsContent = npc.stats ? Object.entries(npc.stats)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ') : '';

  const cardFragment = cloneTemplate('npc-card-template', {
    name: npc.name,
    location: npc.location || '',
    role: npc.role,
    description: truncateDescription(npc.description, 120),
    stats: npc.stats ? true : false,
    statsContent: statsContent,
    secrets: npc.secrets && npc.secrets.length > 0,
    secretsList: npc.secrets ? npc.secrets.map(secret => `<li>${secret}</li>`).join('') : '',
    motivations: npc.motivations && npc.motivations.length > 0,
    motivationsList: npc.motivations ? npc.motivations.map(motivation => `<li>${motivation}</li>`).join('') : '',
    abilities: npc.abilities && npc.abilities.length > 0,
    abilitiesList: npc.abilities ? npc.abilities.map(ability => `<li>${ability}</li>`).join('') : ''
  }, {
    dataAttributes: {
      npc: npcKey
    },
    returnElement: true
  });
  
  return cardFragment;
}

/**
 * Create a threat card using template
 * @param {Object} threat - Threat data
 * @param {string} threatKey - Threat key
 * @returns {Element} Threat card element
 */
export function createThreatCard(threat, threatKey) {
  const cardFragment = cloneTemplate('threat-card-template', {
    name: threat.name,
    type: threat.type,
    description: truncateDescription(threat.description, 100),
    danger: threat.dangerLevel ? true : false,
    dangerLevel: threat.dangerLevel || 'Unknown'
  }, {
    dataAttributes: {
      threat: threatKey
    },
    returnElement: true
  });
  
  return cardFragment;
}

/**
 * Create an event card using template
 * @param {Object} event - Event data
 * @param {string} eventKey - Event key
 * @returns {Element} Event card element
 */
export function createEventCard(event, eventKey) {
  // Prepare outcomes list
  const outcomesList = event.outcomes ? 
    event.outcomes.map(outcome => `<li>${outcome}</li>`).join('') : '';
    
  // Prepare hooks list
  const hooksList = event.hooks ? 
    event.hooks.map(hook => `<li>${hook}</li>`).join('') : '';
    
  // Prepare ritual requirements list
  const ritualList = event.ritual_requirements ? 
    event.ritual_requirements.map(req => `<li>${req}</li>`).join('') : '';
    
  // Prepare clues list (handling different clue structures)
  let cluesList = '';
  let cluesTitle = 'Clues:';
  if (event.winter_court_clues) {
    cluesTitle = 'Winter Court Clues:';
    const clues = event.winter_court_clues;
    cluesList = [
      `<li><strong>Visual:</strong> ${clues.observation}</li>`,
      `<li><strong>Magic:</strong> ${clues.arcana_check}</li>`,
      `<li><strong>Implications:</strong> ${clues.implications}</li>`
    ].join('');
  }
    // Prepare network links
  const npcLinks = event.relatedNpcs ? 
    event.relatedNpcs.map(npcKey => 
      `<button class="network-link npc-link" data-npc="${npcKey}">${getNpcName(npcKey)}</button>`
    ).join('') : '';
    
  const locationLinks = event.relatedLocations ? 
    event.relatedLocations.map(locKey => 
      `<button class="network-link location-link" data-location="${locKey}">${getLocationName(locKey)}</button>`
    ).join('') : '';
    
  const threatLinks = event.relatedThreats ? 
    event.relatedThreats.map(threatKey => 
      `<button class="network-link threat-link" data-threat="${threatKey}">${getThreatName(threatKey)}</button>`
    ).join('') : '';

  const cardFragment = cloneTemplate('event-card-template', {
    name: event.name,
    description: event.description,
    trigger: event.trigger ? true : false,
    triggerText: event.trigger || '',
    details: (event.outcomes || event.hooks || event.ritual_requirements || event.gulpgrin_details || event.winter_court_clues) ? true : false,
    outcomes: event.outcomes && event.outcomes.length > 0,
    outcomesList: outcomesList,
    hooks: event.hooks && event.hooks.length > 0,
    hooksList: hooksList,
    ritual: event.ritual_requirements && event.ritual_requirements.length > 0,
    ritualList: ritualList,
    creature: event.gulpgrin_details ? true : false,
    creatureName: event.gulpgrin_details ? event.gulpgrin_details.name + ':' : '',
    creatureDescription: event.gulpgrin_details ? event.gulpgrin_details.description : '',
    creatureMechanics: event.gulpgrin_details && event.gulpgrin_details.mechanics ? true : false,
    mechanicsText: event.gulpgrin_details ? event.gulpgrin_details.mechanics : '',
    clues: event.winter_court_clues ? true : false,
    cluesTitle: cluesTitle,
    cluesList: cluesList,
    network: (event.relatedNpcs || event.relatedLocations || event.relatedThreats) ? true : false,
    relatedNpcs: event.relatedNpcs && event.relatedNpcs.length > 0,
    npcLinks: npcLinks,
    relatedLocations: event.relatedLocations && event.relatedLocations.length > 0,
    locationLinks: locationLinks,
    relatedThreats: event.relatedThreats && event.relatedThreats.length > 0,
    threatLinks: threatLinks
  }, {
    dataAttributes: {
      event: eventKey
    },
    returnElement: true
  });
  
  return cardFragment;
}

/**
 * Helper function to truncate description text
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
function truncateDescription(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Helper function to get NPC name by accessing the data service
 * @param {string} npcKey - NPC key
 * @returns {string} NPC name
 */
function getNpcName(npcKey) {
  // Import the data service dynamically to avoid circular imports
  if (typeof window !== 'undefined' && window.dataService) {
    const npc = window.dataService.getNpc(npcKey);
    return npc ? npc.name : npcKey;
  }
  return npcKey; // Fallback
}

/**
 * Helper function to get location name by accessing the data service
 * @param {string} locationKey - Location key
 * @returns {string} Location name
 */
function getLocationName(locationKey) {
  if (typeof window !== 'undefined' && window.dataService) {
    const location = window.dataService.getLocation(locationKey);
    return location ? location.name : locationKey;
  }
  return locationKey; // Fallback
}

/**
 * Helper function to get threat name by accessing the data service
 * @param {string} threatKey - Threat key
 * @returns {string} Threat name
 */
function getThreatName(threatKey) {
  if (typeof window !== 'undefined' && window.dataService) {
    const threat = window.dataService.getThreat(threatKey);
    return threat ? threat.name : threatKey;
  }
  return threatKey; // Fallback
}
