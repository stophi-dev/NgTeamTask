/* 
 * NgTeamTask is licensed under the conditions of the MIT License (MIT)
 *
 * Copyright (c) 2016 Philip Stöhrer
 *
 * See https://raw.githubusercontent.com/stophi-dev/NgTeamTask/master/LICENSE for details.
 */

/* global ng */

(function (app) {
    app.AppComponent =
            ng.core.Component({
                selector: 'my-app',
                templateUrl: 'app/app.component.html'
            })
            .Class({
                constructor: function () {
                    var self = this;
                    self.title = 'Task Management in a Team';
                    self.description = 'This is a demo app for task management in a team. Add, delete and assign tasks.';
                    self.taskManagement = new app.TaskManagement();

                    addDummyData();

                    function addDummyData() {
                        addUser({
                            firstName: 'Andrew',
                            lastName: 'Miller',
                            email: 'andrew.miller@example.com'
                        });
                        addUser({
                            firstName: 'Benjamin',
                            lastName: 'Fisher',
                            email: 'benfisher78@example.com'
                        });
                        addUser({
                            firstName: 'Cecille',
                            lastName: 'Hunter',
                            email: 'c_hunter@example.com'
                        });
                        addUser({
                            firstName: 'Debora',
                            lastName: 'Smith',
                            email: 'debora@example.com'
                        });

                        addTask({
                            title: 'Wash the dishes',
                            progress: 50,
                            workUnits: 1000
                        });
                        addTask({
                            title: 'Do the laundry',
                            progress: 503,
                            workUnits: 1000
                        });
                        addTask({
                            title: 'Clean the floor',
                            progress: 830,
                            workUnits: 1000
                        });
                        addTask({
                            title: 'Cook dinner',
                            progress: 1,
                            workUnits: 3
                        });
                        addTask({
                            title: 'Buy food',
                            progress: 0,
                            workUnits: 10
                        });

                        self.taskManagement.assignTaskToUser(0, 2);
                        self.taskManagement.assignTaskToUser(1, 2);
                        self.taskManagement.assignTaskToUser(2, 3);
                        self.taskManagement.assignTaskToUser(3, 1);
                    }

                    function addUser(user)
                    {
                        user.id = self.taskManagement.users.length;
                        var result = new app.User(user);
                        self.taskManagement.users.push(result);
                    }

                    function addTask(taskValues)
                    {
                        var task = self.taskManagement.addTask(taskValues.title);
                        task.progress = taskValues.progress;
                        task.workUnits = taskValues.workUnits; 
                    }
                }
            });
})(window.app || (window.app = {}));