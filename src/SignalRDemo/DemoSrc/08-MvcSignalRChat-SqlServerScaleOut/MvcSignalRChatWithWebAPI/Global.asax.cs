using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace MvcSignalRChatWithWebAPI
{
    // 참고: IIS7 클래식 모드를 사용하도록 설정하는 방법은 
    // http://go.microsoft.com/fwlink/?LinkId=301868을 참조하십시오.
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            // 현재 프로젝트에 SignalR을 SQL Server를 통해서 Scale out 설정
            GlobalHost.DependencyResolver.UseSqlServer(
                ConfigurationManager.ConnectionStrings["ScaleOutDb"]
                    .ConnectionString);

            WebApiConfig.Register(GlobalConfiguration.Configuration); //

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
