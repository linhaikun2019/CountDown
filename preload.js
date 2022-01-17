// 在预加载过程中，所有Node.js API均可用。
// 它具有与Chrome扩展程序相同的沙箱。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  require('events').EventEmitter.defaultMaxListeners = 0
})
