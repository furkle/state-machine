/* State Machine. By furkle. With design assistance from Cat Manning. */

'use strict'; // eslint-disable-line

/* [].filter polyfill from MDN. */
/* istanbul ignore next */
// eslint-disable-next-line
if (!Array.prototype.filter) { Array.prototype.filter = function(fun) { 'use strict'; if (this === void 0 || this === null) { throw new TypeError(); } var t = Object(this); var len = t.length >>> 0; if (typeof fun !== 'function') { throw new TypeError(); } var res = []; for (var i = 0; i < len; i++) { if (i in t) { var val = t[i]; /* NOTE: Technically this should Object.defineProperty at the next index, as push can be affected by properties on Object.prototype and Array.prototype. But that method's new, and collisions should be rare, so use the more-compatible alternative. */ if (fun(val, i, t)) { res.push(val); } } } return res; }; }

/* Promise polyfill from github.com/stefanpenner/es6-promise. */
/* istanbul ignore next */
// eslint-disable-next-line
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function e(t){return"function"==typeof t}function n(t){I=t}function r(t){J=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof H?function(){H(a)}:c()}function s(){var t=0,e=new V(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<G;t+=2){var e=$[t],n=$[t+1];e(n),$[t]=void 0,$[t+1]=void 0}G=0}function f(){try{var t=require,e=t("vertx");return H=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=arguments,r=this,o=new this.constructor(p);void 0===o[et]&&k(o);var i=r._state;return i?!function(){var t=n[i-1];J(function(){return x(i,o,t,r._result)})}():E(r,o,t,e),o}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(e){return it.error=e,it}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){J(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===rt?S(t,e._result):e._state===ot?j(t,e._result):E(e,void 0,function(e){return g(t,e)},function(e){return j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?b(t,n):r===it?(j(t,it.error),it.error=null):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,v()):t(n)?w(e,n,_(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===nt&&(t._result=e,t._state=rt,0!==t._subscribers.length&&J(T,t))}function j(t,e){t._state===nt&&(t._state=ot,t._result=e,J(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+rt]=n,o[i+ot]=r,0===i&&t._state&&J(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return st.error=n,st}}function x(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if(s=P(r,o),s===st?(a=!0,u=s.error,s.error=null):c=!0,n===s)return void j(n,d())}else s=o,c=!0;n._state!==nt||(i&&c?g(n,s):a?j(n,u):t===rt?S(n,s):t===ot&&j(n,s))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return ut++}function k(t){t[et]=ut++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[et]||k(this.promise),B(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):j(this.promise,q())}function q(){return new Error("Array Methods must be provided an Array")}function F(t){return new Y(this,t).promise}function D(t){var e=this;return new e(B(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function K(t){var e=this,n=new e(p);return j(n,t),n}function L(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function U(t){this[et]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&L(),this instanceof U?C(this,t):N())}function W(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=U}var z=void 0;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B=z,G=0,H=void 0,I=void 0,J=function(t,e){$[G]=t,$[G+1]=e,G+=2,2===G&&(I?I(a):tt())},Q="undefined"!=typeof window?window:void 0,R=Q||{},V=R.MutationObserver||R.WebKitMutationObserver,X="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),Z="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,$=new Array(1e3),tt=void 0;tt=X?o():V?s():Z?u():void 0===Q&&"function"==typeof require?f():c();var et=Math.random().toString(36).substring(16),nt=void 0,rt=1,ot=2,it=new M,st=new M,ut=0;return Y.prototype._enumerate=function(){for(var t=this.length,e=this._input,n=0;this._state===nt&&n<t;n++)this._eachEntry(e[n],n)},Y.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=_(t);if(o===l&&t._state!==nt)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===U){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},Y.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===nt&&(this._remaining--,t===ot?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},Y.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){return n._settledAt(rt,e,t)},function(t){return n._settledAt(ot,e,t)})},U.all=F,U.race=D,U.resolve=h,U.reject=K,U._setScheduler=n,U._setAsap=r,U._asap=J,U.prototype={constructor:U,then:l,"catch":function(t){return this.then(null,t)}},U.polyfill=W,U.Promise=U,U.polyfill(),U});

/* Object.keys polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys */
/* istanbul ignore next */
// eslint-disable-next-line
if (!Object.keys) { Object.keys = (function() { 'use strict'; var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'), dontEnums = [ 'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor' ], dontEnumsLength = dontEnums.length; return function(obj) { if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) { throw new TypeError('Object.keys called on non-object'); } var result = [], prop, i; for (prop in obj) { if (hasOwnProperty.call(obj, prop)) { result.push(prop); } } if (hasDontEnumBug) { for (i = 0; i < dontEnumsLength; i++) { if (hasOwnProperty.call(obj, dontEnums[i])) { result.push(dontEnums[i]); } } } return result; }; }()); }

/* The constructor for the object which will be responsible for all aspects of
 * transitioning for the children of its supervised element. Takes a single
 * argument object, which has the following optional (with the exception
 * of the predicate function) fields.
 *
 * config: An object used to provide configuration data for any internal
 * aspects of transitioning. Defaults to initTimeoutLength: 0,
 * initIntervalLength: -1, stepsToEase: 5, statesDelimiter: /,/.
 *
 * userConfig: An object used to provide configuration data for any external
 * aspects of transitioning. No defaults.
 *
 * objectToSupervise: The object in which to apply transitions to
 * transitionables (objects with a data-states attribute). Defaults to
 * document, or an empty array, if document does not exist (e.g. in Node).
 *
 * getStates: A function which receives the transitionable as its sole
 * argument. Based on the data-states attribute, should return a
 * list of states without empty indices. Defaults to splitting on
 * config.statesDelimiter and filtering out empty indices.
 *
 * getKeyframe: A function which receives the transitionable as its sole
 * argument, calls this.getStates on it, and returns the current index.
 * Defaults to a no-frills implementation of this.
 *
 * predicate: The function which determines whether a transitionable advances
 * to its next state, or remains at its current. No default. Must be provided
 * by the user for anything to function. Receives the transitionable as its
 * sole argument.
 *
 * doBeforeTransition: A function which is fired before easing. Defaults to
 * a function which does nothing (a no-op).
 *
 * easing: The function which determines how the supervisor eases between
 * keyframes. The arguments received are TODO
 * Easing is done on a Math.floor(timeRemaining / steps) interval
 * basis. Given the way intervals and timeouts work in Javascript, there is not
 * and can be no guarantee that any given easing will occur. The keyframe being
 * transitioned to is set at the end of the interval cycle regardless of
 * easing. No default.
 *
 * completeTransition: The function which ends easing and sets the final value
 * for the transitionable before the next won frame occurs. Defaults to a
 * function which sets the text content of the transitionable to the transformed
 * value of the new keyframe.
 *
 * transformToString: The function which takes the current eased or
 * transitioned value and transforms it into a string so it used as the
 * transitionable element's text content.
 *
 * strings: An object that can be used to override default strings for error
 * and other supervisor logging. */
function TransitionSupervisor(argsObj) {
  /* Set args to an object if it is falsey to prevent exceptions from
   * accessing properties. */
  var args = argsObj || {};

  /* Used to hold the results of Object.keys. */
  var keys;
  /* Used to track the index of for-loop iteration. */
  var ii;

  /* The default configuration object for the supervisor. */
  var config = {
    initTimeoutLength: 0,
    /* -1 means no interval. */
    initIntervalLength: -1,
    /* Used to get transitionables from HTML element objectToSupervise. */
    selector: '[data-states]',
    /* Used if initIntervalLength is -1. */
    stepsToEase: 5,
    /* Can be string or regex. */
    statesDelimiter: /,/,
  };

  /* Assign internal strings to keys. This makes it possible to test that the
   * a message was received without having to copy the string into the test. */
  this.strings = {
    initTimeoutLengthInvalid: 'Config was provided, but ' +
      'initTimeoutLength was either undefined, NaN, or less than ' +
      'zero. Supervisor will not function.',

    initIntervalLengthInvalid: 'Config was provided, but ' +
      'initIntervalLength was either undefined, NaN, or less or equal ' +
      'to than zero. Supervisor will not function.',

    predicateInvalid: 'The predicate was not provided or was not a ' +
      'function.',

    transitionableIsValidInvalid: 'The transitionableIsValid argument ' +
      'was not a function. Supervisor will not function.',

    getStatesInvalid: 'The getStates argument was not a function. ' +
      'Supervisor will not function.',

    getKeyframeInvalid: 'The getKeyframe argument was not a function. ' +
      'Supervisor will not function.',

    doBeforeTransitionInvalid: 'The doBeforeTransition argument was not ' +
      'a function. Supervisor will not function.',

    completeTransitionInvalid: 'The completeTransition argument was not ' +
      'a function. Supervisor will not function.',

    transitionableInvalid: 'Transitionable was non-element or did not ' +
      'have a data-states attribute with content, and could not ' +
      'be transitioned.',

    stateIndexInvalid: 'data-state-index is out of band. ' +
      'Cannot execute.',

    transitionDirectionInvalid: 'data-transition-direction was neither ' +
      'alternate, alternate-reverse, forwards, reverse, or shuffle.',

    transitionCurrentDirectionInvalid: 'data-transition-direction was ' +
      'alternate or alternate-reverse, but ' +
      'data-current-transition-direction was neither reverse nor ' +
      'forwards. Cannot execute.',

    supervisorNotReinitialized: 'The start method was called on a ' +
      'supervisor, but it has not been reinitialized.',

    stepsToEaseInvalid: 'Config was provided, but stepsToEase was ' +
      'either undefined, NaN, or less than zero. Supervisor will not ' +
      'function.',

    transitionIdInvalid: 'The data-transitionable-id attribute was not ' +
      'present on the transitionable, or was not castable to a ' +
      'non-negative integer.',

    objectToSuperviseInvalid: 'The objectToSupervise property is ' +
      'neither an HTML element, an array, or a plain object.',

    statesInvalid: 'The transitionable did not have a valid data-states ' +
      'attribute. Valid data-states types are string and array-like ' +
      'object.',

    easingInvalid: 'The easing argument was provided, but was not a ' +
      'function. Supervisor will not function.',

    transformToStringInvalid: 'The transformToString argument was provided, ' +
      'but was not a function. Supervisor will not function.',

    startInvalid: 'The start argument was provided, but was not a function. ' +
      'Supervisor will not function.',

    restartInvalid: 'The restart argument was provided, but was not a ' +
      'function. Supervisor will not function.',

    shuffleInvalid: 'The shuffle argument was provided, but was not a ' +
      'function. Supervisor will not function.',

    tryToDelegateToTransitionableInvalid: 'The ' +
      'tryToDelegateToTransitionable argument was provided, but was not a ' +
      'function. Supervisor will not function.',

    removeFromTransitioningInvalid: 'The removeFromTransitioning argument ' +
      'was provided, but was not a function. Supervisor will not function.',

    collectTransitionablesInvalid: 'The collectTransitionables argument was ' +
      'provided, but was not a function. Supervisor will not function.',

    transitionableIsExpiredInvalid: 'The transitionableIsExpired argument ' +
      'was provided, but was not a function. Supervisor will not function.',

    setNextStateInvalid: 'The setNextState argument was provided, but was ' +
      'not a function. Supervisor will not function.',

    executeTransitionInvalid: 'The executeTransition argument was provided, ' +
      'but was not a function. Supervisor will not function.',

    transitionOneInvalid: 'The transitionOne argument was provided, but it ' +
      'was not a function. Supervisor will not function.',

    transitionAllInvalid: 'The transitionAll argument was provided, but it ' +
      'was not a function. Supervisor will not function.',

    nextInvalid: 'The next argument was provided, but it was not a ' +
      'function. Supervisor will not function.',

    stopInvalid: 'The stop argument was provided, but it was not a ' +
      'function. Supervisor will not function.',

    initInvalid: 'The init argument was provided, but it was not a ' +
      'function. Supervisor will not function.',

    startTimeInvalid: 'The transitionable\'s data-transition-start-time ' +
      'attribute is invalid.',
  };

  /* Replace all internal strings with provided strings bearing the same
   * key. */
  if (args.strings && typeof args.strings === 'object') {
    keys = Object.keys(args.strings);
    for (ii = 0; ii < keys.length; ii += 1) {
      this.strings[keys[ii]] = String(args.strings[keys[ii]]);
    }
  }

  this.isComplete = false;
  this.nextAvailableTransitionableId = 0;
  this.config = config;

  /* Write each property in the argument object's configuration object
   * to the constructing object's config object. */
  keys = Object.keys(args.config || {});
  for (ii = 0; ii < keys.length; ii += 1) {
    this.config[keys[ii]] = args.config[keys[ii]];
  }

  this.config.initTimeoutLength = Number(this.config.initTimeoutLength);
  if (Number.isNaN(this.config.initTimeoutLength) ||
    this.config.initTimeoutLength < 0) {
    console.log(this.strings.initTimeoutLengthInvalid ||
      'Error missing! initTimeoutLengthInvalid');
    return;
  }

  this.config.initIntervalLength = Number(this.config.initIntervalLength);
  if (Number.isNaN(this.config.initIntervalLength) ||
    (this.config.initIntervalLength < 0 &&
      this.config.initIntervalLength !== -1)) {
    console.log(this.strings.initIntervalLengthInvalid ||
      'Error missing! initIntervalLengthInvalid');
    return;
  }

  this.config.stepsToEase = Number(this.config.stepsToEase);
  if (Number.isNaN(this.config.stepsToEase) ||
    this.config.stepsToEase <= 0) {
    console.log(this.strings.stepsToEaseInvalid ||
      'Error missing! stepsToEaseInvalid');
    return;
  }

  this.userConfig = args.userConfig || {};
  this.objectToSupervise = args.objectToSupervise;
  if (!this.objectToSupervise ||
    typeof this.objectToSupervise !== 'object') {
    /* istanbul ignore else */
    if (typeof document === 'object') {
      // eslint-disable-next-line
      this.objectToSupervise = document;   
    } else {
      this.objectToSupervise = [];
    }
  }

  this.transitionables = [];

  this.initIntervalId = null;
  this.initTimeoutId = null;
  this.easingIntervalIds = {};

  /* The function which kicks everything off -- collects transitionables,
   * sets their initial text content, begins the interval calling
   * transitionAll. */
  function init() {
    var t;
    var attr;
    var cur;
    var direction;
    var states;
    var xx;

    /* Reset everything to default. */
    this.isComplete = false;
    this.transitionables = [];
    this.initTimeoutId = null;
    this.initIntervalId = null;
    this.easingIntervalIds = {};

    /* Collect all the transitionables from the supervised element. */
    this.transitionables = this.collectTransitionables();

    for (xx = 0; xx < this.transitionables.length; xx += 1) {
      t = this.transitionables[xx];

      /* Give the attribute a unique id. */
      t.setAttribute('data-transitionable-id',
        this.nextAvailableTransitionableId);

      /* Increment the available ID. */
      this.nextAvailableTransitionableId += 1;

      /* Delete the data-transition-time attribute so we don't end up
       * counting from a previous usage. */
      t.removeAttribute('data-transition-start-time');

      /* Set the state index and, if alternating, the current direction. */
      cur = 'data-transition-current-direction';
      direction = t.getAttribute('data-transition-direction');
      if (direction === 'alternate') {
        t.setAttribute('data-state-index', 0);
        t.setAttribute(cur, 'forwards');
      } else if (direction === 'alternate-reverse') {
        states = this.tryToDelegateToTransitionable('getStates', t);
        t.setAttribute('data-state-index', states.length - 1);
        t.setAttribute(cur, 'reverse');
      } else if (direction === 'reverse') {
        states = this.tryToDelegateToTransitionable('getStates', t);
        t.setAttribute('data-state-index', states.length - 1);
      } else {
        t.setAttribute('data-state-index', 0);
      }

      /* Complete the first state transition. */
      this.tryToDelegateToTransitionable('completeTransition', t);
    }
  }

  /* Populates the transitionables array from the objectToSupervise. */
  function collectTransitionables() {
    var self = this;
    var arrayLike;
    var realArray = [];
    var ots = this.objectToSupervise;
    var zz;

    if (!ots) {
      /* objectToSupervise is out of band. */
      console.log(this.strings.objectToSuperviseInvalid ||
        'Error missing! objectToSuperviseInvalid');
      return [];
    } else if (typeof ots.querySelectorAll === 'function') {
      /* objectToSupervise is an HTML element. */
      arrayLike = ots.querySelectorAll(this.config.selector);
      for (zz = 0; zz < arrayLike.length; zz += 1) {
        realArray.push(arrayLike[zz]);
      }
    } else if (ots.length >= 0) {
      if (typeof ots.filter === 'function') {
        realArray = ots;
      } else {
        /* objectToSupervise is an array-like object. */
        for (zz = 0; zz < ots.length; zz += 1) {
          realArray.push(ots[zz]);
        }
      }
    } else {
      /* objectToSupervise is out of band. */
      console.log(this.strings.objectToSuperviseInvalid ||
        'Error missing! objectToSuperviseInvalid');
      return [];
    }

    return realArray.filter(function filter(t) {
      return self.tryToDelegateToTransitionable('transitionableIsValid', t);
    });
  }

  /* Begins execution of the event loop. */
  function start() {
    /* We need to be able to refer to the this context (which should refer
     * to the referenced supervisor object). However, non-arrow functions
     * change the this context, and arrow functions don't exist pre-ES6,
     * so we use a variable instead. */
    var self = this;

    /* If this.isComplete is truthy, this.init has not been called before
     * starting. */
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return;
    }

    this.initTimeoutId = setTimeout(function timeout() {
      /* If the interval length is -1, the user has signalled that they
       * wish to be in charge of triggering each step (firing this.next).
       * Otherwise, the supervisor manages its own interval. */
      if (self.config.initIntervalLength !== -1) {
        /* Call when we start so there's no delay. Maintain the this
         * context in next. */
        self.next.call(self);

        /* If there were no transitionables available, this.stop will
         * have been called. We should not (and cannot without errors)
         * start the interval if we've already stopped. */
        if (!self.isComplete) {
          self.initIntervalId = setInterval(function interval() {
            self.next.call(self);
          }, self.config.initIntervalLength);
        }
      }
    }, self.config.initTimeoutLength);
  }

  /* Stops the supervisor. Does nothing if it is already complete. */
  function stop() {
    var yy;
    var transitionIds;

    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return;
    }

    /* Clear all intervals and timeouts. */
    clearTimeout(this.initTimeoutId);
    this.initTimeoutId = null;

    clearInterval(this.initIntervalId);
    this.initIntervalId = null;

    transitionIds = Object.keys(this.easingIntervalIds || {});
    for (yy = 0; yy < transitionIds.length; yy += 1) {
      clearInterval(this.easingIntervalIds[transitionIds[yy]]);
    }

    this.easingIntervalIds = {};

    /* Update the field to reflect that the supervisor has completed all
     * transitions. */
    this.isComplete = true;
  }

  /* Restarts the supervisor from the beginning. */
  function restart() {
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return;
    }

    this.stop();
    this.init();
    this.start();
  }

  /* Filters the completed/invalid transitions out. If any remain,
   * this.transitionAll is called; otherwise the interval is ended and
   * execution ceases/ceases to be possible. */
  function next() {
    var self = this;

    /* Take note of the time at which the interval started. This will be
     * used to determine the time remaining before the next interval for
     * easing purposes. */
    var intervalStartedAt = new Date().getTime();

    /* Do nothing if execution is complete. */
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return;
    }

    /* Don't pass along elements that lack are not valid transitionables or
     * are not present within the document. */
    this.transitionables = this.transitionables.filter(function filter(t) {
      if (self.tryToDelegateToTransitionable('transitionableIsValid', t)) {
        /* If the element doesn't have a data-transition-start-time attribute,
         * it's the first time we're executing it, so we start counting elapsed
         * time from here. */
        if (!t.getAttribute('data-transition-start-time')) {
          t.setAttribute('data-transition-start-time', new Date().getTime());
        }

        t.setAttribute('data-transition-interval-started-at',
          intervalStartedAt);

        return true;
      }

      self.removeFromTransitioning(t);
      return false;
    });

    if (this.transitionables.length) {
      /* If there remain uncompleted transitions, transition
       * all of them. */
      this.transitionAll();
    } else {
      /* Otherwise, stop. */
      this.stop();
    }
  }

  function transitionAll() {
    /* Do nothing if the supervisor has completed. */
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return;
    }

    var zz;
    for (zz = 0; zz < this.transitionables.length; zz += 1) {
      this.transitionOne(this.transitionables[zz]);
    }
  }

  function transitionOne(transitionable) {
    var t = transitionable;

    /* Do nothing if the supervisor has completed. */
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return;
    }

    if (!this.tryToDelegateToTransitionable('transitionableIsValid', t)) {
      console.log(this.strings.transitionableInvalid ||
        'Error missing! transitionableInvalid');
      return;
    }

    /* Test whether this transitionable "wins" and is transitioned to its
     * next state. Check if the transitionable has its own predicate
     * function, and if it does not, call the supervisor's predicate
     * function. */
    if (this.tryToDelegateToTransitionable('predicate', t)) {
      /* Call executeTransition on the transitionable, if that function exists,
       * and on the supervisor if it does not. */
      this.tryToDelegateToTransitionable('executeTransition', t);
    }
  }

  function executeTransition(transitionable) {
    var self = this;
    var t = transitionable;
    var outFrame;
    var inFrame;
    var timeRemaining;
    var dtisa;
    var startedAt;
    var prom;

    /* Do nothing if the supervisor has completed. */
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return;
    }

    if (!this.tryToDelegateToTransitionable('transitionableIsValid', t)) {
      console.log(this.strings.transitionableInvalid ||
        'Error missing! transitionableInvalid');
      return;
    }

    /* Fire the external pre-transition logic. */
    this.tryToDelegateToTransitionable('doBeforeTransition', transitionable);

    /* Remove the transitionable from execution if it has expired. */
    if (this.tryToDelegateToTransitionable('transitionableIsExpired', t)) {
      this.removeFromTransitioning(transitionable);
      return;
    }

    /* Save a reference to the frame we're leaving. */
    outFrame = this.tryToDelegateToTransitionable('getKeyframe', t);

    /* Do nothing if the called setNextState method does not affirmatively
     * signal that the next state was reached successfully. */
    if (!this.tryToDelegateToTransitionable('setNextState', transitionable)) {
      return;
    }

    inFrame = this.tryToDelegateToTransitionable('getKeyframe', t);

    if (this.config.initIntervalLength === -1) {
      /* If there is not an interval, use the easingLength property. */
      timeRemaining = this.config.easingLength;
    } else {
      /* Otherwise, calculate the remaining time before the transition
       * completes automatically. */
      dtisa = 'data-transition-interval-started-at';
      startedAt = transitionable.getAttribute(dtisa);
      timeRemaining = this.config.initIntervalLength -
        (new Date().getTime() - startedAt);
    }

    prom = this.tryToDelegateToTransitionable(
      'easing',
      /* transitionable */
      t,
      outFrame,
      inFrame,
      /* steps */
      this.config.stepsToEase,
      /* availableTime */
      timeRemaining - 1);

    if (prom instanceof Promise) {
      /* If the easing function does return a promise, wait for it
       * to resolve or reject, then complete the transition. */
      prom.then(function then() {
        self.tryToDelegateToTransitionable('completeTransition', t);
      })['catch'](function error() { // eslint-disable-line dot-notation
        /* ['catch'] is used because .catch is reserved in lower
         * IEs. */
        self.tryToDelegateToTransitionable('completeTransition', t);
      });
    } else {
      /* If the easing function does not return a promise, it is
       * non-conformant and is ignored to the best of the supervisor's
       * ability. */
      this.tryToDelegateToTransitionable('completeTransition', t);
    }
  }

  /* The default function called before the transition is begun. Used if
   * argsObj.doBeforeTransition is falsey. Does nothing. */
  function doBeforeTransition() {}

  function setNextState(transitionable) {
    var t = transitionable;
    var direction;
    var states;
    var currentIndex;
    var duration;
    var timeDurationRe;
    var isTimeDuration;
    var curDirection;

    /* Do nothing if the supervisor has completed. */
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return false;
    } 

    if (!this.tryToDelegateToTransitionable('transitionableIsValid', t)) {
      console.log(this.strings.transitionableInvalid ||
        'Error missing! transitionableInvalid');
      return false;
    }

    /* Get the direction of the transition. Default to forwards. */
    direction = t.getAttribute('data-transition-direction') || 'forwards';
    currentIndex = Number(t.getAttribute('data-state-index') || NaN);
    if (Number.isNaN(currentIndex) || currentIndex < 0) {
      console.log(this.strings.stateIndexInvalid ||
        'Error missing! stateIndexInvalid');
      return false;
    }

    /* Get the total duration of execution for the transitionable. Default
     * to completion, which ends after a single forward traversal of
     * data-states is performed. */
    duration = t.getAttribute('data-transition-duration') || 'completion';
    timeDurationRe = /^(\d+(?:\.\d+)?)(s|ms)$/;
    isTimeDuration = timeDurationRe.test(duration);

    /* Get all the available states for the transitionable. */
    states = this.tryToDelegateToTransitionable('getStates', t);

    if (direction === 'reverse') {
      /* If we're moving backwards through the list... */
      currentIndex -= 1;

      if (currentIndex < 0) {
        /* and we've passed the beginning of the list... */
        if (duration === 'infinite' || isTimeDuration) {
          /* and execution should continue, loop back to the end. */
          currentIndex = states.length - 1;
        } else {
          /* and execution should halt, remove the transitionable. */
          this.removeFromTransitioning(t);
          return false;
        }
      }
    } else if (direction === 'forwards' || direction === 'shuffle') {
      /* If we're moving forwards through the list, possibly with 
       * shuffling... */
      currentIndex += 1;

      if (currentIndex >= states.length) {
        /* and we've passed the end of the list... */
        if (duration === 'infinite' || isTimeDuration) {
          /* and execution should continue, loop back to the beginning. */
          currentIndex = 0;

          if (direction === 'shuffle') {
            /* And if desired, randomize the order of the list. */
            this.tryToDelegateToTransitionable('shuffle', t);
          }
        } else {
          /* and execution should halt, remove the transitionable. */
          this.removeFromTransitioning(t);
          return false;
        }
      }
    } else if (direction === 'alternate' ||
      direction === 'alternate-reverse') {
      /* If the direction we move through the list  */
      curDirection = t.getAttribute('data-transition-current-direction');
      if (curDirection === 'reverse') {
        currentIndex -= 1;

        if (currentIndex < 0) {
          if (duration === 'infinite' || isTimeDuration) {
            currentIndex = 1;
            t.setAttribute('data-transition-current-direction', 'forwards');
          } else {
            this.removeFromTransitioning(t);
            return false;
          }
        }
      } else if (curDirection === 'forwards') {
        currentIndex += 1;

        if (currentIndex >= states.length) {
          if (duration === 'infinite' || isTimeDuration) {
            currentIndex = states.length - 2;
            t.setAttribute('data-transition-current-direction', 'reverse');
          } else {
            this.removeFromTransitioning(t);
            return false;
          }
        }
      } else {
        console.log(this.strings.transitionCurrentDirectionInvalid ||
          'Error missing! transitionCurrentDirectionInvalid');
        return false;
      }
    } else {
      console.log(this.strings.transitionDirectionInvalid ||
        'Error missing! transitionDirectionInvalid');
      return false;
    }
        
    t.setAttribute('data-state-index', currentIndex);

    return true;
  }

  function easing() {
    /* Do nothing if the supervisor has completed. */
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return Promise.reject();
    }

    return Promise.resolve();
  }

  /* The default function called to complete the transition. Used if
   * argsObj.completeTransition is falsey. Sets the textContent of the
   * element to the transformed current keyframe. */
  function completeTransition(transitionable) {
    var t = transitionable;
    var id;
    var keyframe;

    /* Do nothing if the supervisor has completed. */
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return;
    } else if (!this.tryToDelegateToTransitionable('transitionableIsValid', t)) {
      console.log(this.strings.transitionableInvalid ||
        'Error missing! transitionableInvalid');
      return;
    }

    id = transitionable.getAttribute('data-transitionable-id') || NaN;
    id = Math.floor(Number(id));
    if (Number.isNaN(id) || id < 0) {
      console.log(this.strings.transitionIdInvalid ||
        'Error missing! transitionIdInvalid');
      return;
    }

    /* Clear the easing interval for this transitionable. */
    clearInterval(this.easingIntervalIds[id]);
    delete this.easingIntervalIds[id];

    keyframe = this.tryToDelegateToTransitionable('getKeyframe', t);
    // eslint-disable-next-line no-param-reassign
    t.textContent = this.tryToDelegateToTransitionable(
      'transformToString', t, keyframe);
  }

  /* The default function used to convert transitionable.data-states
   * to an array of states. Used if argsObj.getStates is falsey. */
  function getStates(transitionable) {
    /* Shortened name for transitionable. */
    var t = transitionable;
    /* Holds results. */
    var states;
    /* Used to convert array-like objects into true arrays. */
    var temp;
    /* Used to track the index in for-loop iteration. */
    var jj;

    if (!this.tryToDelegateToTransitionable('transitionableIsValid', t)) {
      console.log(this.strings.transitionableInvalid ||
        'Error missing! transitionableInvalid');
      return [];
    }

    states = transitionable.getAttribute('data-states');
    if (!states) {
      console.log(this.strings.statesInvalid ||
        'Error missing! statesInvalid');
      return [];
    } else if (typeof states === 'string') {
      states = states.split(this.config.statesDelimiter);
    } else if (typeof states !== 'object' ||
      typeof states.length !== 'number') {
      console.log(this.strings.statesInvalid ||
        'Error missing! statesInvalid');
      return [];
    } else if (!('filter' in states)) {
      /* Convert array-like objects into true arrays. */
      temp = [];
      for (jj = 0; jj < states.length; jj += 1) {
        temp.push(states[jj]);
      }

      states = temp;
    }

    /* Remove empty indices. */
    return states.filter(function filter(aa) { return aa; });
  }

  /* The default function used to get the current keyframe. Used if
   * argsObj.getKeyframe is falsey. */
  function getKeyframe(transitionable) {
    var t = transitionable;
    var states;
    var index;

    if (!this.tryToDelegateToTransitionable('transitionableIsValid', t)) {
      console.log(this.strings.transitionableInvalid ||
        'Error missing! transitionableInvalid');
      return null;
    }

    states = this.tryToDelegateToTransitionable('getStates', t);
    index = Math.floor(Number(t.getAttribute('data-state-index')));
    return states[index];
  }

  /* Determines whether the transitionable argument is a valid transitionable
   * and can be transitioned. */
  function transitionableIsValid(transitionable) {
    var t = transitionable;
    return (t &&
      typeof t === 'object' &&
      !(t.nodeType === 1 && !document.contains(t)) &&
      typeof t.getAttribute === 'function' &&
      t.getAttribute('data-states'));
  }

  function transitionableIsExpired(transitionable) {
    var t = transitionable;
    var duration;
    var timeDurationRe;
    var match;
    var totalAllowedTimeInMs;
    var startTime;

    /* Do nothing if the supervisor has completed. */
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return;
    }

    if (!this.tryToDelegateToTransitionable('transitionableIsValid', t)) {
      console.log(this.strings.transitionableInvalid ||
        'Error missing! transitionableInvalid');
      return false;
    }

    /* Get the duration property of the transition. Default to
     * 'completion'. Other acceptable values are ^(\d+(?:\.\d+)?)(s|ms)$,
     * and 'infinite'.*/
    duration = t.getAttribute('data-transition-duration') || 'completion';
    /* A regex with two capturing groups: the first, containing a run of
     * digits of 1 or greater length, optionally interrupted by a single
     * decimal followed by a run of digits of 1 or greater length; the
     * second, either s, denoting seconds, or ms, denoting milliseconds. */
    timeDurationRe = /^(\d+(?:\.\d+)?)(s|ms)$/;
    if (timeDurationRe.test(duration)) {
      match = duration.match(timeDurationRe);
      totalAllowedTimeInMs = Number(match[1]);
      /* If the value provided was in seconds, convert it to
       * milliseconds. */
      if (match[2] === 's') {
        totalAllowedTimeInMs *= 1000;
      }

      /* If the elapsed time is greater than the allowable total time for
       * the transitionable, remove it from transitioning. It will be
       * removed automatically from this.transitionables. */
      startTime = Number(t.getAttribute('data-transition-start-time'));
      if (Number.isNaN(startTime)) {
        console.log(this.strings.startTimeInvalid ||
          'Error missing! startTimeInvalid');
        return false;
      } else if (startTime < new Date().getTime() - totalAllowedTimeInMs) {
        return true;
      }
    }

    return false;
  }

  function removeFromTransitioning(transitionable) {
    var t = transitionable;
    
    /* Do nothing if the supervisor has completed. */
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return;
    }

    if (!this.tryToDelegateToTransitionable('transitionableIsValid', t)) {
      console.log(this.strings.transitionableInvalid ||
        'Error missing! transitionableInvalid');
      return;
    }

    /* If the transitionable has a removeFromTransitioning function, call
     * it before executing the body of the supervisor's. */
    if (typeof t.removeFromTransitioning === 'function') {
      t.removeFromTransitioning();
    }

    /* Remove all non-user-set attributes used by the default methods. */
    t.removeAttribute('data-state-index');
    t.removeAttribute('data-transitionable-id');
    t.removeAttribute('data-transition-current-direction');
    t.removeAttribute('data-transition-start-time');
    t.removeAttribute('data-transition-interval-started-at');

    /* Add an attribute to the transitionable indicating it is complete. */
    t.setAttribute('data-transitioned', '');
  }

  /* The default string casting function. */
  function transformToString() {
    var state;

    if (arguments.length === 1) {
      state = arguments[0];
    } else {
      state = arguments[1];
    }

    /* Use void 0 (which produces undefined) rather than referencing
     * window.undefined, given that in older environments undefined can be
     * redefined. */
    if (state === void 0) {
      return '';
    }

    return String(state);
  }

  /* Shuffles the order of data-states in the transitionable. */
  function shuffle(transitionable) {
    var t = transitionable;
    var states;
    var counter;
    var index;
    var temp;

    /* Do nothing if the supervisor has completed. */
    if (this.isComplete) {
      console.log(this.strings.supervisorNotReinitialized ||
        'Error missing! supervisorNotReinitialized');
      return;
    }

    if (!this.tryToDelegateToTransitionable('transitionableIsValid', t)) {
      console.log(this.strings.transitionableInvalid ||
        'Error missing! transitionableInvalid');
      return;
    }

    states = this.tryToDelegateToTransitionable('getStates', transitionable);

    /* Fisher-Yates shuffle, https://stackoverflow.com/a/6274398/3258333 */
    counter = states.length;
    /* While there are elements in the array. */
    while (counter > 0) {
      /* Pick a random index. */
      index = Math.floor(Math.random() * counter);

      /* Decrease counter by 1. */
      counter -= 1;

      /* And swap the last element with it. */
      temp = states[counter];
      states[counter] = states[index];
      states[index] = temp;
    }

    if (transitionable.nodeType === 1) {
      /* If the transitionable is an HTML element, store data-states as a
       * string. */
      transitionable.setAttribute('data-states', states.join(','));
    } else {
      /* Otherwise, store it as an array. */
      transitionable.setAttribute('data-states', states);
    }
  }

  /* Allows a more succinct way of calling a property function, preferring
   * the one on the transitionable if possible, calling the one on the
   * supervisor if not. */
  function tryToDelegateToTransitionable(name, transitionable) {
    var zz;
    var slicedArgs;

    if (!transitionable || typeof transitionable !== 'object') {
      console.log(this.strings.transitionableInvalid ||
        'Error missing! transitionableInvalid');
      return null;
    } else if (!name && name !== '') {
      console.log(this.strings.delegatedFunctionNameInvalid ||
        'Error missing! delegatedFunctionNameInvalid');
      return null;
    }

    slicedArgs = [];
    for (zz = 2; zz < arguments.length; zz += 1) {
      slicedArgs.push(arguments[zz]);
    }

    if (typeof transitionable[name] === 'function') {
      return transitionable[name].apply(transitionable, slicedArgs);
    }

    slicedArgs.unshift(transitionable);
    return this[name].apply(this, slicedArgs);
  }

  this.init = args.init || init;
  if (typeof this.init !== 'function') {
    console.log(this.strings.initInvalid ||
      'Error missing! initInvalid');
    return;
  }

  this.start = args.start || start;
  if (typeof this.start !== 'function') {
    console.log(this.strings.startInvalid ||
      'Error missing! startInvalid');
    return;
  }

  this.stop = args.stop || stop;
  if (typeof this.stop !== 'function') {
    console.log(this.strings.stopInvalid || 'Error missing! stopInvalid');
    return;
  }

  this.restart = args.restart || restart;
  if (typeof this.restart !== 'function') {
    console.log(this.strings.restartInvalid ||
      'Error missing! restartInvalid');
    return;
  }

  this.next = args.next || next;
  if (typeof this.next !== 'function') {
    console.log(this.strings.nextInvalid ||
      'Error missing! nextInvalid');
    return;
  }

  /* Calls transitionOne on each index. */
  this.transitionAll = args.transitionAll || transitionAll;
  if (typeof this.transitionAll !== 'function') {
    console.log(this.strings.transitionAllInvalid ||
      'Error missing! transitionAllInvalid');
    return;
  }

  /* Calls the predicate function for each element, calling executeTransition
   * on each one that "wins." */
  this.transitionOne = args.transitionOne || transitionOne;
  if (typeof this.transitionOne !== 'function') {
    console.log(this.strings.transitionOneInvalid ||
      'Error missing! transitionOneInvalid');
    return;
  }

  /* On a specific element, either transition the element to the next state,
   * or if the element is at its last state, remove its attributes, making it
   * untransitionable. */
  this.executeTransition = args.executeTransition || executeTransition;
  if (typeof this.executeTransition !== 'function') {
    console.log(this.strings.executeTransitionInvalid ||
      'Error missing! executeTransitionInvalid');
    return;
  }

  this.doBeforeTransition = args.doBeforeTransition || doBeforeTransition;
  if (typeof this.doBeforeTransition !== 'function') {
    console.log(this.strings.doBeforeTransitionInvalid ||
      'Error missing! doBeforeTransitionInvalid');
    return;
  }

  this.setNextState = args.setNextState || setNextState;
  if (typeof this.setNextState !== 'function') {
    console.log(this.strings.setNextStateInvalid ||
      'Error missing! setNextStateInvalid');
    return;
  }

  this.easing = args.easing || easing;
  if (typeof this.easing !== 'function') {
    console.log(this.strings.easingInvalid || 'Error missing! easingInvalid');
    return;
  }

  this.completeTransition = args.completeTransition || completeTransition;
  if (typeof this.completeTransition !== 'function') {
    console.log(this.strings.completeTransitionInvalid ||
      'Error missing! completeTransitionInvalid');
    return;
  }

  this.predicate = args.predicate;
  if (typeof this.predicate !== 'function') {
    console.log(this.strings.predicateInvalid ||
      'Error missing! predicateInvalid');
    return;
  }

  this.transitionableIsValid = args.transitionableIsValid ||
    transitionableIsValid;
  if (typeof this.transitionableIsValid !== 'function') {
    console.log(this.strings.transitionableIsValidInvalid ||
      'Error missing! transitionableIsValidInvalid');
    return;
  }

  this.getStates = args.getStates || getStates;
  if (typeof this.getStates !== 'function') {
    console.log(this.strings.getStatesInvalid ||
      'Error missing! getStatesInvalid');
    return;
  }

  this.getKeyframe = args.getKeyframe || getKeyframe;
  if (typeof this.getKeyframe !== 'function') {
    console.log(this.strings.getKeyframeInvalid ||
      'Error missing! getKeyframeInvalid');
    return;
  }

  this.transformToString = args.transformToString || transformToString;
  if (typeof this.transformToString !== 'function') {
    console.log(this.strings.transformToStringInvalid ||
      'Error missing! transformToStringInvalid');
    return;
  }

  this.transitionableIsExpired = args.transitionableIsExpired ||
    transitionableIsExpired;
  if (typeof this.transitionableIsExpired !== 'function') {
    console.log(this.strings.transitionableIsExpiredInvalid ||
      'Error missing! transitionableIsExpiredInvalid');
    return;
  }

  this.collectTransitionables = args.collectTransitionables ||
    collectTransitionables;
  if (typeof this.collectTransitionables !== 'function') {
    console.log(this.strings.collectTransitionablesInvalid ||
      'Error missing! collectTransitionablesInvalid');
    return;
  }

  this.removeFromTransitioning = args.removeFromTransitioning ||
    removeFromTransitioning;
  if (typeof this.removeFromTransitioning !== 'function') {
    console.log(this.strings.removeFromTransitioningInvalid ||
      'Error missing! removeFromTransitioningInvalid');
    return;
  }

  this.shuffle = args.shuffle || shuffle;
  if (typeof this.shuffle !== 'function') {
    console.log(this.strings.shuffleInvalid ||
      'Error missing! shuffleInvalid');
    return;
  }

  this.tryToDelegateToTransitionable = args.tryToDelegateToTransitionable ||
    tryToDelegateToTransitionable;
  if (typeof this.tryToDelegateToTransitionable !== 'function') {
    console.log(this.strings.tryToDelegateToTransitionableInvalid ||
      'Error missing! tryToDelegateToTransitionableInvalid');
    return;
  }

  /* Finally, initialize the supervisor. */
  this.init();
}

