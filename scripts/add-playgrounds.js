#!/usr/bin/env node
// Script to add playground blocks to java-course.json and java-course-ta.json

const fs = require('fs');
const path = require('path');

const PLAYGROUNDS = [
  { lesson: 'method-overloading', subtype: 'method-overloading' },
  { lesson: 'scope',              subtype: 'scope' },
  { lesson: 'recursion',          subtype: 'recursion' },
  { lesson: 'modifiers',          subtype: 'modifiers' },
  { lesson: 'encapsulation',      subtype: 'encapsulation' },
  { lesson: 'inner-classes',      subtype: 'inner-class' },
  { lesson: 'abstraction',        subtype: 'abstraction' },
  { lesson: 'interface',          subtype: 'interface' },
  { lesson: 'enums',              subtype: 'enum' },
  { lesson: 'user-input',         subtype: 'user-input' },
  { lesson: 'date',               subtype: 'date' },
  { lesson: 'arraylist',          subtype: 'arraylist' },
  { lesson: 'linkedlist',         subtype: 'linkedlist' },
  { lesson: 'hashmap',            subtype: 'hashmap' },
  { lesson: 'hashset',            subtype: 'hashset' },
  { lesson: 'iterator',           subtype: 'iterator' },
  { lesson: 'wrapper-classes',    subtype: 'wrapper-classes' },
  { lesson: 'exceptions',         subtype: 'exceptions' },
  { lesson: 'regex',              subtype: 'regex' },
  { lesson: 'threads',            subtype: 'threads' },
  { lesson: 'lambda',             subtype: 'lambda' },
  { lesson: 'files',              subtype: 'files' },
];

function addPlayground(data, lesson, subtype) {
  if (!data[lesson]) { console.warn('  SKIP: lesson not found:', lesson); return; }
  const blocks = data[lesson].blocks;
  // Check it doesn't already have this playground
  if (blocks.some(b => b.type === 'playground' && b.subtype === subtype)) {
    console.log('  SKIP: already has playground for', lesson); return;
  }
  // Insert playground block before the last block (which is often a note/image)
  const insertPos = Math.max(blocks.length - 1, 0);
  blocks.splice(insertPos, 0, { type: 'playground', subtype });
  console.log('  Added', subtype, 'playground to', lesson, '(pos', insertPos, ')');
}

['java-course.json', 'java-course-ta.json'].forEach(filename => {
  const filepath = path.join(__dirname, '..', 'public', 'courses', 'java', filename);
  console.log('\nProcessing:', filename);
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  for (const { lesson, subtype } of PLAYGROUNDS) {
    addPlayground(data, lesson, subtype);
  }
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log('  Saved:', filename);
});

console.log('\nDone!');
