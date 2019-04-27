/**
 * Add a script to the dom.
 * @return {Promise} Promise resolved when script is loaded
 */
async function addScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = 'true';
    script.onload = resolve;

    document.querySelector('head').appendChild(script);
  });
}

/**
 * Add a style to the dom.
 * @return {Promise} Promise resolved when style is loaded
 */
async function addStyle(src) {
  return new Promise(resolve => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = src;
    style.onload = resolve;

    document.querySelector('head').appendChild(style);
  });
}

/**
 * Insert reveal scripts into dom.
 * @return {Promise} Promise resolved when script is loaded
 */
async function insertRevealScripts() {
  await addScript('/vendor/reveal.js?v={{version}}');
  await addScript('/vendor/marked.js?v={{version}}');
  await addScript('/vendor/markdown.js?v={{version}}');
}

/**
 * Get configuration for location.
 * @return {Object} Configuration of talks
 */
function getConfig() {
  const override = {
    markdown: 'whoami',
    pageNum: 0,
    slideNum: 0,
  };

  window.location.pathname.replace(/([^/]+)/gim, (match, markdown) => {
    override.markdown = markdown;
  });

  window.location.hash.replace(/\/([0-9]+)(?:\/([0-9]+))?$/gim, (match, pageNum, slideNum) => {
    override.pageNum = pageNum;
    override.slideNum = slideNum;
  });

  return override;
}

let currentName = '';

function removeAllChild(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function getDocUrl(name) {
  currentName = name;
  return '/doc/' + name + '/index.md?v={{version}}';
}

async function loadMarkdown(markdownFilename, pageNum, slideNum) {
  let docUrl = getDocUrl(markdownFilename);

  const response = await fetch(docUrl, { method: 'HEAD' });

  if (!response.ok) {
    docUrl = getDocUrl('whoami');
  }

  const slides = document.getElementsByClassName('slides')[0];
  removeAllChild(slides);

  const section = document.createElement('section');
  section.setAttribute('data-markdown', docUrl);
  section.setAttribute('data-separator', '^\n\n\n');
  section.setAttribute('data-separator-vertical', '^\n\n');
  section.setAttribute('data-charset', 'utf-8');

  slides.appendChild(section);

  await RevealMarkdown.init();
  Reveal.navigateTo(pageNum, slideNum);
}

function getMarkedRenderer() {
  const renderer = new marked.Renderer();

  renderer.image = (href, title, text) =>
    `<img data-src="/doc/${currentName}/${href}?v={{version}}" alt="${title}" />`;

  renderer.link = (href, title, text) => {
    let url = href;
    if (!/^https?:\/\//.test(href)) {
      url = '/doc/' + currentName + '/' + href;
    }

    return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + text + '</a>';
  };

  return renderer;
}

async function init() {
  await insertRevealScripts();

  Reveal.addEventListener('ready', () => {
    const config = getConfig();
    loadMarkdown(config.markdown, config.pageNum, config.slideNum);
  });

  Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,
    transition: 'slide',
    markdown: {
      renderer: getMarkedRenderer(),
    },
    dependencies: [
      {
        src: '/vendor/classList.js',
        condition: () => !document.body.classList,
      },
      {
        src: '/vendor/highlight.js',
        async: true,
        callback: () => hljs.initHighlightingOnLoad(),
      },
    ],
  });
}

init();
