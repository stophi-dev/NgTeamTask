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
        var builder = task || {title: '', progress: 0, workUnits: 1000};

        self.id = builder.id;
        self.title = builder.title;
        self.workUnits = builder.workUnits;
        self.progress = builder.progress;

        self.getProgressInPercent = function () {
            return (100 * self.progress / self.workUnits).toFixed(1);
        };
    };
})(window.app || (window.app = {}));
