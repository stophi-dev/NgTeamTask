/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

(function (app) {

    /**
     * Fundamental class to model a "Task" entity
     * A "Task" represents a defined scope of work that should be completed
     * by a "User".
     * @returns {undefined}
     */
    app.Task = function () {
        var self = this;

        /**
         * Unique ID of task
         */
        self.id = 0;

        /**
         * Descriptive title of this task
         */
        self.title = '';

        /**
         * Quantity of work units to complete the task
         */
        self.workUnits = 1000;

        /**
         * Work units that are already processed
         */
        self.progress = 0;

        /**
         * Get the calculated progress of this task
         * @returns {number} progress in percent with one decimal.
         */
        self.getProgressInPercent = function () {
            return (100 * self.progress / self.workUnits).toFixed(1);
        };
    };
})(window.app || (window.app = {}));
