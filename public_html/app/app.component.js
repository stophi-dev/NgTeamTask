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
                    self.description = 'This is a demo app for task management in a team.';
                    self.users = [];

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
                    }

                    function addUser(user)
                    {
                        self.users.push(new app.User(user));
                    }

                }
            });
})(window.app || (window.app = {}));