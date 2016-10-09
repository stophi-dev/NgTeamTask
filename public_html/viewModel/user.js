/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

(function (app) {
    app.User = function (user) {
        var self = this;
        var builder = user || {firstName: '', lastName: '', email: '', tasks: []};

        self.id = builder.id;
        self.firstName = builder.firstName;
        self.lastName = builder.lastName;
        self.email = builder.email;
        self.tasks = builder.tasks || [];

        self.getFullName = function () {
            return self.firstName + ' ' + self.lastName;
        };

        self.removeTaskWithId = function (taskId) {
            self.tasks.forEach(function (task, i) {
                if (task.id === taskId) {
                    self.tasks.splice(i, 1);
                }
            });
        };
    };
})(window.app || (window.app = {}));

