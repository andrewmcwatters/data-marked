(function() {
  'use strict';

  function set(el) {
    el.innerHTML = window.marked(el.dataset.marked || el.innerHTML);
  }

  function onincludecontentloaded(event) {
    set(event.target);
  }

  function marked(el) {
    set(el);
    el.addEventListener('includecontentloaded', onincludecontentloaded);
  }

  function markedAll() {
    var elements = document.querySelectorAll('[data-marked]');
    for (var i = 0; i < elements.length; i++) {
      marked(elements[i]);
    }
  }

  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(markedAll);

  function update(node) {
    if (node.dataset && node.dataset.marked) {
      marked(node);
      return;
    }

    var childNodes = node.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
      update(childNodes[i]);
    }
  }

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(update);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
