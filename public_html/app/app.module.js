/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

/* global ng */

(function (app) {
    app.AppModule =
            ng.core.NgModule({
                imports: [ng.platformBrowser.BrowserModule],
                declarations: [
                    app.AppComponent,
                    app.TeamTaskComponent
                ],
                bootstrap: [app.AppComponent]
            })
            .Class({
                constructor: function () {}
            });
})(window.app || (window.app = {}));