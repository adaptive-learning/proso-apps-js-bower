/*
 * proso-apps-js
 * Version: 1.0.0 - 2015-05-27
 * License: MIT
 */
angular.module("proso.apps", ["proso.apps.common-config","proso.apps.common-logging","proso.apps.gettext","proso.apps.flashcards-practice","proso.apps.flashcards-userStats","proso.apps.user-user", "proso.apps.common-toolbar"])
angular.module("proso.apps.tpls", ["templates/common-toolbar/toolbar.html"]);
angular.module("proso.apps.gettext", [])
.value("gettext", window.gettext || function(x){return x;})
.filter("trans", ["gettext", function(gettext) {
    return function(msgid) {
        return gettext(msgid);
    };
}]);
var configServiceLoaded;
if (configServiceLoaded){
    throw "ConfigService already loaded";
}
configServiceLoaded = true;

function obj2get(obj, prefix, ignore_prefix_keys){
    var str = "";
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (str !== "") {
                str += "&";
            }
            if (ignore_prefix_keys.indexOf(key) === -1){
                str += prefix;
            }
            str += key + "=" + encodeURIComponent(obj[key]);
        }
    }
    return str;
}

var m = angular.module('proso.apps.common-config', ['ngCookies']);

m.factory("configService", ["$http", "$window", "$cookieStore", function($http, $window, $cookieStore){
    if (!!$window.configService){
        return $window.configService;
    }

    var self = this;
    var config = null;

    self.getConfig = function (appName, key, defaultValue) {
        var variable = null;
        if (typeof overridden[appName + "." + key] !== 'undefined') {
            variable = overridden[appName + "." + key];
            if (self.isDebug()) {
                console.log(appName + "." + key, "overridden", variable);
            }
            return variable;
        }

        if (config === null) {
            console.error("Config not loaded");
            return;
        }

        variable = config[appName];
        var path = key.split(".");
        for (var i = 0; i < path.length; i++) {
            if (typeof variable === 'undefined') {
                if (self.isDebug()) {
                    console.log(appName + "." + key, "use default", defaultValue);
                }
                return defaultValue;
            }
            variable = variable[path[i]];
        }
        if (typeof variable === 'undefined') {
            if (self.isDebug()) {
                console.log(appName + "." + key, "use default", defaultValue);
            }
            return defaultValue;
        }
        if (self.isDebug()) {
            console.log(appName + "." + key, "from config", variable);
        }
        return variable;
    };

    self.isDebug = function() {
        return overridden.debug === true;
    };

    self.loadConfig = function () {
        return $http.get("/common/config/")
            .success(function (response) {
                self.processConfig(response.data);
            })
            .error(function () {
                console.error("Problem while loading config from server");
            });
    };

    self.processConfig = function (data) {
        config = angular.copy(data);
    };

    self.override = function (key, value) {
        if (value === 'true') {
            value = true;
        } else if (value === 'false') {
            value = false;
        } else if ($.isNumeric(value)) {
            value = parseFloat(value);
        }
        overridden[key] = value;
        $cookieStore.put("configService:overridden", overridden);
    };

    self.removeOverridden = function (key) {
        delete overridden[key];
        $cookieStore.put("configService:overridden", overridden);
    };

    self.resetOverridden = function () {
        overridden = {};
        $cookieStore.put("configService:overridden", overridden);
    };

    self.getOverridden = function () {
        return angular.copy(overridden);
    };

    var overridden = $cookieStore.get("configService:overridden") || {};
    $window.configService = self;
    return self;
}]);

m.config(['$httpProvider', function($httpProvider) {
    var configService;
    $httpProvider.interceptors.push(function($injector){
        return {
            request: function(config){
                if (!$injector.has('configService')) {
                    console.log('There is no configuration service available.');
                    return config;
                }
                configService = configService || $injector.get("configService");
                if (config.url.split("?")[0].match(/\.\w+$/) !== null){
                    return config;
                }
                var overridden = obj2get(configService.getOverridden(), "config.", ["user", "time", "debug"]);
                if (overridden === ""){
                    return config;
                }
                config.url += config.url.indexOf("?") === -1 ? "?" : "&";
                config.url += overridden;
                return config;
            }
        };
    });
}]);


