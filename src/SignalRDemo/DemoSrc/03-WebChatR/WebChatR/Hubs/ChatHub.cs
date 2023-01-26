using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebChatR.Hubs
{
    [HubName("chat")]
    public class ChatHub : Hub
    {
        // C -> S
        public void ClientToServer(string msg)
        { 
            // S ->  Cs
            Clients.All.severToClient(msg);
        }
    }
}