function Transitionable(configObj) {
  var config = configObj || {};
  var keys;
  var ii;

  this.strings = {
    getTransformedAttributeNameInvalid: 'getTransformedAttributeName was ' +
      'provided in the configObj, but it was not a function. Transitionable ' +
      'will not function.',

    hasAttributeInvalid: 'hasAttribute was provided in the configObj, but ' +
      'it was not a function. Transitionable will not function.',

    getAttributeInvalid: 'getAttribute was provided in the configObj, but ' +
      'it was not a function. Transitionable will not function.',

    setAttributeInvalid: 'setAttribute was provided in the configObj, but ' +
      'it was not a function. Transitionable will not function.',

    removeAttributeInvalid: 'removeAttribute was provided in the configObj, ' +
      'but it was not a function. Transitionable will not function.',
  };

  if (config.strings && typeof config.strings === 'object') {
    keys = Object.keys(config.strings || {});
    for (ii = 0; ii < keys.length; ii += 1) {
      this.strings[keys[ii]] = config.strings[keys[ii]];
    }
  }

  if (config.attributes && typeof config.attributes === 'object') {
    this.attributes = config.attributes;
  } else {
    this.attributes = {};
  }

  if (typeof config.predicate === 'function') {
    this.predicate = config.predicate;
  }

  function getTransformedAttributeName(name) {
    var transformed = name;
    var zz;
    var indexOne;
    var indexTwo;

    if (/^data/.test(transformed) && transformed.length > 4) {
      if (transformed[4] === '-') {
        indexOne = 4;
        while (transformed[indexOne] === '-') {
          indexOne += 1;
        }

        transformed = transformed.slice(indexOne);
      } else {
        transformed = transformed.slice(4);
      }
    }

    for (zz = 0; zz < transformed.length; zz += 1) {
      if (transformed[zz] === '-') {
        indexTwo = zz;
        while (transformed[indexTwo] === '-') {
          indexTwo += 1;
        }

        transformed = transformed.slice(0, zz) +
          transformed[indexTwo].toUpperCase() +
          transformed.slice(indexTwo + 1);
      }
    }

    return transformed;
  }

  function hasAttribute(key) {
    return this.getTransformedAttributeName(key) in this.attributes;
  }

  function getAttribute(key) {
    return this.attributes[this.getTransformedAttributeName(key)];
  }

  function setAttribute(key, value) {
    this.attributes[this.getTransformedAttributeName(key)] = value;
  }

  function removeAttribute(key) {
    delete this.attributes[this.getTransformedAttributeName(key)];
  }

  this.getTransformedAttributeName = config.getTransformedAttributeName ||
    getTransformedAttributeName;
  if (typeof this.getTransformedAttributeName !== 'function') {
    console.log(this.strings.getTransformedAttributeNameInvalid ||
      'Error missing! getTransformedAttributeNameInvalid');
    return;
  }

  this.hasAttribute = config.hasAttribute || hasAttribute;
  if (typeof this.hasAttribute !== 'function') {
    console.log(this.strings.hasAttributeInvalid ||
      'Error missing! hasAttributeInvalid');
    return;
  }

  this.getAttribute = config.getAttribute || getAttribute;
  if (typeof this.getAttribute !== 'function') {
    console.log(this.strings.getAttributeInvalid ||
      'Error missing! getAttributeInvalid');
    return;
  }

  this.setAttribute = config.setAttribute || setAttribute;
  if (typeof this.setAttribute !== 'function') {
    console.log(this.strings.setAttributeInvalid ||
      'Error missing! setAttributeInvalid');
    return;
  }

  this.removeAttribute = config.removeAttribute || removeAttribute;
  if (typeof this.removeAttribute !== 'function') {
    console.log(this.strings.removeAttributeInvalid ||
      'Error missing! removeAttributeInvalid');
    return; // eslint-disable-line
  }
}

/* istanbul ignore next */
if (typeof window === 'object') {
  // eslint-disable-next-line
  window.TransitionSupervisor = TransitionSupervisor;
  // eslint-disable-next-line
  window.Transitionable = Transitionable;
}

/* Export the module for node.js/ES5 requiring and ES6 importing. */
/* istanbul ignore else */
if (module && typeof module === 'object') {
  module.exports.Supervisor = TransitionSupervisor;
  module.exports.Transitionable = Transitionable;
}