var loggingServiceLoaded;
if (loggingServiceLoaded){
    throw "LoggingService already loaded";
}
loggingServiceLoaded = true;

var m = angular.module('proso.apps.common-logging', []);

m.factory("loggingService", ["$window", function($window) {
    if (!!$window.loggingService){
        return $window.loggingService;
    }

    var self = this;
    var debugLog = [];
    var debugLogListeners = [];

    self.getDebugLog = function() {
        return debugLog;
    };

    self.extendDebugLog = function(url, events) {
        events.forEach(function(e) {
            e.url = url;
            debugLog.push(e);
        });
        debugLogListeners.forEach(function(listener) {
            listener(events);
        });
    };

    self.addDebugLogListener = function(listener) {
        debugLogListeners.push(listener);
    };

    $window.loggingService = self;
    return self;
}]);

m.config(['$httpProvider', function($httpProvider) {
    var loggingService;
    $httpProvider.interceptors.push(function($injector) {
        return {
            response: function(response) {
                loggingService = loggingService || $injector.get("loggingService");
                if (response.data instanceof Object && 'debug_log' in response.data) {
                    loggingService.extendDebugLog(response.config.url, response.data.debug_log);
                }
                return response;
            }
        };
    });
}]);

var m = angular.module('proso.apps.flashcards-practice', ['ngCookies', 'proso.apps.common-config']);
m.service("practiceService", ["$http", "$q", "configService", "$cookies", function($http, $q, configService, $cookies){
    var self = this;

    var queue = [];
    var deferredFC = null;
    var promiseResolvedTmp = false;
    var currentFC = null;
    var answerQueue = [];

    var config = {};
    var current = 0;
    var setId = 0;
    var summary = {};

    var contexts = {};

    // called on create and set reset
    self.initSet = function(configName){
        var key = "practice." + configName + ".";
        config.set_length = configService.getConfig("proso_flashcards", key + "set_length", 10);
        config.fc_queue_size_max = configService.getConfig("proso_flashcards", key + "fc_queue_size_max", 1);
        config.fc_queue_size_min = configService.getConfig("proso_flashcards", key + "fc_queue_size_min", 1);
        config.save_answer_immediately = configService.getConfig("proso_flashcards", key + "save_answer_immediately", false);
        config.cache_context = configService.getConfig("proso_flashcards", key + "cache_context", false);

        self.setFilter({});
        current = 0;
        self.flushAnswerQueue();
        self.clearQueue();
        deferredFC = null;
        setId++;
        summary = {
            flashcards: [],
            answers: [],
            correct: 0,
            count: 0
        };
    };

    self.setFilter = function(filter){
        config.filter = {
            contexts: [],
            categories: [],
            types: []
        };
        angular.extend(config.filter, filter);
    };

    self.getCurrent = function(){
        return current;
    };

    self.getConfig = function(){
        return angular.copy(config);
    };

    // add answer to queue and upload queued answers if necessary
    self.saveAnswer = function(answer, farceSave){
        if (answer) {
            answer.time = Date.now();
            answerQueue.push(answer);
            summary.answers.push(answer);
            summary.count++;
            if (answer.flashcard_id === answer.flashcard_answered_id) {
                summary.correct++;
            }
        }

        if (config.save_answer_immediately || farceSave || current >= config.set_length) {
            if (answerQueue.length > 0) {
                answerQueue.forEach(function(answer){
                    answer.time_gap = Math.round((Date.now() - answer.time) / 1000);
                    delete answer.time;
                });
                $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
                $http.post("/flashcards/answer/", {answers: answerQueue})
                    .error(function (response) {
                        console.error("Problem while uploading answer", response);
                    });
                answerQueue = [];
            }
        }
    };

    self.flushAnswerQueue = function(){
        self.saveAnswer(null, true);
    };

    // build answer from current FC and save
    self.saveAnswerToCurrentFC = function(answeredFCId, responseTime, meta){
        if (!currentFC) {
            console.error("There is no current flashcard");
            return;
        }
        var answer = {
            flashcard_id: currentFC.id,
            flashcard_answered_id: answeredFCId,
            response_time: responseTime,
            direction: currentFC.direction
        };
        if (meta) {
            answer.meta = meta;
        }
        if (currentFC.options){
            answer.option_ids = [];
            currentFC.options.forEach(function(o){
                if (o.id !== currentFC.id) {
                    answer.option_ids.push(o.id);
                }
            });
        }
        self.saveAnswer(answer);
    };

    // return promise of flashcard
    self.getFlashcard = function(){
        if(deferredFC){
            return $q(function(resolve, reject){
                reject("Already one flashcard promised");
            });
        }
        deferredFC  = $q.defer();
        promiseResolvedTmp = false;
        _resolvePromise();
        deferredFC.promise.then(function(){ deferredFC = null;}, function(){ deferredFC = null;});
        return deferredFC.promise;
    };

    self.clearQueue = function(){
        queue = [];
    };

    // preload flashcards
    self.preloadFlashcards = function(){
        _loadFlashcards();
    };

    self.getFCQueue = function(){
        return queue;
    };

    self.getAnswerQueue = function(){
        return answerQueue;
    };

    self.getSummary = function(){
        var s = angular.copy(summary);
        for (var i = 0; i < Math.min(s.flashcards.length, s.answers.length); i++){
            var answer = s.answers[i];
            var flashcard = s.flashcards[i];
            if (flashcard.id === answer.flashcard_id){
                flashcard.answer = answer;
            }
            answer.correct = answer.flashcard_id === answer.flashcard_answered_id;
        }
        return s;
    };


    var _loadFlashcards = function(){
        if (queue.length >= config.fc_queue_size_min) { return; }                                       // if there are some FC queued
            config.filter.limit  = config.fc_queue_size_max - queue.length;
        if (deferredFC && !promiseResolvedTmp) { config.filter.limit ++; }                  // if we promised one flashcard
        config.filter.limit = Math.min(config.filter.limit, config.set_length - current - queue.length);  // check size of set
        if (config.filter.limit === 0) {return;}                         // nothing to do
        config.filter.avoid = currentFC ? [currentFC.id] : [];      // avoid current FC
        queue.forEach(function(fc){
            config.filter.avoid.push(fc.id);
        });

        var filter = {};
        for (var key in config.filter){
            if (config.filter[key] instanceof Array) {
                filter[key] = JSON.stringify(config.filter[key]);
            }else{
                filter[key] = config.filter[key];
            }
        }
        if (config.cache_context){
            filter.without_contexts = 1;
        }

        var request;
        if (answerQueue.length === 0) {
            request = $http.get("/flashcards/practice/", {params: filter});
        }else{
            $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
            request = $http.post("/flashcards/practice/", {answers: answerQueue}, {params: filter});
            answerQueue = [];
        }
        var request_in_set = setId;
        request
            .success(function(response){
                if (request_in_set !== setId) {
                    return;
                }
                queue = queue.concat(response.data.flashcards);
                _loadContexts();
                if (queue.length > 0) {
                    _resolvePromise();
                }
                else{
                    console.error("No Flashcards to practice");
                }
            })
            .error(function (response) {
                if (deferredFC !== null){
                    deferredFC.reject("Something went wrong while loading flashcards from backend.");
                }
                console.error("Something went wrong while loading flashcards from backend.");
            });

    };

    var _loadContexts = function(){
        if (config.cache_context){
            queue.forEach(function(fc){
                if (fc.context_id in contexts){
                    if (contexts[fc.context_id] !== "loading"){
                        fc.context = contexts[fc.context_id];
                    }
                }else{
                    contexts[fc.context_id] = "loading";
                    $http.get("/flashcards/context/" + fc.context_id)
                        .success(function(response){
                            contexts[fc.context_id] = response.data;
                            _resolvePromise();
                        }).error(function(){
                            delete contexts[fc.context_id];
                            console.error("Error while loading context from backend");
                        });
                }
            });
        }
    };

    var _resolvePromise = function(){
        if (deferredFC === null){
            return;
        }
        if (config.set_length === current){
            deferredFC.reject("Set was completed");
            return;
        }
        if (queue.length > 0) {
            if (config.cache_context){
                if (typeof contexts[queue[0].context_id]  === 'object'){
                    queue[0].context = contexts[queue[0].context_id];
                }else{
                    return;
                }
            }
            currentFC = queue.shift();
            current++;
            promiseResolvedTmp = true;
            summary.flashcards.push(currentFC);
            deferredFC.resolve(currentFC);
        }
        _loadFlashcards();
    };
}]);

