/**
 * Schema Test Runner
 * Executes schema validation tests and generates reports
 */

import { runSchemaTests } from './schema-validation.test.js';

/**
 * Run schema tests and generate detailed report
 */
function main() {
  try {
    console.log('🔍 Starting Campaign Data Schema Validation...\n');
    
    const results = runSchemaTests();
    
    // Generate summary report
    console.log('\n' + '='.repeat(60));
    console.log('🏁 FINAL SUMMARY');
    console.log('='.repeat(60));
    
    const overallPassRate = ((results.overall.totalPassed / results.overall.totalTests) * 100).toFixed(1);
    
    console.log(`📊 Total Tests: ${results.overall.totalTests}`);
    console.log(`✅ Passed: ${results.overall.totalPassed}`);
    console.log(`❌ Failed: ${results.overall.totalFailed}`);
    console.log(`📈 Overall Pass Rate: ${overallPassRate}%`);
    
    if (results.overall.totalFailed === 0) {
      console.log('\n🎉 All tests passed! The campaign data is fully compliant with schemas.');
    } else {
      console.log(`\n⚠️  ${results.overall.totalFailed} issues found that need attention.`);
      
      // Show breakdown by test type
      console.log('\n📋 Breakdown by Test Type:');
      console.log(`   Schema Validation: ${results.schema.passed}/${results.schema.total} passed`);
      console.log(`   Data Integrity: ${results.integrity.passed}/${results.integrity.total} passed`);
    }
    
    console.log('\n' + '='.repeat(60));
    
    // Return exit code based on results
    process.exit(results.overall.totalFailed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error('💥 Error running schema tests:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (process.argv[1].endsWith('run-schema-tests.js')) {
  main();
}
