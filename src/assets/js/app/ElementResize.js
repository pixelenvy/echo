export default class {
  constructor(e, c) {
    var t = this;
    t.element = e;

    // Helpers
    t.continuous = c || false;
    t.ticking = false;

    // Events
    if (typeof CustomEvent === 'function') { // Good Browsers
      t.resizeEnd = new CustomEvent('resizeEnd', {detail: {}});
      t.debouncedResize = new CustomEvent('debouncedResize', {detail: {}});
    } else { // IE
      resizeEnd = document.createEvent('CustomEvent');
      debouncedResize = document.createEvent('CustomEvent');
      resizeEnd.initCustomEvent('resized', true, true, {detail: {}});
      debouncedResize.initCustomEvent('debouncedResize', true, true, {detail: {}});
    }

    // Initialise
    t.init();
  }

  // Create an object element inside the element we want to emit reize events
  // from and watch it for resize
  init() {
    var t = this;

    function onObjLoad() {
      // Not needed outside of init(), so let's keep it anonymous
      // Context is the object element created below
      this.contentDocument.defaultView.resizeTrigger = this.resizeElement;
      this.contentDocument.defaultView.addEventListener('resize', onObjResize);
    }

    function onObjResize(e) {
      // Not needed outside of init(), so let's keep it anonymous
      // Context is the object element created below

      // The on end event
      t.endListenerFactory();
      // If desired, the element can emit an event whilst resizing, off by default
      if (t.continuous) t.requestTick();
    }

    // Make our element relative if it has no position
    if (getComputedStyle(t.element).position === 'static') {
      t.element.style.position = 'relative';
    }
    // Create an object element
    t.obj = document.createElement('object');
    t.obj.className = 'resizing__object';

    // Tell the browser this obj is a page, so it emits a resize event
    t.obj.resizeElement = t.element;
    t.obj.onload = onObjLoad;
    t.obj.type = 'text/html';
    t.obj.data = 'about:blank';

    // Create styles for the object, if they don't already exist
    if (!document.getElementById('ResizingElementStyle')) {
      var style = document.createElement('style');
      var css =  '.resizing__object {';
          css += 'background:transparent;';
          css += 'display:block;';
          css += 'height:100%;';
          css += 'left:0;';
          css += 'overflow:hidden;';
          css += 'pointer-events:none;';
          css += 'position:absolute;';
          css += 'top:0%;';
          css += 'width:100%;';
          css += 'z-index:-999;';
          css += '}';

      style.setAttribute('id', 'ResizingElementStyle');
      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      document.head.appendChild(style);
    }
    // Add the resizing class to the queried element
    t.element.classList.add('resizing');
    // Append the object element to the queried element
    t.element.appendChild(t.obj);
  }

  endListenerFactory(){
    var t = this;
    // Cancel the current running timer
    clearTimeout(t.timer);
    // Starts a timer, so dragEnd will only fire if the timer gets to zero,
    // which will only happen when the user stops resizing their viewport
    t.timer = setTimeout(function(){
      t.onResizeEnd.call(t);
    }, 250);
  }

  onResizeEnd(){
    var t = this;

    t.resizeEnd.detail.height = t.element.offsetHeight;
    t.resizeEnd.detail.width = t.element.offsetWidth;
    t.element.dispatchEvent(t.resizeEnd);
  }

  requestTick(){
    var t = this;
    if (!t.ticking) requestAnimationFrame(function(){
      t.update.call(t);
    });
    t.ticking = true;
  }

  update(){
    var t = this;

    t.ticking = false;
    t.debouncedResize.detail.height = element.offsetHeight;
    t.debouncedResize.detail.width = element.offsetWidth;
    t.element.dispatchEvent(debouncedResize);
  }
}