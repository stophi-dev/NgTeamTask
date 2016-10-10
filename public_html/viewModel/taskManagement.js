/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

(function (app) {
    app.TaskManagement = function (users) {
        var self = this;
        self.users = users || [];
        var unassignedTasks = [];

        self.getTasksForUserId = function (userId) {
            return self.getUserById(userId).tasks;
        };

        self.assignTaskToUser = function (taskId, userId, taskPosition) {
            var task = self.getTaskById(taskId);
            var user = self.getUserById(userId);

            self.deleteTask(taskId);
            
            if (typeof taskPosition === typeof undefined) {
                user.tasks.push(task);
            } else {
                user.tasks.splice(taskPosition, 0, task);
            }
        };

        /**
         * Delete a task from model
         * @param {number} taskId
         * @returns {boolean} true, if task was found and deleted
         */
        self.deleteTask = function (taskId) {
            var result = false;
            self.users.forEach(function (user) {
                user.removeTaskWithId(taskId);
                result = true;
            });
            unassignedTasks.forEach(function (task, i) {
                if (task.id === taskId) {
                    unassignedTasks.splice(i, 1);
                    result = true;
                }
            });
            return result;
        };

        /**
         * Remove a task from its current container and transfer it to the 'unassigned' list
         * @param {number} taskId unique id of task
         * @param {number|undefined} taskPosition new position of task in list of unassigned tasks
         */
        self.deassignTask = function (taskId, taskPosition) {
            var task = self.getTaskById(taskId);
            self.deleteTask(taskId);

            if (typeof taskPosition === typeof undefined) {
                unassignedTasks.push(task);
            } else {
                unassignedTasks.splice(taskPosition, 0, task);
            }
        };

        self.getUnassignedTasks = function () {
            return unassignedTasks;
        };

        self.getTaskCount = function () {
            return getTasks().length;
        };

        self.addTask = function (task) {
            if (containsItem(task.id, getTasks())) {
                throw new Error('Cannot add new task: ID ' + task.id + ' is already in use');
            }
            unassignedTasks.push(task);
        };

        self.getTaskById = function (taskId) {
            return findItemById(taskId, getTasks(), 'Task');
        };

        self.getUserById = function (userId) {
            return findItemById(userId, self.users, 'User');
        };

        self.log = function () {
            var modelBuilder = [];
            modelBuilder.push('Unassigned tasks\n');
            unassignedTasks.forEach(function(task) {
                modelBuilder.push('    ', 'Task', task.id, ': ', task.title, '\n');
            });
            self.users.forEach(function (user) {
                modelBuilder.push('User ', user.id, ': ', user.getFullName(), '\n');
                self.getTasksForUserId(user.id).forEach(function (task) {
                    modelBuilder.push('    ', 'Task ', task.id, ': ', task.title, '\n');
                });
            });
            modelBuilder.push('\n');
            console.log(modelBuilder.join(''));
        };

        function getTasks() {
            var result = [];
            self.users.forEach(function (user) {
                result = result.concat(user.tasks);
            });
            return result.concat(unassignedTasks);
        }

        function containsItem(id, itemArray) {
            return itemArray.find(function (item) {
                return item.id === id;
            });
        }

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
