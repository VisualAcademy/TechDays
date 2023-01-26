using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMoveShape.MoveShape
{
    [HubName("moveShape")] // 클라이언트(JavaScript)단에서 $.connection.moveShape로 바라봄
    public class MoveShapeHub : Hub
    {
        // 클라이언트에서 서버로 전송된 값을 받는 메서드 : x, y좌표
        public void MoveShape(int x, int y)
        { 
            // 서버에서 클라이언트로 브로드캐스팅...
            Clients.Others.shapeMoved(x, y); // JS단에서 shapeMoved 함수로 값을 받음
        }
    }
}