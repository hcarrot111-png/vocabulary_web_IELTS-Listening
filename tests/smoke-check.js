const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'index.html',
  'assets/styles.css',
  'assets/app.js',
  'preview/index.html',
  'docs/DEVELOPMENT.md',
  'docs/DATA-CONTRACT.md'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`缺少工程文件: ${file}`);
  }
}

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(root, 'assets/app.js'), 'utf8');

for (const expected of ['./assets/styles.css', './assets/app.js']) {
  if (!html.includes(expected)) throw new Error(`index.html 未引用 ${expected}`);
}

for (const feature of ['showView', 'openType', 'startMode', 'startReview', 'openWordDetail']) {
  if (!script.includes(`function ${feature}`)) {
    throw new Error(`缺少核心功能入口: ${feature}`);
  }
}

for (const spellingFeature of ['再次确认', 'spellViewAnswer', 'revealSpellingAnswer', '!state.answerShowMeaning']) {
  if (!script.includes(spellingFeature)) {
    throw new Error(`缺少最新版拼写练习功能: ${spellingFeature}`);
  }
}

for (const latestFeature of ['buildKeyOptions', 'buildTopicOptions', "translationHighlights:['缺勤']", "translationHighlights:['成就']", "translationHighlights:['广告']"]) {
  if (!script.includes(latestFeature)) {
    throw new Error(`缺少最新版词表或解析功能: ${latestFeature}`);
  }
}

for (const topicMeaningFeature of ['id="topicReplay"', 'state.analysis=false;', 'if(state.submitted||state.analysis)']) {
  if (!script.includes(topicMeaningFeature)) {
    throw new Error(`缺少话题词词义速记状态逻辑: ${topicMeaningFeature}`);
  }
}

console.log('工程结构与核心功能入口检查通过。');
