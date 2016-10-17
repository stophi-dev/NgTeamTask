/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

/* global ng, $ */

(function (app) {
    app.TaskListComponent =
            ng.core.Component({
                selector: 'task-list',
                styleUrls: ['./teamTask/teamTask.css'],
                templateUrl: 'teamTask/taskList.component.html',
                inputs: ['taskManagement', 'user']
            })
            .Class({
                constructor: [ng.core.ElementRef,
                    function (elementRef) {
                        this.taskManagement = new app.TaskManagement();
                        this.elementRef = elementRef;
                    }],
                ngOnInit: function () {
                    var self = this;
                    this.unassigned = typeof this.user === typeof undefined;
                    if (this.unassigned) {
                        this.tasks = this.taskManagement.getUnassignedTasks();
                        this.noItemText = function () {
                            return this.taskManagement.getTaskCount() === 0 ?
                                    'There are no tasks existing. Add a new task and assign it to a user.' :
                                    'All ongoing tasks are assigned to a user.';
                        };
                    } else {
                        this.tasks = this.taskManagement.getTasksForUserId(this.user.id);
                        this.noItemText = function () {
                            return 'Currently no task assigned. To assign a task, drag it here.';
                        };
                    }

                    this.deleteTaskToolTip = 'Delete Task';
                    this.currentTaskToDelete = null;
                    this.deleteTaskConfirmText = function (title) {
                        return 'Do you really want to delete "' + title + '"?';
                    };
                    this.showDeleteTaskDialog = function (taskId) {
                        this.currentTaskToDelete = taskId;
                    };
                    this.hideDeleteTaskDialog = function () {
                        this.currentTaskToDelete = null;
                    };
                    this.deleteDialogYesButtonText = 'Yes, delete';
                    this.deleteDialogCancelButtonText = 'Cancel';

                    var deletingTaskId = null;
                    this.isDeleting = function (taskId) {
                        return deletingTaskId === taskId;
                    };
                    this.deleteTask = function (taskId) {
                        deletingTaskId = taskId;
                        setTimeout(function () {
                            self.taskManagement.deleteTask(taskId);
                        }, 700);
                    };
                },
                ngAfterViewInit: function () {
                    var self = this;
                    var taskContainer = $(self.elementRef.nativeElement).find('.task-container');
                    taskContainer.sortable({
                        connectWith: '.task-container',
                        items: '> .task-item',
                        update: function (event, ui) {

                            var taskId = ui.item.attr('data-taskid');
                            if (isNaN(taskId)) {
                                throw new Error('Cannot insert task here. Invalid taskId: ' + taskId);
                            }
                            var taskPosition = ui.item.prevAll('[data-taskid]').length;

                            if (self.unassigned) {
                                self.taskManagement.deassignTask(parseInt(taskId), taskPosition);
                            } else {
                                self.taskManagement.assignTaskToUser(parseInt(taskId), self.user.id, taskPosition);
                            }

                            /*
                             * Angular2 interferes with JQuery UI Sortable under this condition:
                             * - Drag and drop a task to another user
                             * - Drag same task again without any other interaction
                             * => TypeError: Cannot read property 'appendChild' of undefined
                             * The mouse event is processed by Angular and by JQuery UI Sortable, 
                             * which causes trouble in this case
                             * Workaround: click on the dropped item programmatically
                             */
                            ui.item.click();
                        }
                    });
                    taskContainer.disableSelection();
                }
            });
})(window.app || (window.app = {}));
