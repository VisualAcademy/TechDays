using Microsoft.AspNet.SignalR;
using MvcSignalRChatWithWebAPI.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MvcSignalRChatWithWebAPI.Controllers
{
    public class MessagesController : ApiController
    {
        // GET api/<controller>
        // 클라이언트로부터 api/Messages?message=안녕하세요.
        public void Get(string message)
        {
            // SignalR Hub를 호출+onMessageReceived() 함수에 전달...
            GlobalHost
                .ConnectionManager
                    .GetHubContext<MessageHub>()
                        .Clients
                            .All
                                .onMessageReceived(message);
        }
    }
}