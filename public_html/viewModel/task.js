/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

(function (app) {
    app.Task = function (task) {
        var self = this;
        var builder = task || {title: '', progress: 0};

        self.id = builder.id;
        self.title = builder.title;
        self.progress = builder.progress;
    };
})(window.app || (window.app = {}));