var m = angular.module('proso.apps.flashcards-userStats', ['ngCookies']);
m.service("userStatsService", ["$http", "$cookies", function($http, $cookies){
    var self = this;

    var filters = {};

    self.addGroup = function (id, data) {
        if (!data.language){
            delete data.language;
        }
        filters[id] = data;
    };

    self.addGroupParams = function (id, categories, contexts, types, language) {
        filters[id] = {
            categories: categories,
            contexts: types,
            types: types
        };
        if (typeof language !== "undefined"){
            filters[id].language = language;
        }
    };

    self.getStats = function(){
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        return $http.get("/flashcards/user_stats/", {params: {filters: JSON.stringify(filters)}});
    };

    self.getStatsPost = function(){
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        return $http.post("/flashcards/user_stats/", filters);
    };

    self.clean = function(){
        filters = {};
    };

    self.getGroups = function (){
        return angular.copy(filters);
    };

}]);

var m = angular.module('proso.apps.user-user', ['ngCookies']);
m.service("userService", ["$http", function($http){
    var self = this;
    self.status = {
        "logged": false,
        "loading": false
    };
    self.user = {};
    var update = this.update = {};
    var sessionUpdated = false;
    self.error = {};

    // called on create
    self.init = function (){
    };

    self.signup = function(data){
        self.status.loading = true;
        _resetError();
        return $http.post("/user/signup/", data)
            .success(function(response){
                _processUser(response.data);
            })
            .error(function(response){
                self.error = response;
            })
            .finally(function(response){
                self.status.loading = false;
            });
    };

    self.signupParams = function(name, email, pass, pass2, firstName, lastName){
        return self.signup({
            "username": name,
            "email": email,
            "password": pass,
            "password_check": pass2,
            "first_name": firstName,
            "last_name": lastName
        });
    };

    // get user profile from backend
    self.loadUser = function(){
        self.status.loading = true;
        return $http.get("/user/profile/")
            .success(function(response){
                _processUser(response.data);
            })
            .finally(function(response){
                self.status.loading = false;
            });
    };

    self.processUser = function(data){
        _processUser(angular.copy(data));
    };

    // process user data
    var _processUser = function(data){
        if (!data) {
            self.status.logged = false;
            return;
        }
        self.status.logged = true;
        self.user.profile = data;
        angular.extend(self.user, data.user);
        angular.extend(update, {
            user: {
                first_name: self.user.first_name,
                last_name: self.user.last_name
            },
            send_emails: self.user.profile.send_emails,
            public: self.user.profile.public
        });
        delete self.user.profile.user;
        if (!sessionUpdated){
            self.updateSession();
            sessionUpdated = true;
        }
    };

    self.login = function(name, pass){
        self.status.loading = true;
        _resetError();
        return $http.post("/user/login/", {
            username: name,
            password: pass
        })
            .success(function(response){
                _processUser(response.data);
            })
            .error(function(response){
                self.error = response;
            })
            .finally(function(response){
                self.status.loading = false;
            });
    };

    self.logout = function(){
        self.status.loading = true;
        $http.get("/user/logout/")
            .success(function(response){
                clearObj(self.user);
                self.status.logged = false;
            })
            .finally(function(response){
                self.status.loading = false;
            });
    };


    var _resetError = function(){
        clearObj(self.error);
    };

    var clearObj = function(obj){
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)){ delete obj[prop]; }
        }
    };


    self.loadUserFromJS = function (scope) {
        scope.$apply(self.loadUser());
    };

    self.loadSession = function(){
        self.status.loading = true;
        $http.get("/user/session/")
            .success(function(response){
                self.user.session = response.data;
            })
            .finally(function(response){
                self.status.loading = false;
            });
    };

    self.updateSession = function(){
        var data = {
            locale: window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage,
            display_height: window.innerHeight,
            display_width: window.innerWidth
        };
        try{
            data.time_zone = jstz.determine().name();
        }catch (err){ console.log("JSTimeZone lib not loaded");}
        $http.post("/user/session/", data).error(function(){
            console.error("Error while updating session");
        });
    };

    self.updateProfile = function(data){
        self.status.loading = true;
        _resetError();
        $http.post("/user/profile/", data)
            .success(function(response){
                _processUser(response.data);
            })
            .error(function(response){
                self.error = response;
            }).finally(function(response){
                self.status.loading = false;
            });
    };

    self.loginGoogle = function() {
        _openPopup('/login/google-oauth2/', '/user/close_popup/');
    };

    self.loginFacebook = function() {
        _openPopup('/login/facebook/', '/user/close_popup/');
    };

    var _openPopup = function(url, next){
        var settings = 'height=700,width=700,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=yes,directories=no,status=yes';
        url += "?next=" + next;
        window.open(url, "popup", settings);
    };

    self.init();

}]);

