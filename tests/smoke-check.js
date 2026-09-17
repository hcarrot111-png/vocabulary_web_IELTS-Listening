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

console.log('工程结构与核心功能入口检查通过。');
