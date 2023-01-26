using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MvcSignalRChatWithWebAPI.Startup))]
namespace MvcSignalRChatWithWebAPI
{
    public partial class Startup 
    {
        public void Configuration(IAppBuilder app) 
        {
            ConfigureAuth(app);
        }
    }
}
