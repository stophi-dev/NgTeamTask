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
        var user = user || {firstName: '', lastName: '', email: '', tasks: []};

        self.id = user.id;
        self.firstName = user.firstName;
        self.lastName = user.lastName;
        self.email = user.email;
        self.tasks = user.tasks || [];

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

