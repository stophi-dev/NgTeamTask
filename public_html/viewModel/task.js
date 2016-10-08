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
        var task = task || {title: '', progress: 0};

        self.id = task.id;
        self.title = task.title;
        self.progress = task.progress;
    };
})(window.app || (window.app = {}));
