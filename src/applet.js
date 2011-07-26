/**
 * Example:
 * --------
 *
 * var Jitsi.UA = Jitsi.Connection.extend({appletAdapter: adapter});
 *
 * Jitsi.UA.Register.registerHandler('onRegistered', function(regEvent){});
 * Jitsi.UA.Register.registerHandler('onRegistering',function(regEvent){});
 *
 * Jitsi.UA.Call.registerHandler('onCallCreated', function(callEvent){});
 * Jitsi.UA.Call.create('sip:1732222');
 *
 *
 * Applet <=> DOM bridge
 */

Jitsi.Applet = Jitsi.Base.extend(
{
  /**
   *  the id of the applet DOM element
   */
  appletID: null,

  globalEventReceiveFunctionName: 'receiveJitsiEvent',

  _handlers: {},

  init: Jitsi.Function.around(
    function($super) {
      this._handlers = {};
      if (Jitsi.isFunction($super)) {
        $super.apply(this, Array.from(arguments).slice(-1));        
      }
      if (this.appletID && this.globalEventReceiveFunctionName) {
        window[this.globalEventReceiveFunctionName] = this.receiveEvent;
        this.load(this);
      }
    }
  ),

  /**
   * applet => javascript
   *
   * Fire the event in _handlers.
   * The target of the event exists in Jitsi.Connection
   */
  receiveEvent: function(rawEvent) {
    throw new Error("Must Implement");
  },

  /**
   * javascript => applet
   *
   * Fires the event into the applet
   */
  sendEvent: function(rawEvent) {
    throw new Error("Must Implement");
  },

  registerHandler: function(event, handler) {
    this.unregisterHandler(event);
    this._handlers[event] = handler;
  },

  unregisterHandler: function(event) {
    if (this._handlers[event]) {
      delete this._handlers[event];
    }
  },

  load: function(template) {
    var id = template.appletID,
      eventSink = template.globalEventReceiveFunctionName;

    var app = navigator.appName, embed_applet;

    // TODO: fix browser detection
    if (app == 'Microsoft Internet Explorer') {
      embed_applet = '' +
        '<object classid="clsid:E19F9331-3110-11d4-991C-005004D3B3DB" ' +
        '  width="5" height="5" name="' + id + '" id="' + id + '"' +
        '  codebase="http://java.sun.com/update/1.6.0/jinstall-6u25-windows-i586.cab/#Version=1,6,0,25"> ' +
        '<param name=code value=com.onsip.felix.AppletLauncher.class>' +
        '<param name=archive value="GraphicalUAApp.jar">' +
        '<param name=name value="' + id + '">' +
        '<param name="MAYSCRIPT" value="true">' +
        '<param name="type" VALUE="application/x-java-applet">' +
        '<param name="scriptable" VALUE="true">' +
        '<comment>' +
        '  <embed type="application/x-java-applet;jpi-version=1.6.0_24" mayscript ' +
        '    code=com.onsip.felix.AppletLauncher.class archive="GraphicalUAApp.jar" ' +
        '    name="apua" width="5" height="5"> ' +
        '    <param name="mayscript" value="mayscript" />' +
        '    <param name="type" value="application/x-java-applet" />' +
        '    <param name="scriptable" value="true" />' +
        '  </embed>' +
        '</comment>' +
        '</object>';
    } else {
      embed_applet = '' +
        '<embed type="application/x-java-applet" mayscript ' +
        '    code=com.onsip.felix.AppletLauncher.class ' +
        '    archive="GraphicalUAApp.jar" name="' + id + '"' +
        '    id="' + id + '" width="5" height="5"> ' +
        '  <param name="mayscript" value="mayscript" />' +
        '  <param name="type" value="application/x-java-applet" />' +
        '  <param name="scriptable" value="true" />' +
        '  <param name="classloader_cache" value="false" />' +
        '  <param name="codebase_lookup" value="false" />' +
        '</embed>';
    }

    var body = document.body;

  }
});


/**
 *
 * Example:
 *
 * var adapter = Jitsi.Applet.extend({
 *
 *    // applet -> javascript
 *    receiveEvent: function(rawEvent) {
 *      // call the registered handler
 *    },
 *
 *    // javascript -> applet
 *    sendEvent: function(rawEvent) {
 *       //applet.api();
 *    },
 *
 *    registerHandler: function(event, handler) {},
 *
 *    unRegisterHandler: function(event) {}
 *
 * });
 *
 *
 * var Jitsi.UA = Jitsi.Connection.extend({appletAdapter: adapter});
 *
 * Jitsi.UA.Register.registerHandler('onRegistered', function(regEvent){});
 * Jitsi.UA.Register.registerHandler('onRegistering',function(regEvent){});
 *
 * Jitsi.UA.Call.registerHandler('onCallCreated', function(callEvent){});
 * Jitsi.UA.Call.create('sip:1732222');
 *
 */

/**
Jitsi.AppletAdapter = Jitsi.Applet.extend({
    _handlers: {},

   init: Jitsi.Function.around(
     function($super) {
       this._handlers = {};
       if (Jitsi.isFunction($super)) {
         $super.apply(this, Array.from(arguments).slice(1));
       }
     }
   ),

   receiveEvent: function(rawEvent) {
     throw new Error("Must Implement");
   },

   sendEvent: function(rawEvent) {
     throw new Error("Must Implement");
   },

   registerHandler: function(event, handler) {
     this.unregisterHandler(event);
     this._handlers[event] = handler;
   },

   unregisterHandler: function(event) {
     if (this._handlers[event]) {
       delete this._handlers[event];
     }
   }
});
**/