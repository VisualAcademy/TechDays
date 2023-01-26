angular.module('chatModule').controller('chatController', function ($scope, chat, toastr) {

    //[1] 클라이언트 사이드 코드
    // 메시지 저장 공간
    $scope.messages = [];

    // 이름 설정
    $scope.isName = false;
    $scope.setName = function () {
        $scope.isName = true;
    };

    // 방 설정
    $scope.isRoom = false;
    $scope.joinRoom = function () {
        $scope.isRoom = true;
        chat.server.joinRoom($scope.room, $scope.name);
    };
    $scope.leaveRoom = function () {
        $scope.isRoom = false;
        chat.server.leaveRoom($scope.room, $scope.name);
    };

    // 버튼 클릭 이벤트 처리기
    $scope.sendMessage = function () {
        chat.server.sendMessage({ room: $scope.room, name: $scope.name, message: $scope.message });
        $scope.message = "";
    };

    //[2] 서버 사이드 코드
    // 서버에서 클라이언트로 전송
    chat.client.receiveMessage = function (msg) {
        $scope.messages.push({ message: msg }); 
        $scope.$apply();
    };

    // 그룹 사용자 로그인 정보
    chat.client.newNotification = function (msg) {
        toastr.success(msg);
    };

    // 채팅 사용자 카운트
    chat.client.hitRecoreded = function (cnt) {
        $scope.hitCount = cnt;
        $scope.$apply();
    };

});