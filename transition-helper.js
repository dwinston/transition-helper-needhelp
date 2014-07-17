var OFFSCREEN_CLASS = 'off-screen';
var EVENTS = 'webkitTransitionEnd oTransitionEnd transitionEnd msTransitionEnd transitionend';

var hooks = {
    insertElement: function(node, next) {
      $(node)
        .addClass(OFFSCREEN_CLASS)
        .insertBefore(next);
      
      Deps.afterFlush(function() {
        // call width to force the browser to draw it
        $(node).width();
        $(node).removeClass(OFFSCREEN_CLASS);
      });
    },
      // we could do better I guess?
    moveElement: function(node, next) {
      hooks.removeElement(node);
      hooks.insertElement(node, next);
    },
    removeElement: function(node) {
      console.log('start removal process');
      $(node).addClass(OFFSCREEN_CLASS)
        .one(EVENTS, function() {
          console.log('actually remove');
          $(node).remove()
        });
    }
  }

Template.transition.rendered = function() {
  this.firstNode.parentNode._uihooks = hooks;
}
