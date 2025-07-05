# NPC Conditional Display Fix - COMPLETE ✅

## Issue Identified
The NPC card template sections (secrets, motivations, abilities) were set to `display: none` by default, which is correct behavior. However, the JavaScript code responsible for showing these sections when data exists was incomplete.

## Root Cause
The `cloneTemplate` function in `src/utils/template-utils.js` had conditional display logic for some sections (like `stats`, `danger`, `frequency`) but was **missing** the logic for the NPC-specific sections:
- `secrets` - should show when NPC has secrets data
- `motivations` - should show when NPC has motivations data  
- `abilities` - should show when NPC has abilities data

## The Fix
**Added the missing conditional display logic for NPC sections:**

### Before (Missing Logic):
```javascript
// Handle special cases for showing/hiding elements
if (slotName === 'detailIndicator' && value) {
  element.style.display = '';
} else if (slotName === 'detailButton' && value) {
  element.style.display = '';
  element.setAttribute('data-location', data.locationId || '');
} else if (slotName === 'npcsContainer' && value && value.length > 0) {
  element.style.display = '';
} else if (slotName === 'stats' && value) {
  element.style.display = '';
} else if (slotName === 'danger' && value) {
  element.style.display = '';
} else if (slotName === 'frequency' && value) {
  element.style.display = '';
}
```

### After (Complete Logic):
```javascript
// Handle special cases for showing/hiding elements
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
} else if (slotName === 'danger' && value) {
  element.style.display = '';
} else if (slotName === 'frequency' && value) {
  element.style.display = '';
}
```

## How It Works

### Data Processing in `createNpcCard`:
```javascript
const cardFragment = cloneTemplate('npc-card-template', {
  // ... other data
  secrets: npc.secrets && npc.secrets.length > 0,           // boolean
  motivations: npc.motivations && npc.motivations.length > 0, // boolean
  abilities: npc.abilities && npc.abilities.length > 0,       // boolean
  // ... content lists
}, options);
```

### Template Conditional Display:
1. **Default State**: All sections start with `style="display: none;"`
2. **Conditional Show**: If the boolean value is `true`, the section gets `style="display: '';"`
3. **Content Population**: The list content is populated with the actual data

### Expected Behavior:
- ✅ NPC with secrets → Shows "Secrets" section with bullet points
- ✅ NPC with motivations → Shows "Motivations" section with bullet points  
- ✅ NPC with abilities → Shows "Abilities" section with bullet points
- ✅ NPC without specific data → Hides those sections completely
- ✅ Each NPC shows only the sections relevant to their data

## Verification
- ✅ Template utility now handles all NPC conditional sections
- ✅ NPCs display only sections with actual data
- ✅ No empty sections are shown
- ✅ All NPC information is properly displayed
- ✅ Maintains clean, data-driven presentation

## Files Modified
- `src/utils/template-utils.js` - Added conditional display logic for `secrets`, `motivations`, and `abilities`

## Result
**NPC cards now properly show/hide sections based on available data!** Each NPC displays only the sections (secrets, motivations, abilities) that have actual content, providing a clean, organized presentation of character information without empty sections.
