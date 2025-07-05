// Main Application Logic
class ScrimshawBayApp {
    constructor() {
        this.currentSection = 'overview';
        this.currentSettlement = 'millhaven';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupSettlementNavigation();
        this.renderNPCs();
        this.renderEvents();
        this.setupEventListeners();
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.showSection(section);
            });
        });
    }

    showLocationDetails(locationId) {
        const location = campaignData.locations[locationId];
        if (!location) return;

        // Helper function to create links
        const createLocationLinks = (items, type) => {
            if (!items || items.length === 0) return 'None';
            
            return items.map(key => {
                let displayName = key;
                let onClick = '';
                
                if (type === 'npc') {
                    const npc = campaignData.npcs[key];
                    displayName = npc ? npc.name : key;
                    onClick = `onclick="app.showNpcDetails('${key}')"`;
                } else if (type === 'threat') {
                    const threat = campaignData.threats[key];
                    displayName = threat ? threat.name : key;
                    onClick = `onclick="app.showThreatDetails('${key}')"`;
                } else if (type === 'event') {
                    const event = campaignData.events[key];
                    displayName = event ? event.name : key;
                }
                
                return `<button class="network-link ${type}-link" ${onClick}>${displayName}</button>`;
            }).join('');
        };

        // Create modal for location details
        const modal = document.createElement('div');
        modal.className = 'location-modal';
        modal.innerHTML = `
            <div class="modal-content location-detail-modal">
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

        document.body.appendChild(modal);

        // Store reference for network links
        window.app = this;

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    setupSettlementNavigation() {
        // Settlement cards in overview
        const settlementCards = document.querySelectorAll('.settlement-card');
        settlementCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const settlement = e.currentTarget.dataset.settlement;
                this.showSection('settlements');
                this.showSettlement(settlement);
            });
        });

        // Settlement buttons in settlements section
        const settlementBtns = document.querySelectorAll('.settlement-btn');
        settlementBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const settlement = e.currentTarget.dataset.settlement;
                this.showSettlement(settlement);
            });
        });
    }

    setupEventListeners() {
        // Threat detail buttons
        const detailBtns = document.querySelectorAll('.details-btn');
        detailBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const threat = e.target.dataset.threat;
                this.showThreatDetails(threat);
            });
        });
    }

    addNpcLinkListeners() {
        // NPC links from locations and key NPCs
        const npcLinks = document.querySelectorAll('.npc-link, .npc-mini-link');
        npcLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const npcKey = e.currentTarget.dataset.npc;
                this.showNpcDetails(npcKey);
            });
        });
        
        // Location detail links
        const locationLinks = document.querySelectorAll('.location-detail-btn');
        locationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const locationId = e.currentTarget.dataset.location;
                this.showLocationDetails(locationId);
            });
        });
    }

    showSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;

        // Render content based on section
        if (sectionName === 'settlements') {
            this.renderSettlementDetails(this.currentSettlement);
        }
    }

    showSettlement(settlementName) {
        // Update settlement navigation
        document.querySelectorAll('.settlement-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const targetButton = document.querySelector(`.settlement-btn[data-settlement="${settlementName}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }

        this.currentSettlement = settlementName;
        this.renderSettlementDetails(settlementName);
    }

    renderSettlementDetails(settlementName) {
        const settlement = campaignData.settlements[settlementName];
        const container = document.getElementById('settlement-details');

        if (!settlement) return;

        // Generate key NPCs list with links
        const keyNpcsHtml = settlement.keyNpcs ? settlement.keyNpcs.map(npcKey => {
            const npc = campaignData.npcs[npcKey];
            return npc ? `
                <div class="key-npc-item">
                    <button class="npc-link" data-npc="${npcKey}">
                        <strong>${npc.name}</strong>
                        <span class="npc-role-small">${npc.role}</span>
                    </button>
                </div>
            ` : '';
        }).join('') : '';

        container.innerHTML = `
            <div class="settlement-detail">
                <div class="settlement-header">
                    <h3>${settlement.name}</h3>
                    <div class="settlement-meta">
                        <span class="settlement-type">${settlement.type}</span>
                        <span class="settlement-population">${settlement.population}</span>
                    </div>
                </div>
                
                <div class="settlement-description">
                    <p>${settlement.description}</p>
                </div>

                <div class="settlement-content">
                    <div class="info-card">
                        <h4>Notable Locations</h4>
                        <div class="locations-list">
                            ${settlement.notableLocations.map(location => {
                                const npcLinks = location.npcs.map(npcKey => {
                                    const npc = campaignData.npcs[npcKey];
                                    return npc ? `<button class="npc-mini-link" data-npc="${npcKey}">${npc.name}</button>` : '';
                                }).join('');
                                
                                const locationButton = location.hasDetails 
                                    ? `<button class="location-detail-btn" data-location="${location.id}">${location.name}</button>`
                                    : `<span class="location-name">${location.name}</span>`;
                                
                                return `
                                    <div class="location-item">
                                        <div class="location-header">
                                            ${locationButton}
                                            ${location.hasDetails ? '<span class="detail-indicator">📄</span>' : ''}
                                        </div>
                                        <p class="location-desc">${location.shortDesc}</p>
                                        ${npcLinks ? `<div class="location-npcs">${npcLinks}</div>` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    ${settlement.keyNpcs && settlement.keyNpcs.length > 0 ? `
                        <div class="info-card">
                            <h4>Key NPCs</h4>
                            <div class="key-npcs-list">
                                ${keyNpcsHtml}
                            </div>
                        </div>
                    ` : ''}

                    <div class="info-card">
                        <h4>Current Inhabitants</h4>
                        <ul>
                            ${settlement.inhabitants.map(inhabitant => `<li>${inhabitant}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="info-card dark-secrets">
                        <h4>Dark Secrets</h4>
                        <ul>
                            ${settlement.darkSecrets.map(secret => `<li>${secret}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners for NPC links
        this.addNpcLinkListeners();
    }

    renderNPCs() {
        const container = document.getElementById('npc-list');
        const npcs = campaignData.npcs;

        container.innerHTML = Object.keys(npcs).map(key => {
            const npc = npcs[key];
            return `
                <div class="npc-card">
                    <div class="npc-header">
                        <h3 class="npc-name">${npc.name}</h3>
                        <span class="npc-location">${npc.location}</span>
                    </div>
                    <div class="npc-role">${npc.role}</div>
                    <div class="npc-description">${npc.description}</div>
                    
                    ${npc.secrets ? `
                        <div class="npc-secrets">
                            <h4>Secrets:</h4>
                            <ul>
                                ${npc.secrets.map(secret => `<li>${secret}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${npc.motivations ? `
                        <div class="npc-motivations">
                            <h4>Motivations:</h4>
                            <ul>
                                ${npc.motivations.map(motivation => `<li>${motivation}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }

    renderEvents() {
        const container = document.getElementById('events-list');
        const events = campaignData.events;

        // Helper function to create event links
        const createEventLinks = (items, type) => {
            if (!items || items.length === 0) return '';
            
            return items.map(key => {
                let displayName = key;
                let onClick = '';
                
                if (type === 'npc') {
                    const npc = campaignData.npcs[key];
                    displayName = npc ? npc.name : key;
                    onClick = `onclick="app.showNpcDetails('${key}')"`;
                } else if (type === 'location') {
                    // Find location in settlements
                    for (let settlement of Object.values(campaignData.settlements)) {
                        const location = settlement.notableLocations.find(loc => loc.id === key);
                        if (location) {
                            displayName = location.name;
                            break;
                        }
                    }
                } else if (type === 'threat') {
                    const threat = campaignData.threats[key];
                    displayName = threat ? threat.name : key;
                    onClick = `onclick="app.showThreatDetails('${key}')"`;
                }
                
                return `<button class="network-link ${type}-link" ${onClick}>${displayName}</button>`;
            }).join('');
        };

        container.innerHTML = Object.keys(events).map(key => {
            const event = events[key];
            return `
                <div class="event-card info-card">
                    <h3>${event.name}</h3>
                    <p><strong>Description:</strong> ${event.description}</p>
                    <p><strong>Trigger:</strong> ${event.trigger}</p>
                    
                    <div class="event-details">
                        <div class="event-outcomes">
                            <h4>Possible Outcomes:</h4>
                            <ul>
                                ${event.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="event-hooks">
                            <h4>Adventure Hooks:</h4>
                            <ul>
                                ${event.hooks.map(hook => `<li>${hook}</li>`).join('')}
                            </ul>
                        </div>
                        
                        ${event.encounter_table ? `
                            <div class="event-encounters">
                                <h4>Encounter Table:</h4>
                                <ul>
                                    ${event.encounter_table.map(encounter => `<li>${encounter}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${event.ritual_requirements ? `
                            <div class="event-ritual">
                                <h4>Ritual Requirements:</h4>
                                <ol>
                                    ${event.ritual_requirements.map(req => `<li>${req}</li>`).join('')}
                                </ol>
                            </div>
                        ` : ''}
                        
                        ${event.gulpgrin_details ? `
                            <div class="event-creature">
                                <h4>${event.gulpgrin_details.name}:</h4>
                                <p>${event.gulpgrin_details.description}</p>
                                <p><strong>Mechanics:</strong> ${event.gulpgrin_details.mechanics}</p>
                            </div>
                        ` : ''}
                        
                        ${event.winter_court_clues ? `
                            <div class="event-clues">
                                <h4>Winter Court Clues:</h4>
                                <ul>
                                    <li><strong>Visual:</strong> ${event.winter_court_clues.observation}</li>
                                    <li><strong>Magic:</strong> ${event.winter_court_clues.arcana_check}</li>
                                    <li><strong>Implications:</strong> ${event.winter_court_clues.implications}</li>
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="event-network">
                        ${event.relatedNpcs ? `
                            <div class="network-section">
                                <h4>🧙 Related NPCs:</h4>
                                <div class="network-links">
                                    ${createEventLinks(event.relatedNpcs, 'npc')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${event.relatedLocations ? `
                            <div class="network-section">
                                <h4>📍 Related Locations:</h4>
                                <div class="network-links">
                                    ${createEventLinks(event.relatedLocations, 'location')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${event.relatedThreats ? `
                            <div class="network-section">
                                <h4>⚠️ Related Threats:</h4>
                                <div class="network-links">
                                    ${createEventLinks(event.relatedThreats, 'threat')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');

        // Store reference for network links
        window.app = this;
    }

    showThreatDetails(threatName) {
        const threat = campaignData.threats[threatName];
        if (!threat) return;

        // Helper function to create clickable links
        const createLinks = (items, type) => {
            if (!items || items.length === 0) return 'None';
            
            return items.map(key => {
                let displayName = key;
                let onClick = '';
                
                if (type === 'npc') {
                    const npc = campaignData.npcs[key];
                    displayName = npc ? npc.name : key;
                    onClick = `onclick="app.showNpcDetails('${key}')"`;
                } else if (type === 'location') {
                    // Find location in settlements
                    for (let settlement of Object.values(campaignData.settlements)) {
                        const location = settlement.notableLocations.find(loc => loc.id === key);
                        if (location) {
                            displayName = location.name;
                            break;
                        }
                    }
                } else if (type === 'settlement') {
                    const settlement = campaignData.settlements[key];
                    displayName = settlement ? settlement.name : key;
                } else if (type === 'event') {
                    const event = campaignData.events[key];
                    displayName = event ? event.name : key;
                } else if (type === 'threat') {
                    const relatedThreat = campaignData.threats[key];
                    displayName = relatedThreat ? relatedThreat.name : key;
                    onClick = `onclick="app.showThreatDetails('${key}')"`;
                }
                
                return `<button class="network-link ${type}-link" ${onClick}>${displayName}</button>`;
            }).join('');
        };

        // Create modal or detailed view
        const modal = document.createElement('div');
        modal.className = 'threat-modal';
        modal.innerHTML = `
            <div class="modal-content threat-network-modal">
                <div class="modal-header">
                    <div class="threat-header-info">
                        <h2>${threat.name}</h2>
                        <span class="corruption-level">${threat.corruptionLevel || 'Unknown'}</span>
                    </div>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="threat-type">${threat.type}</p>
                    <p class="threat-description">${threat.description}</p>
                    
                    ${threat.abilities ? `
                        <div class="threat-section">
                            <h4>Abilities:</h4>
                            <ul>
                                ${threat.abilities.map(ability => `<li>${ability}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${threat.effects || threat.influence ? `
                        <div class="threat-section">
                            <h4>${threat.influence ? 'Regional Influence:' : 'Effects:'}:</h4>
                            <ul>
                                ${(threat.influence || threat.effects).map(effect => `<li>${effect}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${threat.creatures ? `
                        <div class="threat-section">
                            <h4>Creature Types:</h4>
                            <div class="creature-list">
                                ${threat.creatures.map(creature => `
                                    <div class="creature-entry">
                                        <h5>${creature.name} (CR ${creature.cr})</h5>
                                        <p>${creature.description}</p>
                                        <div class="creature-abilities">
                                            <strong>Key Abilities:</strong> ${creature.abilities.join(', ')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${threat.encounter_notes ? `
                        <div class="threat-section">
                            <h4>Encounter Notes:</h4>
                            <ul>
                                ${threat.encounter_notes.map(note => `<li>${note}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${threat.process ? `
                        <div class="threat-section">
                            <h4>Process:</h4>
                            <ul>
                                ${threat.process.map(step => `<li>${step}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${threat.stages ? `
                        <div class="threat-section">
                            <h4>Transformation Stages:</h4>
                            <ul>
                                ${threat.stages.map(stage => `<li>${stage}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <div class="threat-network">
                        <h3>Threat Network</h3>
                        
                        ${threat.affectedNpcs ? `
                            <div class="network-section">
                                <h4>🧙 Affected NPCs:</h4>
                                <div class="network-links">
                                    ${createLinks(threat.affectedNpcs, 'npc')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${threat.affectedLocations ? `
                            <div class="network-section">
                                <h4>📍 Affected Locations:</h4>
                                <div class="network-links">
                                    ${createLinks(threat.affectedLocations, 'location')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${threat.affectedSettlements ? `
                            <div class="network-section">
                                <h4>🏘️ Affected Settlements:</h4>
                                <div class="network-links">
                                    ${createLinks(threat.affectedSettlements, 'settlement')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${threat.relatedEvents ? `
                            <div class="network-section">
                                <h4>📅 Related Events:</h4>
                                <div class="network-links">
                                    ${createLinks(threat.relatedEvents, 'event')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${threat.relatedThreats ? `
                            <div class="network-section">
                                <h4>⚠️ Related Threats:</h4>
                                <div class="network-links">
                                    ${createLinks(threat.relatedThreats, 'threat')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${threat.timeline ? `
                        <div class="threat-section">
                            <h4>Timeline:</h4>
                            <p>${threat.timeline}</p>
                        </div>
                    ` : ''}
                    
                    ${threat.stats ? `
                        <div class="threat-section">
                            <h4>Game Stats:</h4>
                            <p>${threat.stats}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Store reference for network links
        window.app = this;

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    showNpcDetails(npcKey) {
        const npc = campaignData.npcs[npcKey];
        if (!npc) return;

        // Helper function to create clickable links
        const createNpcLinks = (items, type) => {
            if (!items || items.length === 0) return 'None';
            
            return items.map(key => {
                let displayName = key;
                let onClick = '';
                
                if (type === 'location') {
                    // Find location in settlements
                    for (let settlement of Object.values(campaignData.settlements)) {
                        const location = settlement.notableLocations.find(loc => loc.id === key);
                        if (location) {
                            displayName = location.name;
                            break;
                        }
                    }
                } else if (type === 'event') {
                    const event = campaignData.events[key];
                    displayName = event ? event.name : key;
                } else if (type === 'threat') {
                    const threat = campaignData.threats[key];
                    displayName = threat ? threat.name : key;
                    onClick = `onclick="app.showThreatDetails('${key}')"`;
                }
                
                return `<button class="network-link ${type}-link" ${onClick}>${displayName}</button>`;
            }).join('');
        };

        // Create modal for NPC details
        const modal = document.createElement('div');
        modal.className = 'npc-modal';
        modal.innerHTML = `
            <div class="modal-content npc-network-modal">
                <div class="modal-header">
                    <div class="npc-header-info">
                        <h2>${npc.name}</h2>
                        <span class="npc-location-tag">${npc.location}</span>
                    </div>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="npc-role">${npc.role}</p>
                    <p class="npc-description">${npc.description}</p>
                    
                    ${npc.secrets ? `
                        <div class="npc-section">
                            <h4>Secrets:</h4>
                            <ul>
                                ${npc.secrets.map(secret => `<li>${secret}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${npc.abilities ? `
                        <div class="npc-section">
                            <h4>Abilities:</h4>
                            <ul>
                                ${npc.abilities.map(ability => `<li>${ability}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${npc.motivations ? `
                        <div class="npc-section">
                            <h4>Motivations:</h4>
                            <ul>
                                ${npc.motivations.map(motivation => `<li>${motivation}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${npc.services ? `
                        <div class="npc-section npc-services">
                            <h4>Services Offered:</h4>
                            <ul>
                                ${npc.services.map(service => `<li>${service}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${npc.creature_knowledge ? `
                        <div class="npc-section npc-knowledge">
                            <h4>Creature Knowledge:</h4>
                            <div class="knowledge-list">
                                ${Object.entries(npc.creature_knowledge).map(([creature, knowledge]) => `
                                    <div class="knowledge-entry">
                                        <strong>${creature}:</strong> ${knowledge}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="npc-network">
                        <h3>Connections</h3>
                        
                        ${npc.relatedThreats ? `
                            <div class="network-section">
                                <h4>⚠️ Involved in Threats:</h4>
                                <div class="network-links">
                                    ${createNpcLinks(npc.relatedThreats, 'threat')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${npc.relatedLocations ? `
                            <div class="network-section">
                                <h4>📍 Associated Locations:</h4>
                                <div class="network-links">
                                    ${createNpcLinks(npc.relatedLocations, 'location')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${npc.relatedEvents ? `
                            <div class="network-section">
                                <h4>📅 Involved in Events:</h4>
                                <div class="network-links">
                                    ${createNpcLinks(npc.relatedEvents, 'event')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Store reference for network links
        window.app = this;

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrimshawBayApp();
});