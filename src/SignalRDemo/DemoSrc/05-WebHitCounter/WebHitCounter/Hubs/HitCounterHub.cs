using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace WebHitCounter.Hubs
{
    [HubName("hitCounter")]
    public class HitCounterHub : Hub
    {
        private static int _hitCounter = 0; // 총 방문수
        // C -> S
        public void RecordHit()
        {
            //_hitCounter++;
            Clients.All.hitRecorded(_hitCounter); // S -> C
        }

        //[1] 클라이언트가 접속했을 때
        public override System.Threading.Tasks.Task OnConnected()
        {
            _hitCounter++;
            Clients.All.hitRecorded(_hitCounter);

            return base.OnConnected();
        }

        //[2] 클라이언트가 접속을 해제 했을 때
        public override System.Threading.Tasks.Task OnDisconnected()
        {
            _hitCounter--;
            Clients.All.hitRecorded(_hitCounter);

            return base.OnDisconnected();
        }

    }
}