/*
 * proso-apps-js
 * Version: 1.0.0 - 2015-08-10
 * License: MIT
 */
angular.module("proso.apps", ["proso.apps.tpls", "proso.apps.common-config","proso.apps.common-logging","proso.apps.flashcards-practice","proso.apps.flashcards-userStats","proso.apps.user-user", "proso.apps.common-toolbar"])
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
            answer.meta = {client_meta: meta};
        }
        if (currentFC.practice_meta) {
            if (answer.meta) {
                answer.meta = angular.extend(answer.meta, currentFC.practice_meta);
            } else {
                answer.meta = currentFC.practice_meta;
            }
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
            contexts: contexts,
            types: types
        };
        if (typeof language !== "undefined"){
            filters[id].language = language;
        }
    };

    self.getStats = function(mastered, username){
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        var params = {filters: JSON.stringify(filters)};
        if (mastered){
            params.mastered = true;
        }
        if (username){
            params.username = username;
        }
        return $http.get("/flashcards/user_stats/", {params: params});
    };

    self.getStatsPost = function(mastered, username){
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        var params = "?";
        params += mastered ? "&mastered=true" : "";
        params += username ? "&username="+username : "";
        return $http.post("/flashcards/user_stats/" + params, filters);
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

    // get public user profile from backend
    self.getUserProfile = function(username, stats){
        var params = {username: username};
        if (stats){
            params.stats = true;
        }
        return $http.get("/user/profile/", {params: params});
    };

    // get user profile from backend
    self.loadUser = function(stats){
        self.status.loading = true;
        var params = {};
        if (stats){
            params.stats = true;
        }
        return $http.get("/user/profile/", {params: params})
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

    self.login = function(username, pass){
        self.status.loading = true;
        _resetError();
        var promise = $http.post("/user/login/", {
            username: username,
            password: pass
        });
        promise.success(function(response){
                _processUser(response.data);
            })
            .error(function(response){
                self.error = response;
            })
            .finally(function(response){
                self.status.loading = false;
            });
        return promise;
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


    self.loadUserFromJS = function (scope, stats) {
        scope.$apply(self.loadUser(stats));
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

    self.updateProfile = function(user){
        var data = {
          user: {},
        };
        if (user.profile) {
          angular.extend(data, user.profile);
        }
        angular.extend(data.user, user);
        delete data.user.profile;
        delete data.user.username;

        self.status.loading = true;
        _resetError();
        var promise = $http.post("/user/profile/", data);
        promise.success(function(response){
                _processUser(response.data);
            })
            .error(function(response){
                self.error = response;
            }).finally(function(response){
                self.status.loading = false;
            });
        return promise;
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

m.controller("ToolbarController", ['$scope', '$cookies', 'configService', 'loggingService', '$timeout', '$http', function($scope, $cookies, configService, loggingService, $timeout, $http) {
    $scope.override = configService.override;
    $scope.removeOverridden = configService.removeOverridden;
    $scope.date = new Date();
    $scope.debugLog = [];
    $scope.opened = $cookies["toolbar:opened"] === "true";
    $scope.loggingOpened = true;
    $scope.abTestingOpened = false;
    $scope.flashcardsLimit = 10;
    $scope.override('debug', true);
    $scope.overridden = configService.getOverridden();
    loggingService.addDebugLogListener(function(events) {
        $timeout(function(){
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

    $scope.openABTesting = function() {
        $scope.abTestingOpened = ! $scope.abTestingOpened;
        if ($scope.abTestingOpened && !$scope.abExperiment) {
            $http.get('/configab/experiments', {params: {filter_column: 'is_enabled', filter_value: true, stats: true}})
                .success(function(response) {
                    var data = response.data;
                    if (data.length === 0) {
                        return;
                    }
                    $scope.abExperiment = data[0];
                    $scope.abExperiment.setups.forEach(function(setup) {
                        setup.values.forEach(function(value) {
                            $scope.abExperiment.variables.forEach(function(variable) {
                                if (variable.id = value.variable_id) {
                                    value.variable = variable;
                                }
                            });
                        });
                    });
                    $scope.drawABTesting();
                });
        }
        $scope.drawABTesting();
    };

    $scope.showFlashcardsPractice = function() {
        $scope.flashcardsAnswers = [];
        var params = {
            limit: $scope.flashcardsLimit
        };
        if ($scope.flashcardsCategories) {
            params.categories = JSON.stringify(
                $scope.flashcardsCategories.split(',').map(function(x) { return x.trim(); })
            );
        }
        if ($scope.flashcardsContexts) {
            params.contexts = JSON.stringify(
                $scope.flashcardsContexts.split(',').map(function(x) { return x.trim(); })
            );
        }
        if ($scope.flashcardsTypes) {
            params.types = JSON.stringify(
                $scope.flashcardsTypes.split(',').map(function(x) { return x.trim(); })
            );
        }
        $http.get('/flashcards/practice_image', {params: params}).success(function(response) {
            document.getElementById("flashcardsChart").innerHTML = response;
        });
    };

    $scope.showFlashcardsAnswers = function() {
        document.getElementById("flashcardsChart").innerHTML = '';
        $http.get('/flashcards/answers', {params: {limit: $scope.flashcardsLimit}}).success(function(response) {
            $scope.flashcardsAnswers = response.data;
        });
    };

    $scope.drawABTesting = function(column) {
        if (!$scope.abExperiment) {
            return;
        }
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Experiment Setup');
        data.addColumn('number', 'Number of Answers');
        data.addColumn('number', 'Number of Users');
        data.addColumn('number', 'Returning Chance');
        data.addRows($scope.abExperiment.setups.map(function(setup) {
            return [
                'Setup #' + setup.id,
                setup.stats.number_of_answers_median,
                setup.stats.number_of_users,
                setup.stats.returning_chance,
            ];
        }));
        var view = data;
        var title = 'All';
        if (column) {
            var columns = {
                number_of_answers_median: 1,
                number_of_users: 2,
                returning_chance: 3,
            };
            title = column;
            view = new google.visualization.DataView(data);
            view.setColumns([0, columns[column]]);
        }
        var chart = new google.visualization.ColumnChart(document.getElementById("abChart"));
        var options = {
            title: title,
            legend: {
                position: 'none'
            },
            vAxis: {
                format: '#.###'
            },
            width: 480,
            height: 300,
            'chartArea': {'width': '80%', 'height': '80%'}
        };
        chart.draw(view, options);
    };

    $scope.showAuditChart = function() {
        var params = {};
        if ($scope.auditLimit) {
            params['limit'] = $scope.auditLimit;
        }
        if ($scope.auditUser) {
            params['user'] = $scope.auditUser;
        }
        if ($scope.auditPrimary) {
            params['item'] = $scope.auditPrimary;
        }
        if ($scope.auditSecondary) {
            params['item_secondary'] = $scope.auditSecondary;
        }
        $http.get("/models/audit/" + $scope.auditKey, {params: params})
            .success(function(response) {
                var data = new google.visualization.DataTable();
                data.addColumn('number', 'Update');
                data.addColumn('number', 'Value');
                data.addColumn({type: 'datetime', role: 'tooltip'});
                response.data.reverse();
                var rows = [];
                for (var i = 0; i < response.data.length; i++) {
                    var record = response.data[i];
                    rows.push([i, record.value, new Date(record.time)]);
                }
                data.addRows(rows);
                var options = {
                    title: $scope.auditKey,
                    legend: {
                        position: 'none'
                    },
                    vAxis: {
                        format: '#.###'
                    },
                    hAxis: {
                        title: 'Update',
                        position: 'center'
                    },
                    width: 480,
                    height: 300,
                    'chartArea': {'width': '80%', 'height': '90%'}
                };
                var formatter = new google.visualization.NumberFormat({
                    fractionDigits: 3, pattern: '#.###'
                });
                formatter.format(data, 1);
                var chart = new google.visualization.LineChart(document.getElementById('auditChart'));
                chart.draw(data, options);
            });
    };

    $scope.recommendUser = function() {
        var filter = {};
        if ($scope.recommendationRegisterMin) {
            filter.register_min = $scope.recommendationRegisterMin;
        }
        if ($scope.recommendationRegisterMax) {
            filter.register_max = $scope.recommendationRegisterMax;
        }
        if ($scope.recommendationAnswersMin) {
            filter.number_of_answers_min = $scope.recommendationAnswersMin;
        }
        if ($scope.recommendationAnswersMax) {
            filter.number_of_answers_max = $scope.recommendationAnswersMax;
        }
        if ($scope.recommendationSuccessMin) {
            filter.success_min = $scope.recommendationSuccessMin;
        }
        if ($scope.recommendationSuccessMax) {
            filter.success_max = $scope.recommendationSuccessMax;
        }
        if ($scope.recommendationVariableName) {
            filter.variable_name = $scope.recommendationVariableName;
        }
        if ($scope.recommendationVariableMin) {
            filter.variable_min = $scope.recommendationVariableMin;
        }
        if ($scope.recommendationVariableMax) {
            filter.variable_max = $scope.recommendationVariableMax;
        }
        $scope.recommendationOutput = '';
        $http.get('/models/recommend_users', {params: filter})
            .success(function (response) {
                if (response.data.length > 0) {
                    $scope.recommendationOutput = response.data[0];
                }
            });
    };

}]);

m.directive('toolbar', [function () {
    return {
        restrict: 'E',
        controller: 'ToolbarController',
        templateUrl: 'templates/common-toolbar/toolbar.html'
    };
}]);

angular.module("templates/common-toolbar/toolbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/common-toolbar/toolbar.html",
    "<div id=\"proso-toolbar\">\n" +
    "    <div id=\"config-bar-show-button\" ng-click=\"opened = !opened\" ng-hide=\"opened\"> proso bar </div>\n" +
    "\n" +
    "    <div id=\"config-bar\" ng-cloak ng-show=\"opened\">\n" +
    "        <div id=\"config-bar-header\">\n" +
    "            <span id=\"config-bar-hide\" ng-click=\"opened = !opened\">Close</span>\n" +
    "        </div>\n" +
    "        <ul id=\"config-bar-content\">\n" +
    "            <li>\n" +
    "                <span ng-click=\"addToOverride(propertyToOverride)\" class=\"add-to-override\">+</span>\n" +
    "                <input type=\"text\" ng-model=\"propertyToOverride\" id=\"config-bar-property-name\" placeholder=\"Property Name\" />\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <span ng-click=\"removeOverridden('user'); overridden.user = null;\" class=\"reset\">X</span>\n" +
    "                <input type=\"number\" ng-model=\"overridden.user\" placeholder=\"User\" ng-change=\"override('user', overridden.user)\" />\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <span ng-click=\"removeOverridden('time'); overridden.time= null;\" class=\"reset\">X</span>\n" +
    "                <input type=\"text\" ng-model=\"overridden.time\" placeholder=\"Time\" ng-change=\"override('time', overridden.time)\" />\n" +
    "                <i>{{date | date:'yyyy-MM-dd_HH:mm:ss'}}</i>\n" +
    "            </li>\n" +
    "            <li ng-repeat=\"(name, value) in getOverridden() track by name\">\n" +
    "                <span class=\"reset\" ng-click=\"removeOverridden(name)\">X</span>\n" +
    "                <input type=\"text\" disabled class=\"property-name\" ng-model=\"name\" />\n" +
    "                <input type=\"text\" class=\"property-value\" placeholder=\"Value\" ng-model=\"value\" ng-change=\"override(name, value)\" />\n" +
    "            </li>\n" +
    "            <div class='section' ng-click=\"openABTesting()\">AB Testing <span id=\"abExperimentName\">{{abExperiment.identifier }}</span></div>\n" +
    "            <ul id=\"config-bar-ab\" ng-cloak ng-show=\"abTestingOpened\">\n" +
    "                <li>\n" +
    "                    <ul id=\"abSetupInfo\">\n" +
    "                        <li ng-repeat=\"setup in abExperiment.setups\">\n" +
    "                            <strong class=\"setup-id\">#{{ setup.id }}</strong>\n" +
    "                            <ul>\n" +
    "                                <li ng-repeat=\"value in setup.values\">\n" +
    "                                    <span class=\"variable-name\">{{ value.variable.app_name }}.{{ value.variable.name }}</span>\n" +
    "                                    <span class=\"variable-value\">{{ value.value }}</span>\n" +
    "                                    <span class=\"comma\" ng-if=\"!$last\">,</a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                <li>\n" +
    "                <div id=\"abChart\"></div>\n" +
    "                <li>\n" +
    "                    <button ng-click=\"drawABTesting()\" class=\"ab-experiment-chart-button\">All</button>\n" +
    "                    <button ng-click=\"drawABTesting('number_of_users')\" class=\"ab-experiment-chart-button\">Users</button>\n" +
    "                    <button ng-click=\"drawABTesting('number_of_answers_median')\" class=\"ab-experiment-chart-button\">Answers</button>\n" +
    "                    <button ng-click=\"drawABTesting('returning_chance')\" class=\"ab-experiment-chart-button\">Returning</button>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <div class='section' ng-click=\"flashcardsOpened = !flashcardsOpened\">Flashcards</div>\n" +
    "            <ul id=\"config-bar-flashcards\" ng-cloak ng-show=\"flashcardsOpened\">\n" +
    "                <li>\n" +
    "                    <input type=\"text\" ng-model=\"flashcardsCategories\" placeholder=\"Categories\" />\n" +
    "                    <input type=\"text\" ng-model=\"flashcardsContexts\" placeholder=\"Contexts\" />\n" +
    "                    <input type=\"text\" ng-model=\"flashcardsTypes\" placeholder=\"Types\" />\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <input type=\"text\" ng-model=\"flashcardsLimit\" placeholder=\"Limit\" />\n" +
    "                    <button ng-click=\"showFlashcardsPractice()\">Show Practice</button>\n" +
    "                    <button ng-click=\"showFlashcardsAnswers()\">Show Answers</button>\n" +
    "                </li>\n" +
    "                <div style=\"overflow: auto; width: 100%; height: 300px;\">\n" +
    "                    <table ng-show=\"flashcardsAnswers.length > 0\" id=\"flashcardsAnswers\">\n" +
    "                        <thead>\n" +
    "                            <tr>\n" +
    "                                <th>#</th>\n" +
    "                                <th>User</th>\n" +
    "                                <th>Asked</th>\n" +
    "                                <th>Answered</th>\n" +
    "                                <th>Opt.</th>\n" +
    "                            </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                            <tr ng-repeat=\"answer in flashcardsAnswers\">\n" +
    "                                <td>\n" +
    "                                    <a href=\"/flashcards/answer/{{ answer.id }}?html\" title=\"{{answer.time | date:'yyyy-MM-dd_HH:mm:ss'}}, direction: {{ answer.direction }}\">\n" +
    "                                        {{ answer.id }}\n" +
    "                                    </a>\n" +
    "                                </td>\n" +
    "                                <td>{{ answer.user_id }}</td>\n" +
    "                                <td>{{ answer.flashcard_asked.identifier }}</td>\n" +
    "                                <td ng-class=\"{true: 'correct', false: 'wrong'}[answer.item_asked_id == answer.item_answered_id]\">{{ answer.flashcard_answered.identifier }}</td>\n" +
    "                                <td class=\"direction-{{ answer.direction }}\">{{ answer.options.length }}</td>\n" +
    "                            </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                    <div id=\"flashcardsChart\"></div>\n" +
    "                </div>\n" +
    "            </ul>\n" +
    "            <div class='section' ng-click=\"auditOpened = !auditOpened\">Models Audit</div>\n" +
    "            <ul id=\"config-bar-audit\" ng-cloak ng-show=\"auditOpened\">\n" +
    "                <li>\n" +
    "                    <input type=\"text\" ng-model=\"auditLimit\" placeholder=\"Limit\" />\n" +
    "                    <input type=\"text\" ng-model=\"auditKey\" placeholder=\"Key\" id=\"config-bar-audit-key\" />\n" +
    "                    <input type=\"text\" ng-model=\"auditUser\" placeholder=\"User\" />\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <input type=\"text\" ng-model=\"auditPrimary\" placeholder=\"Item Primary\" />\n" +
    "                    <input type=\"text\" ng-model=\"auditSecondary\" placeholder=\"Item Secondary\" />\n" +
    "                    <button ng-click=\"showAuditChart()\">Show Chart</button>\n" +
    "                </li>\n" +
    "                <div id=\"auditChart\"></div>\n" +
    "            </ul>\n" +
    "            <div class='section' ng-click=\"recommendationOpened = !recommendationOpened\">Recommend User</div>\n" +
    "            <ul id=\"config-bar-recommendation\" ng-cloak ng-show=\"recommendationOpened\">\n" +
    "                <li>\n" +
    "                    <input type=\"text\" placeholder=\"Register Time\" disabled/>\n" +
    "                    <input type=\"text\" placeholder=\"Min\" ng-model=\"recommendationRegisterMin\" />\n" +
    "                    <input type=\"text\" placeholder=\"Max\" ng-model=\"recommendationRegisterMax\" />\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <input type=\"text\" placeholder=\"Number of Answers\" disabled/>\n" +
    "                    <input type=\"text\" placeholder=\"Min\" ng-model=\"recommendationAnswersMin\" />\n" +
    "                    <input type=\"text\" placeholder=\"Max\" ng-model=\"recommendationAnswersMax\" />\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <input type=\"text\" placeholder=\"Success\" disabled/>\n" +
    "                    <input type=\"text\" placeholder=\"Min\" ng-model=\"recommendationSuccessMin\" />\n" +
    "                    <input type=\"text\" placeholder=\"Max\" ng-model=\"recommendationSuccessMax\" />\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <input type=\"text\" placeholder=\"Variable Name\" ng-model=\"recommendationVariableName\" />\n" +
    "                    <input type=\"text\" placeholder=\"Min\" ng-model=\"recommendationVariableMin\" />\n" +
    "                    <input type=\"text\" placeholder=\"Max\" ng-model=\"recommendationVariableMax\" />\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <input type=\"text\" ng-model=\"recommendationOutput\" disabled />\n" +
    "                    <button ng-click=\"recommendUser()\">Recommend</button>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <div class='section' ng-click=\"loggingOpened = !loggingOpened\">Logging</div>\n" +
    "            <ul id=\"config-bar-logging\" ng-cloak ng-show=\"loggingOpened\">\n" +
    "                <li ng-repeat=\"event in debugLog|limitTo:100\" class=\"logging-event\">\n" +
    "                    <span class=\"level\">{{ event.level }}</span>\n" +
    "                    <span class=\"url\">{{ event.url }}</span>\n" +
    "                    <span class=\"filename\">{{ event.filename }}:{{ event.line_number }}</span>\n" +
    "                    <span class=\"message\">{{ event.message }}</span>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
!angular.$$csp() && angular.element(document).find('head').prepend('<style type="text/css">#config-bar-show-button{position:fixed;right:-40px;top:250px;width:100px;transform:rotate(-90deg);-webkit-transform:rotate(-90deg);border:solid #808080 1px;margin:0;padding:10px;text-transform:capitalize;font-weight:bold;background-color:rgba(255,255,255,0.8);transition:all 0.2s;cursor:pointer;text-align:center;z-index:1000;}#config-bar-show-button:hover{background-color:#1f8dd6;color:white;}#config-bar{position:fixed;right:0;top:0;bottom:0;width:500px;border-left:solid #808080 1px;background-color:rgba(255,255,255,0.8);z-index:1000;}#config-bar-header{background-color:rgba(31,141,214,0.8);margin:0;padding:5px 10px;text-align:right;color:white;}#config-bar-content .section{background-color:rgba(31,141,214,0.8);margin:5px 0;padding:5px 10px;color:white;text-transform:uppercase;cursor:pointer;}#config-bar-hide{text-align:right;width:100%;cursor:pointer;}#config-bar-content{margin:0;list-style:none;padding:0;}#config-bar-content > li{border-bottom:1px dashed #E9F4FB;padding:5px 10px;margin:0;}#config-bar-content > li:hover{background:#E9F4FB;}#config-bar-content .reset,#config-bar-content .add-to-override{cursor:pointer;font-weight:bolder;}#config-bar-content input{padding:5px 10px;}#config-bar-content label{margin-left:10px;cursor:pointer;}#config-bar-content .link{text-transform:uppercase;cursor:pointer;font-weight:bold;}#config-bar-logging{list-style:none;margin:0;padding:0;max-height:500px;overflow-y:scroll;font-size:12px;}#config-bar-logging > li{margin:0;padding:5px 10px;border-bottom:1px solid #E9F4FB;}#config-bar-logging > li:hover{background-color:#E9F4FB;}#config-bar-logging .level{display:block;float:left;width:10%;font-weight:bold;}#config-bar-logging .url{font-weight:bold;margin-left:10px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:50%;float:left;}#config-bar-logging .filename{display:block;float:right;text-align:right;width:30%;font-weight:bold;}#config-bar-logging .message{display:block;clear:both;margin-top:20px;margin-bottom:5px;}#config-bar-content .property-name{width:70%;}#config-bar-content .property-value{width:10%;text-align:center;}#config-bar-property-name{width:70%;}#config-bar-audit,#config-bar-ab,#config-bar-flashcards,#config-bar-recommendation{padding-left:5px;}#config-bar-audit li,#config-bar-ab li,#config-bar-flashcards li,#config-bar-recommendation li{padding-left:0;margin-left:0;list-style:none;margin-bottom:5px;}#config-bar-ab ul{padding-left:0;margin-left:0;}.ab-experiment-chart-button{margin-left:10px;width:20%;}#config-bar-audit input,#config-bar-flashcards input,#config-bar-recommendation input{width:27%;}#config-bar-audit button,#config-bar-flashcards button,#config-bar-recommendation button{width:27%;}#auditChart{margin:10px auto;width:480px;}#abChart{margin:0 auto;width:480px;}#flashcardsChart{margin:0 auto;width:100%;height:1000px;}#abExperimentName{margin-left:20px;font-weight:bold;}#abSetupInfo > li > ul,#abSetupInfo > li > ul > li{display:inline;}#flashcardsAnswers{width:100%;}#flashcardsAnswers thead{color:#fff;background-color:rgba(31,141,214,0.8);}#flashcardsAnswers th,#flashcardsAnswers td{text-align:center;}#flashcardsAnswers tbody tr:nth-child(even){background-color:#E9F4FB;}#flashcardsAnswers tbody tr:nth-child(odd){background-color:#fff;}#flashcardsAnswers td.correct{background-color:#009933;color:white;}#flashcardsAnswers td.wrong{background-color:#cc0000;color:white;}#flashcardsAnswers td.direction-t2d{background-color:#ff9900;color:white;}#flashcardsAnswers td.direction-d2t{background-color:#ffff00;}</style>');
!angular.$$csp() && angular.element(document).find('head').prepend('<style type="text/css">.rating .btn{margin:20px;}</style>');