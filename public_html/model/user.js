/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

(function (app) {
    /**
     * Fundamental class to model a "User" entity.
     * A "User" represents a person that is able to perform "Task"s
     * @param {type} user user builder
     * @returns {undefined}
     */
    app.User = function (user) {
        var self = this;
        var builder = user || {firstName: '', lastName: '', email: '', tasks: []};

        /**
         * Unique ID of a user
         */
        self.id = builder.id;
        
        self.firstName = builder.firstName;        
        self.lastName = builder.lastName;        
        self.email = builder.email;
        self.tasks = builder.tasks || [];

        /**
         * Get the full name of a user (firstName and lastName)
         * @returns {string} full name
         */
        self.getFullName = function () {
            return self.firstName + ' ' + self.lastName;
        };

        /**
         * Remove a task from this user
         * @param {number} taskId
         * @returns {undefined}
         */
        self.removeTaskWithId = function (taskId) {
            self.tasks.forEach(function (task, i) {
                if (task.id === taskId) {
                    self.tasks.splice(i, 1);
                }
            });
        };
    };
})(window.app || (window.app = {}));

