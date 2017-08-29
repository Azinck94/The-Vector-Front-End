"use strict";



define('The-Vector-Front-End/adapters/application', ['exports', 'The-Vector-Front-End/config/environment', 'active-model-adapter', 'ember'], function (exports, _TheVectorFrontEndConfigEnvironment, _activeModelAdapter, _ember) {
  exports['default'] = _activeModelAdapter['default'].extend({
    host: _TheVectorFrontEndConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),

    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('The-Vector-Front-End/adapters/info', ['exports', 'The-Vector-Front-End/adapters/application'], function (exports, _TheVectorFrontEndAdaptersApplication) {
  exports['default'] = _TheVectorFrontEndAdaptersApplication['default'].extend({
    createRecord: function createRecord(store, type, record) {
      var api = this.get('host');
      var serialized = this.serialize(record, { includeID: true });
      var customerId = serialized.customer_id;
      var url = api + '/customers/' + customerId + '/infos';
      var data = { info: serialized };
      return this.ajax(url, 'POST', { data: data });
    }
  });
});
define('The-Vector-Front-End/app', ['exports', 'ember', 'The-Vector-Front-End/resolver', 'ember-load-initializers', 'The-Vector-Front-End/config/environment'], function (exports, _ember, _TheVectorFrontEndResolver, _emberLoadInitializers, _TheVectorFrontEndConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _TheVectorFrontEndConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _TheVectorFrontEndConfigEnvironment['default'].podModulePrefix,
    Resolver: _TheVectorFrontEndResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _TheVectorFrontEndConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define("The-Vector-Front-End/components/-lf-get-outlet-state", ["exports", "liquid-fire/components/-lf-get-outlet-state"], function (exports, _liquidFireComponentsLfGetOutletState) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLfGetOutletState["default"];
    }
  });
});
define('The-Vector-Front-End/components/change-password-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    passwords: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('passwords'));
      },

      reset: function reset() {
        this.set('passwords', {});
      }
    }
  });
});
define('The-Vector-Front-End/components/create-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    show: false,
    newCustomer: {
      name: null,
      email: null,
      phone: null,
      hidden: false
    },
    actions: {
      createCustomer: function createCustomer() {
        this.sendAction('createCustomer', this.get('newCustomer'));
        this.set('newCustomer.name', null);
        this.set('newCustomer.phone', null);
        this.set('newCustomer.email', null);
      },
      pressed: function pressed() {
        this.toggleProperty('show');
      }
    }
  });
});
define('The-Vector-Front-End/components/customer-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['customer'],
    classNameBindings: ['customerDetailHidden'],
    customerDetailHidden: false,
    newInfo: {
      content: null,
      done: false
    },
    actions: {
      toggleInfoDone: function toggleInfoDone(info) {
        return this.sendAction('toggleInfoDone', info);
      },
      toggleCustomerDetail: function toggleCustomerDetail() {
        return this.toggleProperty('customerDetailHidden');
      },
      deleteInfo: function deleteInfo(info) {
        return this.sendAction('deleteInfo', info);
      },
      createInfo: function createInfo() {
        var info = this.get('newInfo');
        info.customer = this.get('customer');
        this.sendAction('createInfo', info);
        this.set('newInfo.content', null);
      }
    }
  });
});
define('The-Vector-Front-End/components/customer-list/card', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      deleteCustomer: function deleteCustomer() {
        return this.sendAction('deleteCustomer', this.get('customer'));
      }
    }
  });
});
define('The-Vector-Front-End/components/customer-list/customer-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    newCustomer: {
      title: null,
      hidden: false
    },
    actions: {
      createCustomer: function createCustomer() {
        this.sendAction('createCustomer', this.get('newCustomer'));
        this.set('newCustomer.title', null);
      }
    }
  });
});
define('The-Vector-Front-End/components/customer-list/info', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'li',
    classNameBindings: ['customerInfoCompleted'],
    customerInfoCompleted: _ember['default'].computed.alias('info.done'),
    actions: {
      toggleDone: function toggleDone() {
        return this.sendAction('toggleDone', this.get('info'));
      },
      deleteInfo: function deleteInfo() {
        return this.sendAction('deleteInfo', this.get('info'));
      }
    }
  });
});
define('The-Vector-Front-End/components/edit-customer-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      editCustomer: function editCustomer() {
        this.sendAction('editCustomer', this.get('customer'));
        // this.set('customer.name', null);
        // this.set('customer.phone', null);
        // this.set('customer.email', null);
      }
    }
  });
});
define('The-Vector-Front-End/components/edit-customer', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      editCustomer: function editCustomer() {
        this.sendAction('editCustomer', this.get('customer'));
      }
    }
  });
});
define('The-Vector-Front-End/components/edit-example', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      editExample: function editExample() {
        this.sendAction('editExample', this.get('example'));
      }
    }
  });
});
define('The-Vector-Front-End/components/email-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('The-Vector-Front-End/components/example-list/card', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      deleteExample: function deleteExample() {
        return this.sendAction('deleteExample', this.get('example'));
      }
    }
  });
});
define('The-Vector-Front-End/components/flash-message', ['exports', 'ember-cli-flash/components/flash-message'], function (exports, _emberCliFlashComponentsFlashMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashComponentsFlashMessage['default'];
    }
  });
});
define('The-Vector-Front-End/components/hamburger-menu', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',
    classNames: ['navbar-toggle', 'collapsed'],
    attributeBindings: ['toggle:data-toggle', 'target:data-target', 'expanded:aria-expanded'],
    toggle: 'collapse',
    target: '#navigation',
    expanded: false
  });
});
define("The-Vector-Front-End/components/illiquid-model", ["exports", "liquid-fire/components/illiquid-model"], function (exports, _liquidFireComponentsIlliquidModel) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsIlliquidModel["default"];
    }
  });
});
define('The-Vector-Front-End/components/important-notes/card', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define("The-Vector-Front-End/components/liquid-bind", ["exports", "liquid-fire/components/liquid-bind"], function (exports, _liquidFireComponentsLiquidBind) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidBind["default"];
    }
  });
});
define("The-Vector-Front-End/components/liquid-child", ["exports", "liquid-fire/components/liquid-child"], function (exports, _liquidFireComponentsLiquidChild) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidChild["default"];
    }
  });
});
define("The-Vector-Front-End/components/liquid-container", ["exports", "liquid-fire/components/liquid-container"], function (exports, _liquidFireComponentsLiquidContainer) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidContainer["default"];
    }
  });
});
define("The-Vector-Front-End/components/liquid-if", ["exports", "liquid-fire/components/liquid-if"], function (exports, _liquidFireComponentsLiquidIf) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidIf["default"];
    }
  });
});
define("The-Vector-Front-End/components/liquid-measured", ["exports", "liquid-fire/components/liquid-measured"], function (exports, _liquidFireComponentsLiquidMeasured) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured["default"];
    }
  });
  Object.defineProperty(exports, "measure", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured.measure;
    }
  });
});
define("The-Vector-Front-End/components/liquid-outlet", ["exports", "liquid-fire/components/liquid-outlet"], function (exports, _liquidFireComponentsLiquidOutlet) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidOutlet["default"];
    }
  });
});
define("The-Vector-Front-End/components/liquid-spacer", ["exports", "liquid-fire/components/liquid-spacer"], function (exports, _liquidFireComponentsLiquidSpacer) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidSpacer["default"];
    }
  });
});
define('The-Vector-Front-End/components/liquid-sync', ['exports', 'liquid-fire/components/liquid-sync'], function (exports, _liquidFireComponentsLiquidSync) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidSync['default'];
    }
  });
});
define("The-Vector-Front-End/components/liquid-unless", ["exports", "liquid-fire/components/liquid-unless"], function (exports, _liquidFireComponentsLiquidUnless) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidUnless["default"];
    }
  });
});
define("The-Vector-Front-End/components/liquid-versions", ["exports", "liquid-fire/components/liquid-versions"], function (exports, _liquidFireComponentsLiquidVersions) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidVersions["default"];
    }
  });
});
define('The-Vector-Front-End/components/my-application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),
    show: false,
    actions: {
      signOut: function signOut() {
        this.sendAction('signOut');
      }
    }
  });
});
define('The-Vector-Front-End/components/navbar-header', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['navbar-header']
  });
});
define('The-Vector-Front-End/components/password-confirmation-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('The-Vector-Front-End/components/password-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('The-Vector-Front-End/components/sign-in-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('The-Vector-Front-End/components/sign-up-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    credentials: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('The-Vector-Front-End/components/transition-group', ['exports', 'ember-css-transitions/components/transition-group'], function (exports, _emberCssTransitionsComponentsTransitionGroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCssTransitionsComponentsTransitionGroup['default'];
    }
  });
});
define('The-Vector-Front-End/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('The-Vector-Front-End/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('The-Vector-Front-End/flash/object', ['exports', 'ember-cli-flash/flash/object'], function (exports, _emberCliFlashFlashObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashFlashObject['default'];
    }
  });
});
define('The-Vector-Front-End/helpers/app-version', ['exports', 'ember', 'The-Vector-Front-End/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _TheVectorFrontEndConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _TheVectorFrontEndConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('The-Vector-Front-End/helpers/lf-lock-model', ['exports', 'liquid-fire/helpers/lf-lock-model'], function (exports, _liquidFireHelpersLfLockModel) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfLockModel['default'];
    }
  });
  Object.defineProperty(exports, 'lfLockModel', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfLockModel.lfLockModel;
    }
  });
});
define('The-Vector-Front-End/helpers/lf-or', ['exports', 'liquid-fire/helpers/lf-or'], function (exports, _liquidFireHelpersLfOr) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfOr['default'];
    }
  });
  Object.defineProperty(exports, 'lfOr', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfOr.lfOr;
    }
  });
});
define('The-Vector-Front-End/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('The-Vector-Front-End/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define("The-Vector-Front-End/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('The-Vector-Front-End/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'The-Vector-Front-End/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _TheVectorFrontEndConfigEnvironment) {
  var _config$APP = _TheVectorFrontEndConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('The-Vector-Front-End/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('The-Vector-Front-End/initializers/data-adapter', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('The-Vector-Front-End/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _emberDataSetupContainer, _emberData) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('The-Vector-Front-End/initializers/export-application-global', ['exports', 'ember', 'The-Vector-Front-End/config/environment'], function (exports, _ember, _TheVectorFrontEndConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_TheVectorFrontEndConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _TheVectorFrontEndConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_TheVectorFrontEndConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('The-Vector-Front-End/initializers/flash-messages', ['exports', 'ember', 'The-Vector-Front-End/config/environment'], function (exports, _ember, _TheVectorFrontEndConfigEnvironment) {
  exports.initialize = initialize;
  var deprecate = _ember['default'].deprecate;

  var merge = _ember['default'].assign || _ember['default'].merge;
  var INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';
  var addonDefaults = {
    timeout: 3000,
    extendedTimeout: 0,
    priority: 100,
    sticky: false,
    showProgress: false,
    type: 'info',
    types: ['success', 'info', 'warning', 'danger', 'alert', 'secondary'],
    injectionFactories: ['route', 'controller', 'view', 'component'],
    preventDuplicates: false
  };

  function initialize() {
    var application = arguments[1] || arguments[0];

    var _ref = _TheVectorFrontEndConfigEnvironment['default'] || {};

    var flashMessageDefaults = _ref.flashMessageDefaults;

    var _ref2 = flashMessageDefaults || [];

    var injectionFactories = _ref2.injectionFactories;

    var options = merge(addonDefaults, flashMessageDefaults);
    var shouldShowDeprecation = !(injectionFactories && injectionFactories.length);

    application.register('config:flash-messages', options, { instantiate: false });
    application.inject('service:flash-messages', 'flashMessageDefaults', 'config:flash-messages');

    deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, shouldShowDeprecation, {
      id: 'ember-cli-flash.deprecate-injection-factories',
      until: '2.0.0'
    });

    options.injectionFactories.forEach(function (factory) {
      application.inject(factory, 'flashMessages', 'service:flash-messages');
    });
  }

  exports['default'] = {
    name: 'flash-messages',
    initialize: initialize
  };
});
define('The-Vector-Front-End/initializers/injectStore', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("The-Vector-Front-End/initializers/liquid-fire", ["exports", "liquid-fire/ember-internals"], function (exports, _liquidFireEmberInternals) {

  (0, _liquidFireEmberInternals.initialize)();

  exports["default"] = {
    name: 'liquid-fire',
    initialize: function initialize() {}
  };
});
define('The-Vector-Front-End/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('The-Vector-Front-End/initializers/store', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('The-Vector-Front-End/initializers/text-field', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;

  function initialize() {
    _ember['default'].TextField.reopen({
      classNames: ['form-control']
    });
  }

  exports['default'] = {
    name: 'text-field',
    initialize: initialize
  };
});
define('The-Vector-Front-End/initializers/transforms', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("The-Vector-Front-End/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _emberDataInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataInstanceInitializersInitializeStoreService["default"]
  };
});
define('The-Vector-Front-End/mixins/transition-mixin', ['exports', 'ember-css-transitions/mixins/transition-mixin'], function (exports, _emberCssTransitionsMixinsTransitionMixin) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCssTransitionsMixinsTransitionMixin['default'];
    }
  });
});
define('The-Vector-Front-End/models/customer', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    phone: _emberData['default'].attr('string'),
    email: _emberData['default'].attr('string')
  });
});
// infos: DS.hasMany('info'),
define('The-Vector-Front-End/models/example', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    text: _emberData['default'].attr('string')
  });
});
define('The-Vector-Front-End/models/info', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    content: _emberData['default'].attr('string'),
    done: _emberData['default'].attr('boolean'),
    customer: _emberData['default'].belongsTo('customer')
  });
});
define('The-Vector-Front-End/models/note', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    content: _emberData['default'].attr('string'),
    done: _emberData['default'].attr('boolean'),
    customer: _emberData['default'].belongsTo('customer')
  });
});
define('The-Vector-Front-End/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string')
  });
});
define('The-Vector-Front-End/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('The-Vector-Front-End/router', ['exports', 'ember', 'The-Vector-Front-End/config/environment'], function (exports, _ember, _TheVectorFrontEndConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _TheVectorFrontEndConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users');
    this.route('customers');
    this.route('customer', { path: '/customers/:customer_id' });
    this.route('new');
    this.route('new');
    this.route('edit', { path: '/customers/:customer_id/edit' });
    this.route('examples');
    this.route('example', { path: '/examples/:example_id' });
  });

  exports['default'] = Router;
});
define('The-Vector-Front-End/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signOut: function signOut() {
        var _this = this;

        this.get('auth').signOut().then(function () {
          return _this.get('store').unloadAll();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Are you sure you\'re signed-in?');
        });
      },

      error: function error(reason) {
        var unauthorized = reason.errors && reason.errors.some(function (error) {
          return error.status === '401';
        });

        if (unauthorized) {
          this.get('flashMessages').danger('You must be authenticated to access this page.');
          this.transitionTo('/sign-in');
        } else {
          this.get('flashMessages').danger('There was a problem. Please try again.');
        }

        return false;
      }
    }
  });
});
define('The-Vector-Front-End/routes/change-password', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      changePassword: function changePassword(passwords) {
        var _this = this;

        this.get('auth').changePassword(passwords).then(function () {
          return _this.get('auth').signOut();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').success('Successfully changed your password!');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please enter correct password.');
        });
      }
    }
  });
});
define('The-Vector-Front-End/routes/customer', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('customer', params.customer_id);
    }
  });

  //   actions: {
  //    toggleInfoDone (info) {
  //       info.toggleProperty('done');
  //       info.save();
  //     },
  //     deleteInfo (info) {
  //       info.destroyRecord();
  //     },
  //     createInfo (info) {
  //       let infoRecord = this.get('store').createRecord('info', info);
  //       infoRecord.save();
  //      }
  //   },
  // });
});
define('The-Vector-Front-End/routes/customers', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    flashMessages: _ember['default'].inject.service(),

    model: function model() {
      return this.get('store').findAll('customer');
    },
    actions: {
      createCustomer: function createCustomer(customer) {
        var _this = this;

        var newCustomer = this.get('store').createRecord('customer', customer);
        newCustomer.save().then(function () {
          _this.get('flashMessages').warning('Customer Added');
        });
      },
      deleteCustomer: function deleteCustomer(customer) {
        var _this2 = this;

        customer.destroyRecord().then(function () {
          _this2.get('flashMessages').warning('Customer Deleted');
        })['catch'](function () {
          _this2.get('flashMessages').danger('You dont have permission to delete this customer');
        });
      }
    }
  });
});
define('The-Vector-Front-End/routes/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({

    model: function model(params) {
      return this.get('store').findRecord('customer', params.customer_id);
    },
    actions: {
      editCustomer: function editCustomer(customer) {
        var _this = this;

        customer.save().then(function () {
          _this.get('flashMessages').warning('Customer Edited');
        })['catch'](function () {
          _this.get('flashMessages').danger('You dont have permission to edit this customer');
        });
        // this.transitionTo('customers');
      }
    }
  });
});
define('The-Vector-Front-End/routes/example', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('example', params.example_id);
    }
  });
});
define('The-Vector-Front-End/routes/examples', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('example');
    },
    actions: {
      createExample: function createExample(example) {
        var newExample = this.get('store').createRecord('example', example);
        newExample.save();
      },
      deleteExample: function deleteExample(example) {
        example.destroyRecord();
      }
    }
  });
});
define('The-Vector-Front-End/routes/sign-in', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    model: function model() {
      return _rsvp['default'].Promise.resolve({});
    },

    actions: {
      signIn: function signIn(credentials) {
        var _this = this;

        return this.get('auth').signIn(credentials).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          return _this.get('flashMessages').success('Thanks for signing in!');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('The-Vector-Front-End/routes/sign-up', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signUp: function signUp(credentials) {
        var _this = this;

        this.get('auth').signUp(credentials).then(function () {
          return _this.get('auth').signIn(credentials);
        }).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          _this.get('flashMessages').success('Successfully signed-up! You have also been signed-in.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('The-Vector-Front-End/routes/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('user');
    }
  });
});
define('The-Vector-Front-End/serializers/application', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  exports['default'] = _activeModelAdapter.ActiveModelSerializer.extend({});
});
define('The-Vector-Front-End/services/ajax', ['exports', 'ember', 'ember-ajax/services/ajax', 'The-Vector-Front-End/config/environment'], function (exports, _ember, _emberAjaxServicesAjax, _TheVectorFrontEndConfigEnvironment) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    host: _TheVectorFrontEndConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),
    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('The-Vector-Front-End/services/auth', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    signUp: function signUp(credentials) {
      return this.get('ajax').post('/sign-up', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation
          }
        }
      });
    },

    signIn: function signIn(credentials) {
      var _this = this;

      return this.get('ajax').post('/sign-in', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password
          }
        }
      }).then(function (result) {
        _this.get('credentials').set('id', result.user.id);
        _this.get('credentials').set('email', result.user.email);
        _this.get('credentials').set('token', result.user.token);
      });
    },

    changePassword: function changePassword(passwords) {
      return this.get('ajax').patch('/change-password/' + this.get('credentials.id'), {
        data: {
          passwords: {
            old: passwords.previous,
            'new': passwords.next
          }
        }
      });
    },

    signOut: function signOut() {
      var _this2 = this;

      return this.get('ajax').del('/sign-out/' + this.get('credentials.id'))['finally'](function () {
        return _this2.get('credentials').reset();
      });
    }
  });
});
define('The-Vector-Front-End/services/flash-messages', ['exports', 'ember-cli-flash/services/flash-messages'], function (exports, _emberCliFlashServicesFlashMessages) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashServicesFlashMessages['default'];
    }
  });
});
define("The-Vector-Front-End/services/liquid-fire-transitions", ["exports", "liquid-fire/transition-map"], function (exports, _liquidFireTransitionMap) {
  exports["default"] = _liquidFireTransitionMap["default"];
});
define('The-Vector-Front-End/storages/auth', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {
  exports['default'] = _emberLocalStorageLocalObject['default'].extend({});
});
define("The-Vector-Front-End/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cwTCxqu3", "block": "{\"statements\":[[\"append\",[\"helper\",[\"my-application\"],null,[[\"signOut\"],[\"signOut\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/application.hbs" } });
});
define("The-Vector-Front-End/templates/change-password", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "RqzXGlQ6", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Change Password\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"change-password-form\"],null,[[\"submit\"],[\"changePassword\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/change-password.hbs" } });
});
define("The-Vector-Front-End/templates/components/change-password-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "qu2IaC0R", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-title\"],[\"flush-element\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Change Password\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-title\"],[\"flush-element\"],[\"text\",\"Old Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-field\",\"previous\",\"Old password\",[\"get\",[\"passwords\",\"previous\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-title\"],[\"flush-element\"],[\"text\",\"New Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-field\",\"next\",\"New password\",[\"get\",[\"passwords\",\"next\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"submit-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Change Password\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"submit-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/change-password-form.hbs" } });
});
define("The-Vector-Front-End/templates/components/create-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "y11L6/qm", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"button\"],[\"static-attr\",\"type\",\"submit\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"pressed\"]],[\"flush-element\"],[\"text\",\"Add New Customer\"],[\"close-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"show\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-container\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createCustomer\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-title\"],[\"flush-element\"],[\"text\",\"Name\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\"],[\"John Doe Inc.\",[\"get\",[\"newCustomer\",\"name\"]]]]],false],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-title\"],[\"flush-element\"],[\"text\",\"Phone\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\"],[\"New Customer Phone\",[\"get\",[\"newCustomer\",\"phone\"]]]]],false],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-title\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\"],[\"New Customer Email\",[\"get\",[\"newCustomer\",\"email\"]]]]],false],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"submit-container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"submit-button\"],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"value\",\"Submit\"],[\"flush-element\"],[\"text\",\"Save\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/create-form.hbs" } });
});
define("The-Vector-Front-End/templates/components/customer-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "+0xCP6bS", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"customer-header\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"toggleListDetail\"]],[\"flush-element\"],[\"append\",[\"unknown\",[\"customer\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createInfo\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n   \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\"],[\"New Info\",[\"get\",[\"newItem\",\"content\"]]]]],false],[\"text\",\"\\n \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"customer\",\"infos\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"customer-customer/info\"],null,[[\"info\",\"toggleItemDone\",\"deleteInfo\"],[[\"get\",[\"info\"]],\"toggleInfoDone\",\"deleteInfo\"]]],false],[\"text\",\"\\n\"]],\"locals\":[\"info\"]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/customer-list.hbs" } });
});
define("The-Vector-Front-End/templates/components/customer-list/card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "O489vzxm", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"box\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"box-block\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"customer\",[\"get\",[\"customer\"]]],null,1],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"deletebutton\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteCustomer\"]],[\"flush-element\"],[\"text\",\"Delete Customer\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"link-to\"],[\"edit\",[\"get\",[\"customer\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"button\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Edit Customer\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"nameplate\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"customer\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/customer-list/card.hbs" } });
});
define("The-Vector-Front-End/templates/components/customer-list/info", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "WYTHb/hB", "block": "{\"statements\":[[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"list-info\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"toggleDone\"]],[\"flush-element\"],[\"append\",[\"unknown\",[\"info\",\"content\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"deletebtn\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteInfo\"]],[\"flush-element\"],[\"text\",\"⛔\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/customer-list/info.hbs" } });
});
define("The-Vector-Front-End/templates/components/edit-customer-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "0h6kSFiC", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-title\"],[\"flush-element\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Change Password\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-container\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editCustomer\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\"],[\"New Customer Name\",[\"get\",[\"customer\",\"name\"]]]]],false],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\"],[\"New Customer Phone\",[\"get\",[\"customer\",\"phone\"]]]]],false],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\"],[\"New Customer Email\",[\"get\",[\"customer\",\"email\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Save\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"customers\"],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"button\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\" Return To Customer List\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/edit-customer-form.hbs" } });
});
define("The-Vector-Front-End/templates/components/edit-example", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "mIjLgsos", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Edit an Example Name\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editExample\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"value\"],[\"New Example Name\",[\"get\",[\"example\",\"text\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Save\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"link-to\"],[\"examples\"],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\" Back \"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/edit-example.hbs" } });
});
define("The-Vector-Front-End/templates/components/email-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "8GgfMX+W", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"email\",\"email\",\"Email\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/email-input.hbs" } });
});
define("The-Vector-Front-End/templates/components/example-list/card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "krLp3Jxh", "block": "{\"statements\":[[\"block\",[\"link-to\"],[\"example\",[\"get\",[\"example\"]]],null,1],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-danger btn-sm\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteExample\"]],[\"flush-element\"],[\"text\",\"Delete Example\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"link-to\"],[\"edit\",[\"get\",[\"example\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"button\",[]],[\"flush-element\"],[\"text\",\" Edit Example Name\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"example\",\"text\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/example-list/card.hbs" } });
});
define("The-Vector-Front-End/templates/components/hamburger-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "GO5lTdDx", "block": "{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/hamburger-menu.hbs" } });
});
define("The-Vector-Front-End/templates/components/my-application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Te9PvzJj", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,8],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"static-attr\",\"id\",\"subNavigation\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,6,3],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"ribbon\"],[\"flush-element\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"ribbon-stitches-top\"],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"strong\",[]],[\"static-attr\",\"class\",\"ribbon-content\"],[\"flush-element\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Client Vector\"],[\"close-element\"],[\"close-element\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"ribbon-stitches-bottom\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Sign Up\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"sign-up\"],[[\"tagName\"],[\"li\"]],2],[\"text\",\"\\n        \"],[\"block\",[\"link-to\"],[\"sign-in\"],[[\"tagName\"],[\"li\"]],1],[\"text\",\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"text\",\"Customers\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"block\",[\"link-to\"],[\"customers\"],[[\"tagName\"],[\"li\"]],5],[\"text\",\"\\n\"],[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,4],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Users\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"users\"],null,7],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/my-application.hbs" } });
});
define("The-Vector-Front-End/templates/components/navbar-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "GFXCwilW", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hamburger-menu\"]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"application\"],[[\"class\"],[\"navbar-brand\"]],0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Home\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/navbar-header.hbs" } });
});
define("The-Vector-Front-End/templates/components/password-confirmation-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "A8KwY4Yo", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password-confirmation\"],[\"flush-element\"],[\"text\",\"Password Confirmation\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password-confirmation\",\"Password Confirmation\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/password-confirmation-input.hbs" } });
});
define("The-Vector-Front-End/templates/components/password-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "OY+9e8Kv", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"kind\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password\",\"Password\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/password-input.hbs" } });
});
define("The-Vector-Front-End/templates/components/sign-in-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZVZ1l/JG", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"email-input\"],null,[[\"class\",\"email\"],[\"form-field\",[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"class\",\"password\"],[\"form-field\",[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"submit-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign In\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"submit-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/sign-in-form.hbs" } });
});
define("The-Vector-Front-End/templates/components/sign-up-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "w7vwEa0a", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"email-input\"],null,[[\"class\",\"email\"],[\"form-field\",[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"class\",\"password\"],[\"form-field\",[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-confirmation-input\"],null,[[\"class\",\"password\"],[\"form-field\",[\"get\",[\"credentials\",\"passwordConfirmation\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"submit-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign Up\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"submit-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/sign-up-form.hbs" } });
});
define("The-Vector-Front-End/templates/components/transition-group", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZyjF1QJH", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/components/transition-group.hbs" } });
});
define("The-Vector-Front-End/templates/customer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "foLKrgh6", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"card\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"card-block\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\" Name: \"],[\"append\",[\"unknown\",[\"model\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\" Phone Number: \"],[\"append\",[\"unknown\",[\"model\",\"phone\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\" Email Address: \"],[\"append\",[\"unknown\",[\"model\",\"email\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"customers\"],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"static-attr\",\"class\",\"button\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\" Return To Customer List\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/customer.hbs" } });
});
define("The-Vector-Front-End/templates/customers", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DvbleOTO", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"create-form\"],null,[[\"customer\",\"createCustomer\"],[[\"get\",[\"customer\"]],\"createCustomer\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Customers:\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"customer-list/card\"],null,[[\"customer\",\"deleteCustomer\"],[[\"get\",[\"customer\"]],\"deleteCustomer\"]]],false],[\"text\",\"\\n\"]],\"locals\":[\"customer\"]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/customers.hbs" } });
});
define("The-Vector-Front-End/templates/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "tNyLkeL4", "block": "{\"statements\":[[\"append\",[\"helper\",[\"edit-customer-form\"],null,[[\"customer\",\"editCustomer\"],[[\"get\",[\"model\"]],\"editCustomer\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/edit.hbs" } });
});
define("The-Vector-Front-End/templates/example", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "xVTSsHB0", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"text\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"examples\"],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\" go back \"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/example.hbs" } });
});
define("The-Vector-Front-End/templates/examples", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "kEk8RgWB", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Examples\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"create-form\"],null,[[\"example\",\"createExample\"],[[\"get\",[\"example\"]],\"createExample\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"example-list/card\"],null,[[\"example\",\"deleteExample\"],[[\"get\",[\"example\"]],\"deleteExample\"]]],false],[\"text\",\"\\n\"]],\"locals\":[\"example\"]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/examples.hbs" } });
});
define("The-Vector-Front-End/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "t3csrnoN", "block": "{\"statements\":[[\"open-element\",\"h6\",[]],[\"flush-element\"],[\"text\",\"Andrew Zinck\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/index.hbs" } });
});
define("The-Vector-Front-End/templates/sign-in", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Fw2V/XWb", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"sign-in-form\"],null,[[\"submit\",\"reset\",\"credentials\"],[\"signIn\",\"reset\",[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/sign-in.hbs" } });
});
define("The-Vector-Front-End/templates/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "jHQ42BXC", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"static-attr\",\"use\",\"crossFade\"],[\"flush-element\"],[\"text\",\"Sign Up\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"sign-up-form\"],null,[[\"submit\"],[\"signUp\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/sign-up.hbs" } });
});
define("The-Vector-Front-End/templates/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "uCpR6wgn", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Users\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"user\"]}],\"hasPartials\":false}", "meta": { "moduleName": "The-Vector-Front-End/templates/users.hbs" } });
});
define("The-Vector-Front-End/transitions", ["exports"], function (exports) {});
// export default function(){
//   // this.transition(
//   // this.toRoute('sign-up'),
//   // this.use('crossFade')
//   //   );
//   // this.transition(
//   // this.toRoute('sign-in'),
//   // this.use('crossFade')
//   //   );
//   // this.transition(
//   // this.toRoute('examples'),
//   // this.use('crossFade'),
//   // this.debug()
//     );
define('The-Vector-Front-End/transitions/cross-fade', ['exports', 'liquid-fire/transitions/cross-fade'], function (exports, _liquidFireTransitionsCrossFade) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsCrossFade['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/default', ['exports', 'liquid-fire/transitions/default'], function (exports, _liquidFireTransitionsDefault) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsDefault['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/explode', ['exports', 'liquid-fire/transitions/explode'], function (exports, _liquidFireTransitionsExplode) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsExplode['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/fade', ['exports', 'liquid-fire/transitions/fade'], function (exports, _liquidFireTransitionsFade) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFade['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/flex-grow', ['exports', 'liquid-fire/transitions/flex-grow'], function (exports, _liquidFireTransitionsFlexGrow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFlexGrow['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/fly-to', ['exports', 'liquid-fire/transitions/fly-to'], function (exports, _liquidFireTransitionsFlyTo) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFlyTo['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/move-over', ['exports', 'liquid-fire/transitions/move-over'], function (exports, _liquidFireTransitionsMoveOver) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsMoveOver['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/scale', ['exports', 'liquid-fire/transitions/scale'], function (exports, _liquidFireTransitionsScale) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsScale['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/scroll-then', ['exports', 'liquid-fire/transitions/scroll-then'], function (exports, _liquidFireTransitionsScrollThen) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsScrollThen['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/to-down', ['exports', 'liquid-fire/transitions/to-down'], function (exports, _liquidFireTransitionsToDown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToDown['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/to-left', ['exports', 'liquid-fire/transitions/to-left'], function (exports, _liquidFireTransitionsToLeft) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToLeft['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/to-right', ['exports', 'liquid-fire/transitions/to-right'], function (exports, _liquidFireTransitionsToRight) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToRight['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/to-up', ['exports', 'liquid-fire/transitions/to-up'], function (exports, _liquidFireTransitionsToUp) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToUp['default'];
    }
  });
});
define('The-Vector-Front-End/transitions/wait', ['exports', 'liquid-fire/transitions/wait'], function (exports, _liquidFireTransitionsWait) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsWait['default'];
    }
  });
});


define('The-Vector-Front-End/config/environment', ['ember'], function(Ember) {
  var prefix = 'The-Vector-Front-End';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("The-Vector-Front-End/app")["default"].create({"name":"The-Vector-Front-End","version":"0.0.0+de55c149"});
}
//# sourceMappingURL=The-Vector-Front-End.map
