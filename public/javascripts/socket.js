'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('chatApp', [
    'btford.socket-io'
]);

app.factory('socket', function (socketFactory) {
    var socket=socketFactory();
    socket.follow('online');
    return socket;
});

app.controller('chatCtrl', function ($scope, $http) {
    $http({
        method: 'POST',
        url: '/user'
    }).success(function (data, status) {
        $scope.username = data;
    }).error(function (data, status) {
    });
});

app.controller('chatListCtrl',function($scope,socket){
    var from = $scope.username;//从 $scope 中读取用户名，存于变量 from
    var to = 'all';//设置默认接收对象为"所有人"
    //发送用户上线信号
    socket.follow('online',$scope);
    $scope.$emit('socket:online', {'user': from});
    $scope.$on('socket:online', function (data) {
        if ($scope.chatList == undefined) {
            $scope.chatList = [];
        }
        //显示系统消息
        if (data.user != from) {
            $scope.chatList.push('<div style="color:#f00">系统(' + now() + '):' + '用户 ' + data.user + ' 上线了！</div>');
        } else {
            $scope.chatList.push('<div style="color:#f00">系统(' + now() + '):你进入了聊天室！</div>');
        }
        $scope.users=data.users;
        $scope.$apply();
    });
});

//获取当前时间
function now() {
    var date = new Date();
    var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
    return time;
}
