'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
app.factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                    // scroll to the bottom
                    $('.chatScroll').animate({scrollTop: $('#chat_chatmsglist').height()}, 1000);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                        // scroll to the bottom
                        $('.chatScroll').animate({scrollTop: $('#chat_chatmsglist').height()}, 1000);
                    }
                });
            });
        }
    };
});
