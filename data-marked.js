(function() {
  'use strict';

  function marked(el) {
    el.innerHTML = window.marked(el.dataset.marked || el.innerHTML);
  }

  function init(node = document) {
    if (node.target) {
      node = node.target;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      return;
    }

    if (node.dataset && node.dataset.marked) {
      marked(node);
    }

    var elements = node.querySelectorAll('[data-marked]');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      marked(element);
    }
  }

  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(init);

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      Array.prototype.forEach.call(mutation.addedNodes, init);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
