/*
 * proso-apps-js
 * Version: 1.0.0 - 2016-07-08
 * License: MIT
 */
angular.module("proso.apps", ["proso.apps.tpls", "proso.apps.common-config","proso.apps.common-logging","proso.apps.common-toolbar","proso.apps.concept-concept","proso.apps.feedback-comment","proso.apps.feedback-rating","proso.apps.models-practice","proso.apps.models-userStats","proso.apps.user-user","proso.apps.user-login","proso.apps.user-questions"]);
angular.module("proso.apps.tpls", ["templates/common-toolbar/toolbar.html","templates/feedback-comment/comment.html","templates/feedback-rating/rating.html","templates/user-login/login-modal.html","templates/user-login/signup-modal.html","templates/user-questions/user_questions_banner.html"]);
angular.module("proso.apps.gettext", [])
.value("gettext", window.gettext || function(x){return x;})
.filter("trans", ["gettext", function(gettext) {
    return function(msgid) {
        return gettext(msgid);
    };
}]);
angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('cs', {"Appropriate":"Tak akorát","Close":"Zavřít","Did you find a bug in the app? Do you have an improvement idea? Or any other comment? We are eager to hear anything you'd like to tell us.":"Narazili jste na chybu v aplikaci? Máte nápad na vylepšení? Nebo jakýkoliv jiný postřeh či komentář? Zajímá nás všechno, co nám chcete sdělit.","Don't know / Don't want to rate":"Nevím / Nechci hodnotit","E-mail":"E-mail","How difficult are the questions?":"Jak těžké se vám zdají otázky?","Password":"Heslo","Password again":"Heslo znovu","Registration was successful. You can continue to use the application.":"Registrace proběhla úspěšně. Můžete pokračovat v používání aplikace.","Save":"Uložit","Saving...":"Ukládání...","Send":"Odeslat","Sign In":"Přihlásit se","Sign Up":"Zaregistrovat se","Something wrong has happened.":"V aplikaci nastala chyba.","Thank you for the message. User feedback is very important for us.":"Děkujeme Vám za zaslané informace. Feedback od uživatelů je k nezaplacení.","Thank you for your rating.":"Děkujeme za vaše hodnocení.","Thank you for your response.":"Děkujeme za odpověď.","Too difficult":"Příliš těžké","Too easy":"Příliš lehké","Username":"Uživatelské jméno","Write to us":"Napište nám","Your answer helps us adjust difficulty of questions.":"Svou odpovědí nám pomáháte přizpůsobovat obtížnost otázek.","Your e-mail address (optional)":"Váš e-mail (nepovinné)","and get all the benefits of registered users.":"a získejte všechny výhody registrovaných uživatelů.","via E-mail":"přes E-mail","via Facebook":"přes Facebook","via Google":"přes Google"});
    gettextCatalog.setStrings('de', {"Appropriate":"genau richtig","Close":"Schließen","Did you find a bug in the app? Do you have an improvement idea? Or any other comment? We are eager to hear anything you'd like to tell us.":"Haben Sie einen Fehler in der App gefunden? Haben Sie eine Idee, wie man diese App besser machen könnte? Oder einen anderen Tipp oder Kommentar? Wir interessieren uns für alles, was Sie uns mitteilen wollen.","Don't know / Don't want to rate":"ich weiß nicht/ ich will nicht antworten","E-mail":"E-Mail","How difficult are the questions?":"Wie schwierig sind die gestellten Fragen?","Password":"Passwort","Password again":"Passwort wiederholen","Registration was successful. You can continue to use the application.":"Die Registrierung wurde erfolgreich durgeführt. Sie können fortfahren, um die App zu nutzen.","Send":"Senden","Sign In":"Anmelden","Sign Up":"Registrieren","Something wrong has happened.":"Leider ist ein Fehler aufgetreten","Thank you for the message. User feedback is very important for us.":"Vielen Dank für Ihre gesendeten Informationen. Feedback der Benutzer ist für uns unbezahlbar.","Thank you for your rating.":"Vielen Dank für Ihre Einschätzung.","Too difficult":"zu schwierig","Too easy":"zu einfach","Username":"Benutzername","Write to us":"Schreiben Sie uns","Your answer helps us adjust difficulty of questions.":"Mit ihrer Antwort helfen sie uns die Schwierigkeit der Fragen anzupassen","Your e-mail address (optional)":"Ihre E-Mail-Adresse","and get all the benefits of registered users.":"und genießen Sie alle Vorteile der registrierten Benutzer.","via E-mail":"per E-Mail","via Facebook":"via Facebook","via Google":"via Google"});
    gettextCatalog.setStrings('en', {"Did you find a bug in the app? Do you have an improvement idea? Or any other comment? We are eager to hear anything you'd like to tell us.":"Did you find a bug in the app? Do you have an improvement idea? Or any other comment? We are eager to hear anything you'd like to tell us.","Don't know / Don't want to rate":"Don't know / Don't want to rate","E-mail":"E-mail","How difficult are the questions?":"How difficult are the questions?","Password":"Password","Password again":"Password again","Registration was successful. You can continue to use the application.":"Registration was successful. You can continue to use the application.","Send":"Send","Sign In":"Sign In","Sign Up":"Sign Up","Something wrong has happened.":"Something wrong has happened.","Thank you for the message. User feedback is very important for us.":"Thank you for the message. User feedback is very important for us.","Thank you for your rating.":"Thank you for your rating.","Too difficult":"Too difficult","Too easy":"Too easy","Username":"Username","Write to us":"Write to us","Your e-mail address (optional)":"Your e-mail address (optional)","and get all the benefits of registered users.":"and get all the benefits of registered users.","via E-mail":"via E-mail","via Facebook":"via Facebook","via Google":"via Google"});
    gettextCatalog.setStrings('es', {"Appropriate":"Adecuado","Close":"Cerrar","Did you find a bug in the app? Do you have an improvement idea? Or any other comment? We are eager to hear anything you'd like to tell us.":"¿Encontraste algún error en el programa? ¿Tienes alguna sugerencia sobre como podemos mejorar? ¿Quieres compartir tu opinión con nosotros? Nos gustaría escuchar lo que tengas que decir.","Don't know / Don't want to rate":"No sé/No quiero calificar","E-mail":"E-mail","How difficult are the questions?":"¿Qué tan difíciles son estas preguntas?","Password":"Contraseña","Password again":"Contraseña de nuevo","Registration was successful. You can continue to use the application.":"Registro exitoso. Puedes continuar usando la aplicación.","Send":"Enviar","Sign In":"Iniciar sesión","Sign Up":"Registrarse","Something wrong has happened.":"Algo malo ha ocurrido.","Thank you for the message. User feedback is very important for us.":"Gracias por tu mensaje. Tu opinión es muy importante para nosotros.","Thank you for your rating.":"Gracias por calificarnos.","Too difficult":"Muy dificil","Too easy":"Muy facil","Username":"Nombre de usuario","Write to us":"Sugerencias","Your answer helps us adjust difficulty of questions.":"Tu respuesta ayuda a ajustar la dificultad de las preguntas.","Your e-mail address (optional)":"Tu e-mail (opcional)","and get all the benefits of registered users.":"y accede a todos los benecifios de un usuario registrado.","via E-mail":"con E-mail","via Facebook":"con Facebook","via Google":"con Google"});
