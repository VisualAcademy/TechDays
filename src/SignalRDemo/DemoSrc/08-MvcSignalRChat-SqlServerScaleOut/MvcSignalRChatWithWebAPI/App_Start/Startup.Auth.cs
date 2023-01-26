using Owin;

namespace MvcSignalRChatWithWebAPI
{
    public partial class Startup
    {
        // 인증 구성에 대한 자세한 내용은 http://go.microsoft.com/fwlink/?LinkId=301864를 참조하십시오.
        public void ConfigureAuth(IAppBuilder app)
        {
            // 응용 프로그램이 로그인한 사용자에 대한 정보를 저장하는 데 쿠키를 사용하도록 설정
            // 및 쿠키를 사용하여 타사 로그인 공급자를 통한 사용자 로그인 관련 정보를 일시적으로 저장
            app.UseSignInCookies();

            // 타사 로그인 공급자를 통한 로그인을 사용하도록 설정하려면 다음 줄의 주석 처리를 제거하십시오.
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //   consumerKey: "",
            //   consumerSecret: "");

            //app.UseFacebookAuthentication(
            //   appId: "",
            //   appSecret: "");

            //app.UseGoogleAuthentication();
        }
    }
}