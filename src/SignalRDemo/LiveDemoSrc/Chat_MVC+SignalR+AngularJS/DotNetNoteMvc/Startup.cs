using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DotNetNoteMvc.Startup))]
namespace DotNetNoteMvc
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            app.MapSignalR();
        }
    }
}
