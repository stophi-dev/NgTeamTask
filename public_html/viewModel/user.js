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
        var user = user || {firstName: '', lastName: '', email: ''};

        self.id = user.id;
        self.firstName = user.firstName;
        self.lastName = user.lastName;
        self.email = user.email;

        self.getFullName = function () {
            return self.firstName + ' ' + self.lastName;
        };

        self.getUserTasks = function (allTasks) {
            return allTasks.filter(function (task) {
                if (task.user)
                {
                    return task.user ? task.user.id === self.id : false;
                }
            });
        };
    };
})(window.app || (window.app = {}));

