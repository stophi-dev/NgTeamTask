/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

(function (app) {
    app.TaskManagement = function (users, tasks) {
        var self = this;
        self.users = users || [];
        self.tasks = tasks || [];

        self.getTasksForUserId = function (userId) {
            return self.tasks.filter(function (task) {
                if (task.user)
                {
                    return task.user ? task.user.id === userId : false;
                }
            });
        };

        self.getUnassignedTasks = function () {
            return self.tasks.filter(function(task) {
                return !task.user;
            });
        };                
    };
})(window.app || (window.app = {}));
