// Test script to check data availability
import { DataService } from './src/services/data-service.js';

const dataService = new DataService();

console.log('=== DATA SERVICE TEST ===');
console.log('Data loaded:', dataService.data ? 'Yes' : 'No');
console.log('Settlements available:', dataService.data?.settlements ? Object.keys(dataService.data.settlements) : 'None');

// Test specific settlement
const millhaven = dataService.getSettlement('millhaven');
console.log('Millhaven settlement:', millhaven ? millhaven.name : 'Not found');

// Test all settlements
const allSettlements = dataService.getAllSettlements();
console.log('All settlements count:', allSettlements.length);
allSettlements.forEach(settlement => {
  console.log(`- ${settlement.key}: ${settlement.name}`);
});
