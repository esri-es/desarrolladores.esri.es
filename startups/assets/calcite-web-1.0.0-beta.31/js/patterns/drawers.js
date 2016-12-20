// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as aria from '../helpers/aria';
import * as event from '../helpers/event';
import bus from '../helpers/bus';

// ┌────────┐
// │ Drawer │
// └────────┘
// show and hide drawers
function drawer () {
  var wrapper = document.querySelector('.wrapper');
  var footer = document.querySelector('.footer');
  var toggles = dom.findElements('.js-drawer-toggle');
  var drawers = dom.findElements('.js-drawer');
  var lastOn;

  // Bus events
  bus.on('drawer:open', openDrawer);
  bus.on('keyboard:escape', closeDrawer);
  bus.on('drawer:close', closeDrawer);
  bus.on('drawer:bind', bindDrawers);

  function openDrawer (options) {
    bus.emit('drawer:close');
    var drawer = document.querySelector(`.js-drawer[data-drawer="${options.id}"]`);
    var right = classy.has(drawer, 'drawer-right');
    var left = classy.has(drawer, 'drawer-left');

    drawer.setAttribute('tabindex', 0);
    classy.add(drawer, 'is-active');

    if (right) {
      classy.add(wrapper, 'drawer-right-is-active');
    } else if (left) {
      classy.add(wrapper, 'drawer-left-is-active');
    }

    aria.hide([wrapper, footer]);
    event.add(drawer, event.click(), closeClick);
    event.add(document, 'focusin', fenceDrawer);
  }

  function closeDrawer (options) {
    if (!options) {
      drawers.forEach(function (drawer) {
        drawer.removeAttribute('tabindex');
        classy.remove(drawer, 'is-active');
      });
    } else {
      var drawer = document.querySelector(`.js-drawer[data-drawer="${options.id}"]`);
      drawer.removeAttribute('tabindex');
      classy.remove(drawer, 'is-active');
    }
    classy.remove(wrapper, 'drawer-left-is-active');
    classy.remove(wrapper, 'drawer-right-is-active');
    aria.show([wrapper, footer]);
    event.remove(document, 'focusin', fenceDrawer);
    if (lastOn) lastOn.focus();
  }

  function fenceDrawer (e) {
    if (!dom.closest('js-drawer', e.target)) {
      drawers.forEach(function (drawer) {
        if (classy.has(drawer, 'is-active')) {
          drawer.focus();
        }
      });
    }
  }

  function bindDrawers (options) {
    if (!options) {
      toggles.forEach(function (toggle) {
        event.add(toggle, event.click(), toggleClick);
      });
    } else {
      event.add(options.node, event.click(), toggleClick);
    }
  }

  function closeClick (e) {
    if (classy.has(e.target, 'js-drawer')) {
      bus.emit('drawer:close');
    }
  }

  function toggleClick (e) {
    event.preventDefault(e);
    var drawerId = e.target.getAttribute('data-drawer');
    bus.emit('drawer:open', {id: drawerId});
  }

  bus.emit('drawer:bind');
}

export default drawer;
