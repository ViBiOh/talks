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
  currentName = name;
  return '/doc/' + name + '/index.md?v={{version}}';
}

function loadMarkdown(markdownFilename, pageNum, slideNum) {
  let docUrl = getDocUrl(markdownFilename);

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

/**
 * Insert reveal script into dom.
 * @return {Promise} Promise resolved when script is loaded
 */
function insertRevealScript() {
  return new Promise(resolve => {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/vendor/reveal.js?v={{version}}';
    script.async = 'true';
    script.onload = resolve;

    document.querySelector('head').appendChild(script);
  });
}

Promise.all([insertRevealScript()])
  .then(function() {
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
          src: '/vendor/marked.js',
          callback: function() {
            var renderer = new marked.Renderer();

            renderer.image = function(href, title, text) {
              return (
                '<img data-src="/doc/' +
                currentName +
                '/' +
                href +
                '?v={{version}}" alt="' +
                title +
                '" />'
              );
            };

            renderer.link = function(href, title, text) {
              var url = href;
              if (!/^https?:\/\//.test(href)) {
                url = '/doc/' + currentName + '/' + href;
              }

              return (
                '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + text + '</a>'
              );
            };

            marked.setOptions({ renderer: renderer });
          },
        },
        { src: '/vendor/markdown.js' },
        {
          src: '/vendor/classList.js',
          condition: function() {
            return !document.body.classList;
          },
        },
        {
          src: '/vendor/highlight.js',
          async: true,
          callback: function() {
            hljs.initHighlightingOnLoad();
          },
        },
      ],
    });
  })
  .catch(function(e) {
    console.error(e);
  });