/* jshint +W100 */
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

var m = angular.module('proso.apps.common-logging', ['proso.apps.common-config']);

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

m.factory("serverLogger", [function() {

    var self = this;
    var processing = {};

    self.debug = function(message, data) {
        self.log(message, data, "debug");
    };

    self.info = function(message, data) {
        self.log(message, data, "info");
    };

    self.warn = function(message, data) {
        self.log(message, data, "warn");
    };

    self.error = function(message, data) {
        self.log(message, data, "error");
    };

    self.log = function(message, data, level) {
        var jsonEvent = {
            message: message,
            level: level
        };
        if (data !== undefined) {
            jsonEvent['data'] = data;
        }
        var eventKey = angular.toJson(jsonEvent);
        if (processing[eventKey]) {
            return;
        }
        processing[eventKey] = true;
        $.ajax({
            type: "POST",
            url: "/common/log/",
            beforeSend: function (request) {
                request.setRequestHeader("X-CSRFToken", self.cookie('csrftoken'));
            },
            contentType: "application/json",
            data: angular.toJson(jsonEvent)
        }).always(function() {
            delete processing[eventKey];
        });
    };

    self.cookie = function(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    return self;
}]);

m.config(["$provide", function($provide) {
    var configService;
    $provide.decorator("$exceptionHandler", ["serverLogger", "$injector", "$delegate", function(serverLogger, $injector, $delegate) {
        return function(exception, cause) {
            configService = configService || $injector.get("configService");
            $delegate(exception, cause);
            if (configService.getConfig("proso_common", "logging.js_errors", false)) {
                serverLogger.error(exception.message, {'stack': exception.stack.split('\n').map(function (line) { return line.trim(); })});
            }
        };
    }]);
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

var m = angular.module('proso.apps.common-toolbar', ['ngCookies', 'proso.apps.common-config']);

m.controller("ToolbarController", ['$scope', '$cookies', 'configService', 'loggingService', '$timeout', '$http', function($scope, $cookies, configService, loggingService, $timeout, $http) {
    $scope.override = configService.override;
    $scope.removeOverridden = configService.removeOverridden;
    $scope.date = new Date();
    $scope.debugLog = [];
    $scope.opened = $cookies["toolbar:opened"] === "true";
    $scope.maximized = $cookies["toolbar:maximized"] === "true";
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

    $scope.$watch("maximized", function(n, o){
        $cookies["toolbar:maximized"] = n;
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
            $http.get('/configab/experiments', {params: {filter_column: 'is_enabled', filter_value: true, stats: true, learning_curve_length: 5}})
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
                    $scope.drawABTestingBar();
                });
        }
        $scope.drawABTestingBar();
    };
    
    var getFlashcardFilterParams = function(){
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
        return params;
    };

    $scope.showFlashcardsPractice = function() {
        $scope.flashcardsAnswers = [];
        var params = getFlashcardFilterParams();

        $http.get('/flashcards/practice_image', {params: params}).success(function(response) {
            document.getElementById("flashcardsChart").innerHTML = response;
        });
    };

    $scope.showFlashcardsAnswers = function() {
        var params = getFlashcardFilterParams();

        document.getElementById("flashcardsChart").innerHTML = '';
        $http.get('/flashcards/answers', {params: params}).success(function(response) {
            $scope.flashcardsAnswers = response.data;
        });
    };

    $scope.drawABTestingBar = function(column) {
        if (!$scope.abExperiment) {
            return;
        }
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Experiment Setup');
        data.addColumn('number', 'Number of Answers');
        data.addColumn({type: 'number', role: 'interval'});
        data.addColumn({type: 'number', role: 'interval'});
        data.addColumn('number', 'Number of Users');
        data.addColumn('number', 'Returning Chance');
        data.addColumn({type: 'number', role: 'interval'});
        data.addColumn({type: 'number', role: 'interval'});
        data.addRows($scope.abExperiment.setups.map(function(setup) {
            return [
                'Setup #' + setup.id,
                setup.stats.number_of_answers.value,
                setup.stats.number_of_answers.confidence_interval.min,
                setup.stats.number_of_answers.confidence_interval.max,
                setup.stats.number_of_users,
                setup.stats.returning_chance.value,
                setup.stats.returning_chance.confidence_interval.min,
                setup.stats.returning_chance.confidence_interval.max,
            ];
        }));
        var view = data;
        var title = 'All';
        if (column) {
            var columns = {
                number_of_answers: [0, 1, 2, 3],
                number_of_users: [0, 4],
                returning_chance: [0, 5, 6, 7],
            };
            title = column;
            view = new google.visualization.DataView(data);
            view.setColumns(columns[column]);
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
            intervals: {
                styel: 'bars',
                pointSize: 10,
                barWidth: 0,
                lineWidth: 4,
            },
            chartArea: {'width': '80%', 'height': '80%'}
        };
        chart.draw(view, options);
    };

    $scope.drawABTestingLearning = function(all_users) {
        if (!$scope.abExperiment) {
            return;
        }
        var learning_curve_accessor = 'learning_curve';
        if (all_users) {
            learning_curve_accessor = 'learning_curve_all_users';
        }
        var data = new google.visualization.DataTable();
        data.addColumn({type: 'number', role: 'domain'});
        var length = 0;
        $scope.abExperiment.setups.forEach(function(setup) {
            data.addColumn('number', 'Setup #' + setup.id);
            data.addColumn({type: 'number', role: 'interval'});
            data.addColumn({type: 'number', role: 'interval'});
            length = Math.max(setup.stats[learning_curve_accessor].success.length);
        });
        var rows = [];
        for (var i = 0; i < length; i++) {
            var row = [i];
            /*jshint -W083 */
            $scope.abExperiment.setups.forEach(function(setup) {
                row.push(setup.stats[learning_curve_accessor].success[i].value);
                row.push(setup.stats[learning_curve_accessor].success[i].confidence_interval.min);
                row.push(setup.stats[learning_curve_accessor].success[i].confidence_interval.max);
            });
            rows.push(row);
        }
        data.addRows(rows);
        var chart = new google.visualization.LineChart(document.getElementById("abChart"));
        var options = {
            title: 'Learning',
            legend: {
                position: 'none'
            },
            vAxis: {
                format: '#.###'
            },
            hAxis: {
                title: 'Attempt',
                position: 'center'
            },
            intervals: {
                style: 'area',
                fillOpacity: 0.2
            },
            lineWidth: 4,
            pointSize: 10,
            curveType: 'function',
            width: 480,
            height: 300,
            'chartArea': {'width': '80%', 'height': '80%'}
        };
        chart.draw(data, options);
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
                    'chartArea': {'width': '80%', 'height': '80%'}
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
        $scope.recommendationOutput = 'Loading...';
        $http.get('/models/recommend_users', {params: filter})
            .success(function (response) {
                if (response.data.length > 0) {
                    $scope.recommendationOutput = response.data[0];
                } else {
                    $scope.recommendationOutput = 'Not Found';
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

var m = angular.module('proso.apps.concept-concept', []);
m.service("conceptService", ["$http", "$q", function($http, $q) {
    var self = this;
    var concepts = null;
    var conceptsPromise = null;
    var userStats = null;
    var userStatsPromise = null;

    var _getConcepts = function () {
        if (conceptsPromise){
            return conceptsPromise;
        }
        conceptsPromise = $http.get("/concepts/concepts?all=True")
            .success(function(response){
                concepts = response.data;
                angular.forEach(concepts, function (concept) {
                    concept.tags_raw = [];
                    angular.forEach(concept.tags, function (tag) {
                        concept.tags_raw.push(tag.type + ':' + tag.value);
                    });
                });
            }).error(function(){
                console.error("Error while loading concepts from backend");
            });
        return conceptsPromise;
    };

    var _getUserStats = function () {
        if (userStatsPromise){
            return userStatsPromise;
        }
        userStatsPromise = $http.get("/concepts/user_stats")
            .success(function(response){
                userStats = response.data;
            }).error(function(){
                console.error("Error while loading user stats from backend");
            });
        return userStatsPromise;
    };

    // get all concepts
    self.getConcepts = function () {
        return $q(function(resolve, reject) {
            if (concepts !== null) {
                resolve(angular.copy(concepts));
            } else {
                _getConcepts()
                    .success(function(){
                        resolve(angular.copy(concepts));
                    }).error(function(){
                        reject("Error while loading concepts from backend");
                });
            }
        });
    };

    self.getUserStats = function (getFromServer) {
        return $q(function(resolve, reject) {
            if (userStats !== null && !getFromServer ) {
                resolve(angular.copy(userStats));
            } else {
                userStatsPromise = null;
                _getUserStats()
                    .success(function(){
                        resolve(angular.copy(userStats));
                    }).error(function(){
                    reject("Error while loading userStats from backend");
                });
            }
        });
    };

    // get all concepts containing all provided tags (form 'type:value')
    self.getConceptsWithTags = function (tags) {
        if (typeof tags !== 'object'){
            tags = tags ? [tags] : [];
        }
        return $q(function(resolve, reject) {
            self.getConcepts().then(
                function (concepts) {
                    var filtered_concepts = [];
                    angular.forEach(concepts, function (concept) {
                        var isIn = true;
                        angular.forEach(tags, function (tag) {
                            if (concept.tags_raw.indexOf(tag) === -1){
                                isIn = false;
                            }
                        });
                        if (isIn){
                            filtered_concepts.push(concept);
                        }
                    });
                    resolve(filtered_concepts);
                }, function (msg) {
                    reject(msg);
            });
        });
    };

    var getConceptByParam = function (param, value) {
        return $q(function(resolve, reject) {
            self.getConcepts().then(
                function (concepts) {
                    var found_concept = {};
                    angular.forEach(concepts, function (concept) {
                        if (concept[param] === value){
                            found_concept = concept;
                        }
                    });
                    resolve(found_concept);
                }, function (msg) {
                    reject(msg);
                });
        });
    };

    self.getConceptByName = function (name) {
        return getConceptByParam('name', name);
    };

    self.getConceptByIdentifier = function (identifier) {
        return getConceptByParam('identifier', identifier);
    };

    self.getConceptByQuery = function (query) {
        return getConceptByParam('identifier', query);
    };

    self.getUserStatsBulk = function (users) {
        return $http.get("/concepts/user_stats_bulk", {params: {users: JSON.stringify(users)}});
    };
}]);
var m = angular.module('proso.apps.feedback-comment', ['ui.bootstrap', 'gettext']);

m.directive('feedbackComment', ['$modal', '$window', 'gettextCatalog', function ($modal, $window, gettextCatalog) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            $scope.feedback = {
                email: '@',
                text: '',
            };

            $scope.openFeedback = function () {
                if (attrs.email) {
                    $scope.feedback.email = attrs.email;
                }
                if (attrs.text) {
                    $scope.feedback.text = attrs.text;
                }

                $modal.open({
                    templateUrl: 'templates/feedback-comment/comment.html',
                    controller: ModalFeedbackCtrl,
                    size: 'lg',
                    resolve: {
                        feedback: function () {
                            return $scope.feedback;
                        }
                    }
                });
            };

            var ModalFeedbackCtrl = ['$scope', '$modalInstance', '$http', '$cookies', '$location', 'feedback', 'gettextCatalog',
                function ($scope, $modalInstance, $http, $cookies, $location, feedback, gettextCatalog) {

                $scope.feedback = feedback;
                $scope.alerts = [];

                $scope.send = function() {
                    feedback.page = $location.absUrl();
                    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
                    $http.post('/feedback/feedback/', feedback).success(function(data){
                        $scope.alerts.push({
                            type : 'success',
                            msg : gettextCatalog.getString('Thank you for the message. User feedback is very important for us.'),
                        });
                        $scope.sending = false;
                        feedback.text = '';
                    }).error(function(){
                        $scope.alerts.push({
                            type : 'danger',
                            msg : gettextCatalog.getString("Something wrong has happened."),
                        });
                        $scope.sending = false;
                    });
                    $scope.sending = true;
                };

                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }];

            element.bind('click', $scope.openFeedback);
        }
    };
}]);

var m = angular.module('proso.apps.feedback-rating', ['ui.bootstrap', 'gettext']);

m.controller('RatingModalController', ['$scope', '$rootScope', '$modal', function ($scope, $rootScope, $modal) {

    $scope.open = function() {
        if ($scope.email) {
            $scope.feedback.email = $scope.email;
        }

        $modal.open({
            templateUrl: 'templates/feedback-rating/rating.html',
            controller: 'RatingModalInstanceController',
            size: 'lg',
            resolve: {
                feedback: function () {
                    return $scope.feedback;
                }
            }
        });
    };

    $rootScope.$on('openRatingModal', function(event, args) {
        $scope.open();
    });
}]);

m.controller('RatingModalInstanceController', ['$scope', '$modalInstance', '$http', '$cookies', 'gettextCatalog', function($scope, $modalInstance, $http, $cookies, gettextCatalog) {

    $scope.alerts = [];

    $scope.vote = function(answer) {
        $scope.answer = answer;
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        $http.post('/feedback/rating/', {'value': answer}).success(function(data){
            $scope.alerts.push({
                type : 'success',
                msg : gettextCatalog.getString('Thank you for your rating.'),
            });
            $scope.sending = false;
        }).error(function(){
            $scope.alerts.push({
                type : 'danger',
                msg : gettextCatalog.getString("Something wrong has happened."),
            });
            $scope.sending = false;
        });
        $scope.sending = true;
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
        $modalInstance.dismiss('cancel');
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);

m.directive('ratingModal', ['$window', function ($window) {
    return {
        restrict: 'E',
        controller: 'RatingModalController',
    };
}]);


var m = angular.module('proso.apps.models-practice', ['ngCookies', 'proso.apps.common-config']);
m.service("practiceService", ["$http", "$q", "configService", "$cookies", function($http, $q, configService, $cookies){
    var self = this;

    var queue = [];
    var deferredQuestion = null;
    var promiseResolvedTmp = false;
    var currentQuestion = null;
    var answerQueue = [];

    var config = {};
    var current = 0;
    var setId = 0;
    var summary = {};

    var contexts = {};

    var loadingQuestions = false;

    // called on create and set reset
    self.initSet = function(configName){
        self.flushAnswerQueue();
        var key = "practice." + configName + ".";
        config.set_length = configService.getConfig("proso_models", key + "set_length", 10);
        config.question_queue_size_max = configService.getConfig("proso_models", key + "question_queue_size_max", 1);
        config.question_queue_size_min = configService.getConfig("proso_models", key + "question_queue_size_min", 1);
        config.save_answer_immediately = configService.getConfig("proso_models", key + "save_answer_immediately", false);
        config.cache_context = configService.getConfig("proso_models", key + "cache_context", false);

        self.setFilter({});
        current = 0;
        currentQuestion = null;
        self.clearQueue();
        deferredQuestion = null;
        setId++;
        summary = {
            questions: [],
            answers: [],
            correct: 0,
            count: 0
        };
    };

    self.setFilter = function(filter){
        config.filter = {
            filter: [],
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
    self.saveAnswer = function(answer, forceSave){
        if (answer) {
            answer.time = Date.now();
            answerQueue.push(answer);
            summary.answers.push(answer);
            summary.count++;
            if (answer.flashcard_id === answer.flashcard_answered_id) {
                summary.correct++;
            }
        }

        if (config.save_answer_immediately || forceSave || current >= config.set_length) {
            if (answerQueue.length > 0) {
                answerQueue.forEach(function(answer){
                    answer.time_gap = Math.round((Date.now() - answer.time) / 1000);
                    delete answer.time;
                });
                $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
                $http.post("/models/answer/", {answers: answerQueue}, {params: _getFilter(['avoid', 'limit'])})
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

    // build answer from current question and save
    self.saveAnswerToCurrentQuestion = function(answeredId, responseTime, meta, extra){
        if (!currentQuestion) {
            console.error("There is no current flashcard");
            return;
        }
        var answer = {
            response_time: responseTime,
            answer_class: currentQuestion.answer_class
        };
        if (currentQuestion.answer_class === "flashcard_answer"){
            answer.flashcard_id = currentQuestion.payload.id;
            answer.flashcard_answered_id = answeredId;
            answer.question_type = currentQuestion.question_type;
        }
        if (currentQuestion.answer_class === "task_answer"){
            answer.task_instance_id = currentQuestion.payload.id;
            answer.correct = answeredId === currentQuestion.payload.id;
        }
        if (meta) {
            answer.meta = {client_meta: meta};
        }
        if (currentQuestion.practice_meta) {
            if (answer.meta) {
                answer.meta = angular.extend(answer.meta, currentQuestion.practice_meta);
            } else {
                answer.meta = currentQuestion.practice_meta;
            }
        }
        if (currentQuestion.payload.options && currentQuestion.payload.options.length){
            answer.option_ids = [];
            currentQuestion.payload.options.forEach(function(o){
                if (o.id !== currentQuestion.payload.id) {
                    answer.option_ids.push(o.id);
                }
            });
        }
        if (extra){
            answer = angular.extend(answer, extra);
        }
        self.saveAnswer(answer);
    };

    // return promise of question
    self.getQuestion = function(){
        if(deferredQuestion){
            return $q(function(resolve, reject){
                reject("Already one question promised");
            });
        }
        deferredQuestion  = $q.defer();
        promiseResolvedTmp = false;
        _resolvePromise();
        deferredQuestion.promise.then(function(){ deferredQuestion = null;}, function(){ deferredQuestion = null;});
        return deferredQuestion.promise;
    };

    self.clearQueue = function(){
        queue = [];
    };

    // preload questions
    self.preloadQuestions = function(){
        _loadQuestions();
    };

    self.getQuestionQueue = function(){
        return queue;
    };

    self.getAnswerQueue = function(){
        return answerQueue;
    };

    self.getSummary = function(){
        var s = angular.copy(summary);
        for (var i = 0; i < Math.min(s.questions.length, s.answers.length); i++){
            var answer = s.answers[i];
            var question = s.questions[i];
            if (question.id === answer.flashcard_id){
                question.answer = answer;
            }
            answer.correct = answer.flashcard_id === answer.flashcard_answered_id;
        }
        return s;
    };


    var _loadQuestions = function(){
        if (loadingQuestions){
            return;                             // loading request is already running
        }

        if (queue.length >= config.question_queue_size_min) { return; }                                       // if there are some questions queued
            config.filter.limit  = config.question_queue_size_max - queue.length;
        if (deferredQuestion && !promiseResolvedTmp) { config.filter.limit ++; }                  // if we promised one question
        config.filter.limit = Math.min(config.filter.limit, config.set_length - current - queue.length);  // check size of set
        if (config.filter.limit === 0) {return;}                         // nothing to do
        config.filter.avoid = currentQuestion && currentQuestion.payload ? [currentQuestion.payload.item_id] : [];      // avoid current question
        queue.forEach(function(question){
            config.filter.avoid.push(question.payload.item_id);
        });

        var filter = _getFilter();
        var request;
        if (answerQueue.length === 0) {
            request = $http.get("/models/practice/", {params: filter});
        }else{
            $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
            request = $http.post("/models/practice/", {answers: answerQueue}, {params: filter});
            answerQueue = [];
        }
        var request_in_set = setId;
        loadingQuestions = true;
        request
            .success(function(response){
                loadingQuestions = false;
                if (request_in_set !== setId) {
                    return;
                }
                queue = queue.concat(response.data);
                _loadContexts();
                if (queue.length > 0) {
                    _resolvePromise();
                }
                else{
                    console.error("No Questions to practice");
                }
            })
            .error(function (response) {
                loadingQuestions = false;
                if (deferredQuestion !== null){
                    deferredQuestion.reject("Something went wrong while loading questions from backend.");
                }
                console.error("Something went wrong while loading questions from backend.");
            });
    };

    var _loadContexts = function(){
        if (config.cache_context){
            queue.forEach(function(question){
                if (question.payload.context_id in contexts){
                    if (contexts[question.payload.context_id] !== "loading"){
                        question.payload.context = contexts[question.payload.context_id];
                    }
                }else{
                    contexts[question.payload.context_id] = "loading";
                    $http.get("/flashcards/context/" + question.payload.context_id, {cache: true})
                        .success(function(response){
                            contexts[question.payload.context_id] = response.data;
                            _resolvePromise();
                        }).error(function(){
                            delete contexts[question.payload.context_id];
                            console.error("Error while loading context from backend");
                        });
                }
            });
        }
    };

    var _resolvePromise = function(){
        if (deferredQuestion === null){
            return;
        }
        if (config.set_length === current){
            deferredQuestion.reject("Set was completed");
            return;
        }
        if (queue.length > 0) {
            if (config.cache_context){
                if (typeof contexts[queue[0].payload.context_id]  === 'object'){
                    queue[0].payload.context = contexts[queue[0].payload.context_id];
                }else{
                    return;
                }
            }
            currentQuestion = queue.shift();
            current++;
            promiseResolvedTmp = true;
            summary.questions.push(currentQuestion);
            deferredQuestion.resolve(currentQuestion);
        }
        _loadQuestions();
    };

    var _getFilter = function(ignore) {
        if (!ignore) {
            ignore = [];
        }
        var filter = {};
        for (var key in config.filter){
            if (ignore.indexOf(key) !== -1) {
                continue;
            }
            if (config.filter[key] instanceof Array) {
                filter[key] = JSON.stringify(config.filter[key]);
            }else{
                filter[key] = config.filter[key];
            }
        }
        if (config.cache_context){
            filter.without_contexts = 1;
        }
        return filter;
    };
}]);

var m = angular.module('proso.apps.models-userStats', ['ngCookies']);
m.service("userStatsService", ["$http", "$cookies", function($http, $cookies){
    var self = this;

    var filters = {
      filters: {},
    };

    self.addGroup = function (id, data) {
        if (!data.language){
            delete data.language;
        }
        filters.filters[id] = data;
    };

    self.addGroupParams = function (id, filter, language) {
        filters.filters[id] = filter;
        if (typeof language !== "undefined"){
            filters.language = language;
        }
    };

    self.getToPracticeCounts = function(){
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        return $http.post("/models/to_practice_counts/", filters, {cache: true});
    };

    self.getStats = function(mastered, username){
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        var params = {filters: JSON.stringify(filters.filters)};
        if (mastered){
            params.mastered = true;
        }
        if (username){
            params.username = username;
        }
        return $http.get("/models/user_stats/", {params: params});
    };

    self.getStatsPost = function(mastered, username){
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        var params = "?";
        params += mastered ? "&mastered=true" : "";
        params += username ? "&username="+username : "";
        return $http.post("/models/user_stats/" + params, filters);
    };

    self.clean = function(){
        filters = {
          filters: {},
        };
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
        var promise = $http.post("/user/signup/", data);
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
        self.status.logged = data.user && data.user.email !== undefined;
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

    self.loginEdookit = function() {
        _openPopup('/login/edookit/', '/user/close_popup/');
    };

    var _openPopup = function(url, next){
        var settings = 'height=700,width=700,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=yes,directories=no,status=yes';
        url += "?next=" + next;
        window.open(url, "popup", settings);
    };

    self.init();

    self.updateClasses = function(){
        self.status.loading = true;
        _resetError();
        var promise = $http.get("/user/classes/");
        promise.success(function(response){
                var classes = response.data;
                angular.forEach(classes, function (cls) {
                    delete cls.owner;
                });
                self.user.profile.owner_of = classes;
            })
            .error(function(response){
                self.error = response;
            })
            .finally(function(response){
                self.status.loading = false;
            });
        return promise;
    };

    self.createClass = function(name, code){
        self.status.loading = true;
        _resetError();
        var promise = $http.post("/user/create_class/", {
            name: name,
            code: code
        });
        promise.success(function(response){
                var cls = response.data;
                delete cls.owner;
                self.user.profile.owner_of.push(cls);
            })
            .error(function(response){
                self.error = response;
            })
            .finally(function(response){
                self.status.loading = false;
            });
        return promise;
    };

    self.joinClass = function (code) {
        self.status.loading = true;
        _resetError();
        var promise = $http.post("/user/join_class/", {
            code: code
        });
        promise.success(function(response){
                self.user.profile.member_of.push(response.data);
            })
            .error(function(response){
                self.error = response;
            })
            .finally(function(response){
                self.status.loading = false;
            });
        return promise;
    };

    self.createStudent = function(data){
        self.status.loading = true;
        _resetError();
        var promise = $http.post("/user/create_student/", data);
        promise.success(function(response){
                angular.forEach(self.user.profile.owner_of, function (cls) {
                    if (cls.id === data.class){
                        cls.members.push(response.data);
                    }
                });
            })
            .error(function(response){
                self.error = response;
            })
            .finally(function(response){
                self.status.loading = false;
            });
        return promise;
    };

    self.loginStudent = function (id) {
        self.status.loading = true;
        _resetError();
        var promise = $http.post("/user/login_student/", {
            student: id
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

}]);

var m = angular.module('proso.apps.user-login', ['ui.bootstrap', 'gettext', 'proso.apps.user-user', 'angulartics', 'angulartics.google.analytics']);

m.controller('LoginController', ['$scope', '$modalInstance', 'signupModal', 'userService', 'gettextCatalog', '$analytics',
    function ($scope, $modalInstance, signupModal, userService, gettextCatalog, $analytics) {

    $scope.credentials = {};
    $scope.alerts = [];

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.loginGoogle = function() {
        $analytics.eventTrack('click', {
            category: 'login',
            label: '/login/google',
        });
        userService.loginGoogle();
    };

    $scope.loginFacebook = function() {
        $analytics.eventTrack('click', {
            category: 'login',
            label: '/login/facebook',
        });
        userService.loginFacebook();
    };

    $scope.loginEmail = function() {
        $analytics.eventTrack('click', {
            category: 'login',
            label: '/login/email',
        });
        userService
            .login($scope.credentials.username, $scope.credentials.password)
            .error($scope.onError)
            .success(function() {
                $scope.cancel();
            });
    };

    $scope.openSignupModal = function() {
        $scope.cancel();
        signupModal.open();
    };

    $scope.signup = function() {
        $analytics.eventTrack('click', {
            category: 'signup',
            label: '/signup/email',
        });
        userService
            .signupParams(
                $scope.credentials.username,
                $scope.credentials.email,
                $scope.credentials.password,
                $scope.credentials.password_check,
                $scope.credentials.first_name,
                $scope.credentials.last_name
            )
            .error($scope.onError)
            .success(function() {
                $modalInstance.close();
            });
    };

    $scope.onError = function(error) {
        $analytics.eventTrack('error', {
            category: 'login',
            label: 'error/login'
        });
        $scope.alerts.push({
            type: error.type || 'danger',
            msg: error.error || gettextCatalog.getString('Something wrong has happened.')
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}]);

m.factory('signupModal', ['$modal', function($modal) {
    return {
        open: function() {
            $modal.open({
                templateUrl: 'templates/user-login/signup-modal.html',
                controller: 'LoginController',
            });
        }
    };
}]);

m.factory('loginModal', ["$modal", function($modal) {
    return {
        open: function() {
            $modal.open({
                templateUrl: 'templates/user-login/login-modal.html',
                controller: 'LoginController',
            });
        }
    };
}]);

m.directive('loginButton', ['loginModal', function(loginModal) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.bind('click', function(){
                loginModal.open();
            });
        }
    };
}]);

var m = angular.module('proso.apps.user-questions', []);
m.factory('userQuestionsService', ["$http", function($http) {
  return {
    getQuestions: function() {
      return $http.get('/user/questions/?all=true');
    },
    getQuestionsToAsk: function() {
      return $http.get('/user/questions_to_ask/');
    },
    saveAnswer: function(question, answer) {
      var answer_dict = {
        question : question.id,
      };
      if (answer && answer.id) {
        answer_dict.closed_answer = answer.id;
      } else if (answer) {
        answer_dict.open_answer = answer;
      }
      var data = {
        answers : [answer_dict],
      };
      return $http.post('/user/answer_question/', data);
    }
  };
}]);

m.directive('userQuestionsBanner', ['userQuestionsService', '$rootScope', 'userService',
    function(userQuestionsService, $rootScope, userService) {
  return {
    restrict: 'A',
    templateUrl : 'templates/user-questions/user_questions_banner.html',
    link: function ($scope) {
      var eventName = 'questionSetFinished';
      $rootScope.$on(eventName, function() {
        var answered_count = userService.user.profile.number_of_answers;
        userQuestionsService.getQuestionsToAsk().success(function(data) {
          $scope.questions = data.data.filter(function(q) {
            return q.on_events && q.on_events[0] &&
              q.on_events[0].type === eventName &&
              q.on_events[0].value <= answered_count &&
              answered_count < q.on_events[0].value + 10;
          });
          $scope.questions = $scope.questions.slice(0, 1);
        });
      });

      $scope.saveUserQuesiton = function(question, answer) {
        if (answer) {
          question.answer = answer;
        }
        question.processing = true;
        userQuestionsService.saveAnswer(
            question, question.answer).success(function(data) {
          question.processing = false;
          question.saved = true;
        }).error(function(data) {
          question.processing = false;
          question.error = true;
        });
      };
    }
  };
}]);


angular.module("templates/common-toolbar/toolbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/common-toolbar/toolbar.html",
    "<div id=\"proso-toolbar\">\n" +
    "    <div id=\"config-bar-show-button\" ng-click=\"opened = !opened\" ng-hide=\"opened\"> proso bar </div>\n" +
    "\n" +
    "    <div id=\"config-bar\" ng-cloak ng-show=\"opened\" ng-class=\"{'maximized' : maximized}\">\n" +
    "        <div id=\"config-bar-header\">\n" +
    "            <span id=\"config-bar-maximize\" ng-click=\"maximized = !maximized\">Maximize</span>\n" +
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
    "            <li style=\"display: none\">\n" +
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
    "                                    <span class=\"variable-name\" title=\"{{ value.variable.app_name }}.{{ value.variable.name }} \">\n" +
    "                                        {{ value.variable.name.split('.').slice(-1)[0] | limitTo: 12 }}{{ value.variable.name.split('.').slice(-1)[0].length > 12 ? '...' : '' }}\n" +
    "                                    </span>\n" +
    "                                    <span class=\"variable-value\" title=\"{{ value.value }}\">{{ value.value.split('.').slice(-1)[0] | limitTo: 12 }} {{ value.value.split('.').slice(-1)[0].length > 12 ? '...' : '' }}</span>\n" +
    "                                    <span class=\"comma\" ng-if=\"!$last\">,</a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                <li>\n" +
    "                <div id=\"abChart\"></div>\n" +
    "                <li>\n" +
    "                    <button ng-click=\"drawABTestingBar()\" class=\"ab-experiment-chart-button\">All</button>\n" +
    "                    <button ng-click=\"drawABTestingBar('number_of_users')\" class=\"ab-experiment-chart-button\">Users</button>\n" +
    "                    <button ng-click=\"drawABTestingBar('number_of_answers')\" class=\"ab-experiment-chart-button\">Answers</button>\n" +
    "                    <button ng-click=\"drawABTestingBar('returning_chance')\" class=\"ab-experiment-chart-button\">Return</button>\n" +
    "                    <button ng-click=\"drawABTestingLearning(false)\" class=\"ab-experiment-chart-button\" title=\"Learning curve containing only users with at least the given number of testing answers\">Learn</button>\n" +
    "                    <button ng-click=\"drawABTestingLearning(true)\" class=\"ab-experiment-chart-button\" title=\"Learning curve containing all users with at least one testing answer\">Learn (A)</button>\n" +
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
    "                                <th>Item</th>\n" +
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
    "                                <td>{{ answer.item_asked_id }}</td>\n" +
    "                                <td>{{ answer.flashcard_asked.identifier | limitTo:12 }} {{ answer.flashcard_answered.identifier.length > 12 ? '...' : '' }}</td>\n" +
    "                                <td ng-class=\"{true: 'correct', false: 'wrong'}[answer.item_asked_id == answer.item_answered_id]\">\n" +
    "                                    {{ answer.flashcard_answered.identifier | limitTo:12 }}{{ answer.flashcard_answered.identifier.length > 12 ? '...' : '' }}\n" +
    "                                </td>\n" +
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

angular.module("templates/feedback-comment/comment.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/feedback-comment/comment.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">{{ \"Write to us\" | translate }}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <label>\n" +
    "      {{ \"Did you find a bug in the app? Do you have an improvement idea? Or any other comment? We are eager to hear anything you'd like to tell us.\" | translate }}\n" +
    "    </label>\n" +
    "    <textarea ng-model=\"feedback.text\" class=\"form-control\" rows=\"8\" ></textarea>\n" +
    "    <label>\n" +
    "      {{ \"Your e-mail address (optional)\" | translate }}\n" +
    "    </label>\n" +
    "    <input type=\"text\" ng-model=\"feedback.email\" class=\"form-control\"/>\n" +
    "    <br>\n" +
    "    <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button ng-disabled=\"sending\" class=\"btn btn-primary\" ng-click=\"send()\">\n" +
    "      {{ \"Send\" | translate }}\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "      {{ \"Close\" | translate }}\n" +
    "    </button>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("templates/feedback-rating/rating.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/feedback-rating/rating.html",
    "<div class=\"modal-header text-center\">\n" +
    "    <h3 class=\"modal-title\">{{ \"How difficult are the questions?\" | translate }}</h3>\n" +
    "    {{ \"Your answer helps us adjust difficulty of questions.\" | translate }}\n" +
    "</div>\n" +
    "<div class=\"rating modal-body\">\n" +
    "    <div class=\" text-center\" ng-hide=\"answer\">\n" +
    "        <a class=\"btn btn-lg btn-success\" ng-click=\"vote(1)\">\n" +
    "            {{\"Too easy\" | translate }}\n" +
    "        </a>\n" +
    "        <a class=\"btn btn-lg btn-primary\" ng-click=\"vote(2)\">\n" +
    "            {{ \"Appropriate\" | translate }}\n" +
    "        </a>\n" +
    "        <a class=\"btn btn-lg btn-danger\" ng-click=\"vote(3)\">\n" +
    "            {{ \"Too difficult\" | translate }}\n" +
    "        </a>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "        <a class=\"pull-right dont-know\" href=\"\" ng-click=\"cancel()\">\n" +
    "            {{ \"Don't know / Don't want to rate\" | translate }}\n" +
    "        </a>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "    </div>\n" +
    "    <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\" ng-show=\"answer\">\n" +
    "    <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "        {{ \"Close\" | translate }}\n" +
    "    </button>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("templates/user-login/login-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-login/login-modal.html",
    "<div class=\"modal-header text-center\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"cancel()\">\n" +
    "        <span aria-hidden=\"true\">&times;</span>\n" +
    "    </button>\n" +
    "    <h3 class=\"modal-title\"> {{ \"Sign In\" | translate }} </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <a class=\"btn btn-danger btn-lg btn-block\"\n" +
    "        track-click=\"login\"\n" +
    "        href=\"/login/google-oauth2/\">\n" +
    "        <i class=\"social-google\"></i> {{ \"via Google\" | translate }}\n" +
    "    </a>\n" +
    "    <br>\n" +
    "    <a class=\"btn btn-primary btn-lg btn-block\"\n" +
    "        track-click=\"login\"\n" +
    "        href=\"/login/facebook/\">\n" +
    "        <i class=\"social-facebook\"></i>{{ \"via Facebook\" | translate }}\n" +
    "    </a>\n" +
    "\n" +
    "    <br>\n" +
    "    <hr>\n" +
    "    <br>\n" +
    "\n" +
    "    <form role=\"form\" ng-submit=\"loginEmail()\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"credentials.username\"\n" +
    "            name=\"username\" placeholder=\"{{ 'Username' | translate }}\">\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"password\" class=\"form-control\" ng-model=\"credentials.password\"\n" +
    "            name=\"password\" placeholder=\"{{ 'Password' | translate }}\">\n" +
    "        </div>\n" +
    "        <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\"\n" +
    "            close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "        <button ng-disabled=\"userService.status.loading\" type=\"submit\"\n" +
    "            class=\"btn btn-primary btn-block btn-lg\">\n" +
    "            {{ 'Sign In' | translate }}\n" +
    "        </button>\n" +
    "\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\" >\n" +
    "        <a class=\"btn btn-link\" ng-click=\"openSignupModal()\">\n" +
    "            {{ 'Sign Up' | translate }}\n" +
    "        </a>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/user-login/signup-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-login/signup-modal.html",
    "<div class=\"modal-header text-center\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"cancel()\">\n" +
    "        <span aria-hidden=\"true\">&times;</span>\n" +
    "    </button>\n" +
    "    <h3 class=\"modal-title\"> {{ \"Sign Up\" | translate }} </h3>\n" +
    "    <div ng-hide=\"success\">\n" +
    "        {{\"and get all the benefits of registered users.\" | translate }}\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" ng-hide=\"success\">\n" +
    "    <div ng-hide=\"activateEmail\">\n" +
    "        <a class=\"btn btn-danger btn-lg btn-block\"\n" +
    "            track-click=\"login\"\n" +
    "            href=\"/login/google-oauth2/\">\n" +
    "            <i class=\"social-google\"></i> {{ \"via Google\" | translate }}\n" +
    "        </a>\n" +
    "        <br>\n" +
    "        <a class=\"btn btn-primary btn-lg btn-block\"\n" +
    "            track-click=\"login\"\n" +
    "            href=\"/login/facebook/\">\n" +
    "            <i class=\"social-facebook\"></i>{{ \"via Facebook\" | translate }}\n" +
    "        </a>\n" +
    "        <br>\n" +
    "        <a class=\"btn btn-info btn-lg btn-block\"\n" +
    "            ng-click=\"activateEmail=true\"\n" +
    "            href=\"\">\n" +
    "            <i class=\"glyphicon glyphicon-envelope\"></i> {{ \"via E-mail\" | translate }}\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <form role=\"form\" ng-show=\"activateEmail\" ng-submit=\"signup()\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"email\" class=\"form-control\" ng-model=\"credentials.email\"\n" +
    "                placeholder=\"{{ 'E-mail' | translate }}\" required>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"credentials.username\"\n" +
    "                name=\"username\" placeholder=\"{{ 'Username' | translate }}\" required>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"password\" class=\"form-control\" ng-model=\"credentials.password\"\n" +
    "                name=\"password\" placeholder=\"{{ 'Password' | translate }}\" required>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <input type=\"password\" class=\"form-control\"\n" +
    "                ng-model=\"credentials.password_check\"\n" +
    "                placeholder=\"{{ 'Password again' | translate }}\" required>\n" +
    "        </div>\n" +
    "        <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\"\n" +
    "            close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "        <button ng-disabled=\"userService.status.loading\" type=\"submit\" class=\"btn btn-primary btn-block btn-lg\">\n" +
    "            {{ 'Sign Up' | translate }}\n" +
    "        </button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" ng-show=\"success\" >\n" +
    "        <alert type=\"success\">\n" +
    "            {{ 'Registration was successful. You can continue to use the application.' | translate }}\n" +
    "        </alert>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("templates/user-questions/user_questions_banner.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-questions/user_questions_banner.html",
    "<div class=\"bottom-alert text-center alert alert-{{question.saved ? 'success' : 'info'}} form-inline\"\n" +
    "  ng-repeat=\"question in questions\"\n" +
    "  ng-if=\"!userService.status.loading && userService.user.profile.number_of_answers >= 2\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"\n" +
    "      track-click=\"close user question banner\">\n" +
    "    <span aria-hidden=\"true\">&times;</span>\n" +
    "    <span class=\"sr-only\" translate>Close</span>\n" +
    "  </button>\n" +
    "  <div ng-if=\"!question.saved\">\n" +
    "    <span>\n" +
    "    {{question.content}}\n" +
    "    </span>\n" +
    "    <input ng-model=\"question.answer\"\n" +
    "      ng-if=\"question.answer_type != 'c'\"\n" +
    "      class=\"form-control\"\n" +
    "      typeahead-min-length=\"0\"\n" +
    "      typeahead=\"option as option.content for option in question.possible_answers |\n" +
    "        filter:{content: $viewValue} |\n" +
    "        limitTo:($viewValue.length ? $viewValue.length * 2 : 2)\">\n" +
    "    </input>\n" +
    "    <span ng-model=\"question.answer\"\n" +
    "      ng-repeat=\"option in question.possible_answers\"\n" +
    "      ng-if=\"question.answer_type == 'c'\"\n" +
    "      ng-bind=\"option.content\"\n" +
    "      ng-click=\"saveUserQuesiton(question, option)\"\n" +
    "      class=\"btn btn-default\">\n" +
    "    </span>\n" +
    "    <a href=\"\"\n" +
    "       class=\"btn btn-primary\"\n" +
    "       ng-if=\"question.answer_type != 'c'\"\n" +
    "       track-click=\"user question banner\"\n" +
    "       ng-click=\"saveUserQuesiton(question)\"\n" +
    "       ng-disabled=\"question.processing || !question.answer\"\n" +
    "      >\n" +
    "      <span translate ng-if=\"question.processing\">Saving...</span>\n" +
    "      <span translate ng-if=\"!question.processing\">Save</span>\n" +
    "    </a>\n" +
    "    <div ng-if=\"question.answer_type == 'm'\">\n" +
    "    <br> <br> <br> <br>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-if=\"question.saved\" translate>\n" +
    "    Thank you for your response.\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
!angular.$$csp() && angular.element(document).find('head').prepend('<style type="text/css">#config-bar-show-button{position:fixed;right:-40px;top:250px;width:100px;transform:rotate(-90deg);-webkit-transform:rotate(-90deg);border:solid #808080 1px;margin:0;padding:10px;text-transform:capitalize;font-weight:bold;background-color:rgba(255,255,255,0.8);transition:all 0.2s;cursor:pointer;text-align:center;z-index:1000;}#config-bar-show-button:hover{background-color:#1f8dd6;color:white;}#config-bar{position:fixed;right:0;top:0;bottom:0;width:500px;border-left:solid #808080 1px;background-color:rgba(255,255,255,0.8);z-index:1000;}#config-bar.maximized{width:100%;}#config-bar-header{background-color:rgba(31,141,214,0.8);margin:0;padding:5px 10px;text-align:right;color:white;}#config-bar-content .section{background-color:rgba(31,141,214,0.8);margin:5px 0;padding:5px 10px;color:white;text-transform:uppercase;cursor:pointer;}#config-bar-maximize{text-align:right;cursor:pointer;margin-right:20px;}#config-bar-hide{text-align:right;width:100%;cursor:pointer;}#config-bar-content{margin:0;list-style:none;padding:0;}#config-bar-content > li{border-bottom:1px dashed #E9F4FB;padding:5px 10px;margin:0;}#config-bar-content > li:hover{background:#E9F4FB;}#config-bar-content .reset,#config-bar-content .add-to-override{cursor:pointer;font-weight:bolder;}#config-bar-content input{padding:5px 10px;}#config-bar-content label{margin-left:10px;cursor:pointer;}#config-bar-content .link{text-transform:uppercase;cursor:pointer;font-weight:bold;}#config-bar-logging{list-style:none;margin:0;padding:0;max-height:500px;overflow-y:scroll;font-size:12px;}#config-bar-logging > li{margin:0;padding:5px 10px;border-bottom:1px solid #E9F4FB;}#config-bar-logging > li:hover{background-color:#E9F4FB;}#config-bar-logging .level{display:block;float:left;width:10%;font-weight:bold;}#config-bar-logging .url{font-weight:bold;margin-left:10px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:50%;float:left;}#config-bar-logging .filename{display:block;float:right;text-align:right;width:30%;font-weight:bold;}#config-bar-logging .message{display:block;clear:both;margin-top:20px;margin-bottom:5px;}#config-bar-content .property-name{width:70%;}#config-bar-content .property-value{width:10%;text-align:center;}#config-bar-property-name{width:70%;}#config-bar-audit,#config-bar-ab,#config-bar-flashcards,#config-bar-recommendation{padding-left:5px;}#config-bar-audit li,#config-bar-ab li,#config-bar-flashcards li,#config-bar-recommendation li{padding-left:0;margin-left:0;list-style:none;margin-bottom:5px;}#config-bar-ab ul{padding-left:0;margin-left:0;}.ab-experiment-chart-button{font-size:13px;width:15%;}#config-bar-audit input,#config-bar-flashcards input,#config-bar-recommendation input{width:27%;}#config-bar-audit button,#config-bar-flashcards button,#config-bar-recommendation button{width:27%;}#auditChart{margin:10px auto;width:480px;}#abChart{margin:0 auto;width:480px;}#flashcardsChart{margin:0 auto;width:100%;height:1000px;}#abExperimentName{margin-left:20px;font-weight:bold;}#abSetupInfo > li > ul,#abSetupInfo > li > ul > li{display:inline;}#flashcardsAnswers{width:100%;}#flashcardsAnswers thead{color:#fff;background-color:rgba(31,141,214,0.8);}#flashcardsAnswers th,#flashcardsAnswers td{text-align:center;}#flashcardsAnswers tbody tr:nth-child(even){background-color:#E9F4FB;}#flashcardsAnswers tbody tr:nth-child(odd){background-color:#fff;}#flashcardsAnswers td.correct{background-color:#009933;color:white;}#flashcardsAnswers td.wrong{background-color:#cc0000;color:white;}#flashcardsAnswers td.direction-t2d{background-color:#ff9900;color:white;}#flashcardsAnswers td.direction-d2t{background-color:#ffff00;}</style>');
!angular.$$csp() && angular.element(document).find('head').prepend('<style type="text/css">.rating .btn{margin:20px;}</style>');