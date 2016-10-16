/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

(function (app) {
    /**
     * Central model class to associate tasks with users.
     * Basic functions:
     * - Add and delete tasks
     * - Assign a specific task to a user
     * - Deassign a task from a user
     * @param {Array} [users] Array of users
     * @returns {undefined}
     */
    app.TaskManagement = function (users) {
        var self = this;
        var taskIdCounter = 0;
        self.users = users || [];
        var unassignedTasks = [];

        /**
         * Get tasks that are assigned to one specific user
         * @param {number} userId
         * @returns {Array} Array of tasks
         */
        self.getTasksForUserId = function (userId) {
            return self.getUserById(userId).tasks;
        };

        /**
         * Assign a task to a user:
         * - Remove task from its old owner (if any)
         * - Add task to the list of the given user
         * @param {number} taskId
         * @param {number} userId
         * @param {number} [taskPosition] Position of task in new user's task array
         */
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
         * @param {number} [taskPosition] new position of task in list of unassigned tasks
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

        /**
         * Get all tasks that are not assigned to any user.
         * @returns {Array} unassigned tasks
         */
        self.getUnassignedTasks = function () {
            return unassignedTasks;
        };

        /**
         * Get count for all existing tasks
         * @returns {number} 
         */
        self.getTaskCount = function () {
            return getTasks().length;
        };

        /**
         * Add a new and unassigned task 
         * @param {string} taskTitle
         * @returns {object} new task 
         */
        self.addTask = function (taskTitle) {
            var task = new app.Task();
            task.id = taskIdCounter;
            task.title = taskTitle;

            taskIdCounter++;
            unassignedTasks.push(task);
            return task;
        };

        self.getTaskById = function (taskId) {
            return findItemById(taskId, getTasks(), 'Task');
        };

        self.getUserById = function (userId) {
            return findItemById(userId, self.users, 'User');
        };

        /**
         * Log a string representation of task and user model to the console
         */
        self.log = function () {
            var modelBuilder = [];
            modelBuilder.push('Unassigned tasks\n');
            unassignedTasks.forEach(function (task) {
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

        /**
         * Get all existing tasks (unassigned plus tasks of all users)
         * @returns {Array} tasks
         */
        function getTasks() {
            var result = [];
            self.users.forEach(function (user) {
                result = result.concat(user.tasks);
            });
            return result.concat(unassignedTasks);
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
