using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading;

namespace DotNetNoteMvc.Hubs
{
    [HubName("chat")]
    public class ChatHub : Hub
    {
        //[1] Web Forms에서 기본 채팅
        public void ClientToServer(string msg)
        {
            Clients.All.serverToClient(msg);
        }

        //[2] 그룹 채팅
        public void SendMessage(ChatModel chat)
        {
            Clients.Group(chat.Room).receiveMessage(chat.Name + ": " + chat.Message);
        }
        public void JoinRoom(string room, string name)
        {
            Clients.OthersInGroup(room).newNotification(name + " : 들어옴");
            Groups.Add(Context.ConnectionId, room);
        }
        public void LeaveRoom(string room, string name)
        {
            Clients.OthersInGroup(room).newNotification(name + " : 나감");
            Groups.Remove(Context.ConnectionId, room);
        }

        //[3] 히트 카운트
        private static int _hitCounter = 0; // 총 방문수
        public override System.Threading.Tasks.Task OnConnected()
        {
            Interlocked.Increment(ref _hitCounter);
            Clients.All.hitRecoreded(_hitCounter);
            return base.OnConnected();
        }
        public override System.Threading.Tasks.Task OnDisconnected()
        {
            Interlocked.Decrement(ref _hitCounter);
            Clients.All.hitRecoreded(_hitCounter);
            return base.OnDisconnected();
        }
    }

    public class ChatModel
    {
        public string Room { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
    }
}