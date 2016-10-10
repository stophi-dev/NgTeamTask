/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

(function (app) {
    app.Task = function () {
        var self = this;                

        self.id = 0;
        self.title = '';
        self.workUnits = 1000;
        self.progress = 0;

        self.getProgressInPercent = function () {
            return (100 * self.progress / self.workUnits).toFixed(1);
        };
    };
})(window.app || (window.app = {}));
