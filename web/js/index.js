(function() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = '/css/paper.css?v={{version}}';
  document.getElementsByTagName('head')[0].appendChild(link);
})();

var config = (function() {
  var override = {
    markdown: 'whoami',
    pageNum: 0,
    slideNum: 0,
  };

  window.location.pathname.replace(/([^/]+)/gim, function(match, markdown) {
    override.markdown = markdown;
  });
  window.location.hash.replace(/\/([0-9]+)(?:\/([0-9]+))?$/gim, function(match, pageNum, slideNum) {
    override.pageNum = pageNum;
    override.slideNum = slideNum;
  });

  return override;
})();

var currentName = '';

function removeAllChild(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function getDocUrl(name) {
  return '/doc/' + name + '/index.md?v={{version}}';
}

function loadMarkdown(markdownFilename, pageNum, slideNum) {
  let docUrl = getDocUrl(markdownFilename);
  currentName = markdownFilename

  fetch(docUrl, { method: 'HEAD' }).then(function(response) {
    if (!response.ok) {
      docUrl = getDocUrl('whoami');
    }

    var slides = document.getElementsByClassName('slides')[0];
    removeAllChild(slides);

    var section = document.createElement('section');
    section.setAttribute('data-markdown', docUrl);
    section.setAttribute('data-separator', '^\n\n\n');
    section.setAttribute('data-separator-vertical', '^\n\n');
    section.setAttribute('data-charset', 'utf-8');

    slides.appendChild(section);

    RevealMarkdown.initialize();
    Reveal.navigateTo(pageNum, slideNum);
  });
}

Reveal.addEventListener('ready', function() {
  loadMarkdown(config.markdown, config.pageNum, config.slideNum);
});

Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  transition: 'slide',
  dependencies: [
    {
      src: '/js/marked.js',
      callback: function() {
        var renderer = new marked.Renderer();

        renderer.image = function(href, title, text) {
          return (
            '<img data-src="/doc/' + currentName + '/' + href + '?v={{version}}" alt="' + title + '" />'
          );
        };

        renderer.link = function(href, title, text) {
          return (
            '<a href="' +
            href +
            '" target="_blank" rel="noopener noreferrer">' +
            text +
            '</a>'
          );
        };

        marked.setOptions({ renderer: renderer });
      }
    },
    { src: '/js/markdown.js' },
    {
      src: '/js/classList.js',
      condition: function() {
        return !document.body.classList;
      }
    },
    {
      src: '/js/highlight.js',
      async: true,
      callback: function() {
        hljs.initHighlightingOnLoad();
      }
    }
  ]
});
