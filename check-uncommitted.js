#!/usr/bin/env node
/**
 * Script to check for uncommitted changes in the repository
 * Exits with code 1 if there are uncommitted changes, 0 otherwise
 */

const { execSync } = require('child_process');

try {
  // Check for uncommitted changes (both staged and unstaged)
  try {
    execSync('git diff-index --quiet HEAD --', { stdio: 'pipe' });
  } catch (error) {
    console.error('Error: Uncommitted changes detected');
    console.error('Please commit or stash your changes before proceeding');
    const status = execSync('git status --short', { encoding: 'utf-8' });
    console.error(status);
    process.exit(1);
  }

  // Check for untracked files
  const untrackedFiles = execSync('git ls-files --others --exclude-standard', { encoding: 'utf-8' }).trim();
  if (untrackedFiles) {
    console.error('Error: Untracked files detected');
    console.error('Please commit or remove untracked files before proceeding');
    const status = execSync('git status --short', { encoding: 'utf-8' });
    console.error(status);
    process.exit(1);
  }

  console.log('No uncommitted changes detected');
  process.exit(0);
} catch (error) {
  console.error('Error checking for uncommitted changes:', error.message);
  process.exit(1);
}