var m = angular.module('proso.apps.common-toolbar', ['ngCookies', 'proso.apps.common-config']);

m.controller("ToolbarController", function($scope, $cookies, configService, loggingService) {
    $scope.override = configService.override;
    $scope.removeOverridden = configService.removeOverridden;
    $scope.date = new Date();
    $scope.debugLog = [];
    $scope.opened = $cookies["toolbar:opened"] === "true";
    $scope.loggingOpened = true;
    $scope.override('debug', true);
    $scope.overridden = configService.getOverridden();
    loggingService.addDebugLogListener(function(events) {
        $scope.$apply(function(){
            events.forEach(function (e) {
                $scope.debugLog.unshift(e);
            });
        });
    });

    $scope.$watch("opened", function(n, o){
        $cookies["toolbar:opened"] = n;
    });

    $scope.addToOverride = function(name) {
        if (!name) {
            return;
        }
        configService.override(name, '');
    };

    $scope.getOverridden = function() {
        var overridden = configService.getOverridden();
        Object.keys(overridden).filter(function(k) {
            return (k === 'user' || k === 'debug' || k === 'time');
        }).forEach(function (k) {
            delete overridden[k];
        });
        return overridden;
    };

});

m.directive('toolbar', [function () {
    return {
        restrict: 'E',
        controller: 'ToolbarController',
        templateUrl: 'templates/common-toolbar/toolbar.html'
    };
}]);
!angular.$$csp() && angular.element(document).find('head').prepend('<style type="text/css">#config-bar-show-button{position:fixed;right:-40px;top:250px;width:100px;transform:rotate(-90deg);-webkit-transform:rotate(-90deg);border:solid #808080 1px;margin:0;padding:10px;text-transform:capitalize;font-weight:bold;background-color:rgba(255,255,255,0.8);transition:all 0.2s;cursor:pointer;text-align:center;}#config-bar-show-button:hover{background-color:#1f8dd6;color:white;}#config-bar{position:fixed;right:0;top:0;bottom:0;width:500px;border-left:solid #808080 1px;background-color:rgba(255,255,255,0.8);z-index:1000;}#config-bar-header{background-color:rgba(31,141,214,0.8);margin:0;padding:10px 20px;text-align:right;color:white;}#config-bar-content .section{background-color:rgba(31,141,214,0.8);margin:0;padding:10px 20px;color:white;text-transform:uppercase;cursor:pointer;}#config-bar-hide{text-align:right;width:100%;cursor:pointer;}#config-bar-content{margin:0;list-style:none;padding:0;}#config-bar-content > li{border-bottom:1px dashed #E9F4FB;padding:10px 20px;margin:0;}#config-bar-content > li:hover{background:#E9F4FB;}#config-bar-content .reset,#config-bar-content .add-to-override{cursor:pointer;font-weight:bolder;}#config-bar-content input{padding:5px 10px;}#config-bar-content label{margin-left:10px;cursor:pointer;}#config-bar-content .link{text-transform:uppercase;cursor:pointer;font-weight:bold;}#config-bar-logging{list-style:none;margin:0;padding:0;max-height:500px;overflow-y:scroll;font-size:12px;}#config-bar-logging > li{margin:0;padding:5px 10px;border-bottom:1px solid #E9F4FB;}#config-bar-logging > li:hover{background-color:#E9F4FB;}#config-bar-logging .level{display:block;float:left;width:10%;font-weight:bold;}#config-bar-logging .url{font-weight:bold;margin-left:10px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:50%;float:left;}#config-bar-logging .filename{display:block;float:right;text-align:right;width:30%;font-weight:bold;}#config-bar-logging .message{display:block;clear:both;margin-top:20px;margin-bottom:5px;}#config-bar-content input{font-size:14px;}#config-bar-content .property-name{width:70%;}#config-bar-content .property-value{width:10%;text-align:center;}#config-bar-property-name{width:70%;}#config-bar-show-button{position:fixed;right:-40px;top:250px;width:100px;transform:rotate(-90deg);-webkit-transform:rotate(-90deg);border:solid #808080 1px;margin:0;padding:10px;text-transform:capitalize;font-weight:bold;background-color:rgba(255,255,255,0.8);transition:all 0.2s;cursor:pointer;text-align:center;}#config-bar-show-button:hover{background-color:#1f8dd6;color:white;}#config-bar{position:fixed;right:0;top:0;bottom:0;width:500px;border-left:solid #808080 1px;background-color:rgba(255,255,255,0.8);z-index:1000;}#config-bar-header{background-color:rgba(31,141,214,0.8);margin:0;padding:10px 20px;text-align:right;color:white;}#config-bar-content .section{background-color:rgba(31,141,214,0.8);margin:0;padding:10px 20px;color:white;text-transform:uppercase;cursor:pointer;}#config-bar-hide{text-align:right;width:100%;cursor:pointer;}#config-bar-content{margin:0;list-style:none;padding:0;}#config-bar-content > li{border-bottom:1px dashed #E9F4FB;padding:10px 20px;margin:0;}#config-bar-content > li:hover{background:#E9F4FB;}#config-bar-content .reset,#config-bar-content .add-to-override{cursor:pointer;font-weight:bolder;}#config-bar-content input{padding:5px 10px;}#config-bar-content label{margin-left:10px;cursor:pointer;}#config-bar-content .link{text-transform:uppercase;cursor:pointer;font-weight:bold;}#config-bar-logging{list-style:none;margin:0;padding:0;max-height:500px;overflow-y:scroll;font-size:12px;}#config-bar-logging > li{margin:0;padding:5px 10px;border-bottom:1px solid #E9F4FB;}#config-bar-logging > li:hover{background-color:#E9F4FB;}#config-bar-logging .level{display:block;float:left;width:10%;font-weight:bold;}#config-bar-logging .url{font-weight:bold;margin-left:10px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:50%;float:left;}#config-bar-logging .filename{display:block;float:right;text-align:right;width:30%;font-weight:bold;}#config-bar-logging .message{display:block;clear:both;margin-top:20px;margin-bottom:5px;}#config-bar-content input{font-size:14px;}#config-bar-content .property-name{width:70%;}#config-bar-content .property-value{width:10%;text-align:center;}#config-bar-property-name{width:70%;}</style>');
!angular.$$csp() && angular.element(document).find('head').prepend('<style type="text/css">.rating .btn{margin:20px;}</style>');