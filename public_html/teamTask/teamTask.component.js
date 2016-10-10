/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

/* global ng */

(function (app) {
    app.TeamTaskComponent =
            ng.core.Component({
                selector: 'team-task',
                templateUrl: 'teamTask/teamTask.component.html',
                inputs: ['taskManagement']
            })
            .Class({
                constructor: function () {
                    var self = this;
                    self.taskManagement = new app.TaskManagement();
                    self.addNewTask = function (newTaskField) {
                        self.taskManagement.addTask(newTaskField.value);
                        newTaskField.value = null;
                        newTaskField.focus();
                    };
                }
            });
})(window.app || (window.app = {}));
