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
            return self.getUserById(userId).tasks;
        };

        self.assignTaskToUser = function (taskId, userId, taskPosition) {
            var task = self.getTaskById(taskId);
            var user = self.getUserById(userId);

            self.users.forEach(function (user) {
                user.removeTaskWithId(taskId);
            });

            if (typeof taskPosition === typeof undefined) {
                user.tasks.push(task);
            } else {
                user.tasks.splice(taskPosition, 0, task);
            }
        };

        self.getTaskById = function (taskId) {
            return findItemById(taskId, self.tasks, 'Task');
        };

        self.getUserById = function (userId) {
            return findItemById(userId, self.users, 'User');
        };

        self.logModel = function () {
            var modelBuilder = [];
            self.users.forEach(function (user) {
                modelBuilder.push('User ', user.id, ': ', user.getFullName(), '\n');
                self.getTasksForUserId(user.id).forEach(function (task) {
                    modelBuilder.push('    ', 'Task ', task.id, ': ', task.title, '\n');
                });
            });
            modelBuilder.push('\n');
            console.log(modelBuilder.join(''));
        };

        function findItemById(id, itemArray, itemType) {
            var result = itemArray.find(function (item) {
                return item.id === id;
            });
            if (typeof result === typeof undefined) {
                throw new Error(itemType + ' with ID ' + id + ' not found');
            }
            return result;
        }
    };
})(window.app || (window.app = {}));
