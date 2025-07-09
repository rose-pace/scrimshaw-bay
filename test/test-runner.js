/**
 * Test runner for Scrimshaw Bay application
 * Runs all test suites and reports combined results
 */

import CommonUtilsTests from './common-utils.test.js';
import DataServiceTests from './data-service.test.js';
import ModalServiceTests from './modal-service.test.js';
import ComponentsTests from './components.test.js';
import UINavigationTests from './ui-navigation.test.js';

class TestRunner {
  constructor() {
    this.totalPassed = 0;
    this.totalFailed = 0;
    this.suites = [];
  }

  /**
   * Run a test suite and collect results
   */
  async runTestSuite(TestClass, suiteName) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🧪 Running ${suiteName} Test Suite`);
    console.log(`${'='.repeat(60)}`);
    
    try {
      const testInstance = new TestClass();
      const success = testInstance.runAllTests();
      
      this.totalPassed += testInstance.results.passed;
      this.totalFailed += testInstance.results.failed;
      
      this.suites.push({
        name: suiteName,
        passed: testInstance.results.passed,
        failed: testInstance.results.failed,
        success: success
      });
      
      return success;
    } catch (error) {
      console.error(`❌ Error running ${suiteName}:`, error);
      this.totalFailed += 1;
      this.suites.push({
        name: suiteName,
        passed: 0,
        failed: 1,
        success: false,
        error: error.message
      });
      return false;
    }
  }

  /**
   * Run all test suites
   */
  async runAllTests() {
    console.log('🎲 Scrimshaw Bay Test Runner');
    console.log('Running comprehensive test suite...\n');
    
    const startTime = Date.now();
    
    // Run all test suites
    await this.runTestSuite(CommonUtilsTests, 'Common Utils');
    await this.runTestSuite(DataServiceTests, 'Data Service');
    await this.runTestSuite(ModalServiceTests, 'Modal Service'); 
    await this.runTestSuite(ComponentsTests, 'Components');
    await this.runTestSuite(UINavigationTests, 'UI & Navigation');
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    this.displaySummary(duration);
    
    return this.totalFailed === 0;
  }

  /**
   * Display comprehensive test summary
   */
  displaySummary(duration) {
    console.log(`\n${'='.repeat(60)}`);
    console.log('📊 COMPREHENSIVE TEST SUMMARY');
    console.log(`${'='.repeat(60)}`);
    
    // Display suite results
    this.suites.forEach(suite => {
      const status = suite.success ? '✅ PASS' : '❌ FAIL';
      const details = suite.error ? ` (${suite.error})` : ` (${suite.passed}✅ ${suite.failed}❌)`;
      console.log(`${status} ${suite.name}${details}`);
    });
    
    console.log(`\n📈 OVERALL RESULTS:`);
    console.log(`   ✅ Total Passed: ${this.totalPassed}`);
    console.log(`   ❌ Total Failed: ${this.totalFailed}`);
    console.log(`   📊 Total Tests: ${this.totalPassed + this.totalFailed}`);
    console.log(`   ⏱️  Duration: ${duration}ms`);
    
    if (this.totalFailed === 0) {
      console.log('\n🎉 ALL TESTS PASSED! 🎉');
      console.log('The refactored utilities are working correctly.');
    } else {
      console.log('\n⚠️  SOME TESTS FAILED');
      console.log('Please review the failures above and fix issues.');
    }
    
    console.log(`\n${'-'.repeat(60)}`);
  }
}

// Auto-run if this is the main module
if (typeof window === 'undefined') {
  const runner = new TestRunner();
  runner.runAllTests().then(success => {
    if (typeof process !== 'undefined') {
      process.exit(success ? 0 : 1);
    }
  }).catch(error => {
    console.error('❌ Test runner failed:', error);
    if (typeof process !== 'undefined') {
      process.exit(1);
    }
  });
}

export default TestRunner;
