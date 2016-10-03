/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

/* global ng */

(function (app) {
    app.AppComponent =
            ng.core.Component({
                selector: 'my-app',
                templateUrl: 'app/app.component.html'
            })
            .Class({
                constructor: function () {
                    this.title = 'Hello World';
                    this.description = 'This is an Angular demo app based on the Angular "Hello World" tutorial';
                }
            });
})(window.app || (window.app = {}));