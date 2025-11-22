const assert = require('assert');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('check-uncommitted script', () => {
  const testFile = path.join(__dirname, '..', 'test-file-for-uncommitted-check.txt');
  const scriptPath = path.join(__dirname, '..', 'check-uncommitted.js');

  afterEach(() => {
    // Clean up any test files
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
    
    // Reset git state
    try {
      execSync('git checkout -- .', { stdio: 'ignore' });
    } catch (e) {
      // Ignore errors
    }
  });

  it('should fail when there are untracked files', (done) => {
    // Create a test file
    fs.writeFileSync(testFile, 'test content');

    try {
      execSync(`node ${scriptPath}`, { stdio: 'pipe' });
      done(new Error('Script should fail when there are untracked files'));
    } catch (error) {
      // Expected to fail
      assert(error.status === 1);
      done();
    }
  });

  it('should fail when there are modified files', (done) => {
    // Modify package.json
    const packagePath = path.join(__dirname, '..', 'package.json');
    const originalContent = fs.readFileSync(packagePath, 'utf-8');
    fs.appendFileSync(packagePath, '\n// test comment\n');

    try {
      execSync(`node ${scriptPath}`, { stdio: 'pipe' });
      done(new Error('Script should fail when there are modified files'));
    } catch (error) {
      // Expected to fail
      assert(error.status === 1);
      // Restore original content
      fs.writeFileSync(packagePath, originalContent);
      done();
    }
  });
});
