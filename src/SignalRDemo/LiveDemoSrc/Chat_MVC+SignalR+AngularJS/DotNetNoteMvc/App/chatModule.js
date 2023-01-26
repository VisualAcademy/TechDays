(function () {

    // Angular 모듈(앱) 생성
    angular.module('chatModule', []);

    // 페이지 로드
    $(function () {
        $.connection.hub.logging = true;
        $.connection.hub.start(); 
    });
    
    // 예외 처리
    $.connection.hub.error(function (err) {
        console.log("에러 발생: " + err); 
    });

    // Angular 모듈에 SignalR chat 과 toastr 주입 : DI
    angular.module("chatModule")
        .value("chat", $.connection.chat)
        .value("toastr", toastr);

})();