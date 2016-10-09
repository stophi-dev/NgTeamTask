/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

/* global ng, $, Rx */

(function (app) {
    app.TaskListComponent =
            ng.core.Component({
                selector: 'task-list',
                templateUrl: 'teamTask/taskList.component.html',
                inputs: ['taskManagement', 'user']
            })
            .Class({
                constructor: [ng.core.ElementRef,
                    function (elementRef) {
                        this.taskManagement = new app.TaskManagement();
                        this.elementRef = elementRef;
                    }],
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
                            var newUserElem = ui.item.parents('[data-userid]');
                            if (newUserElem.length === 0) {
                                throw new Error('Cannot insert task here. No userId found');
                            }
                            if (newUserElem.length > 1) {
                                throw new Error('Cannot insert task here. User is ambiguous');
                            }
                            var userId = newUserElem.attr('data-userid');
                            if (isNaN(userId)) {
                                throw new Error('Cannot insert task here. Invalid userId: ' + userId);
                            }

                            self.taskManagement.assignTaskToUser(parseInt(taskId), parseInt(self.user.id), taskPosition);

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
