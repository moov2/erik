using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Extensions;
using Owin;

namespace Erik.AppStart
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app
                .MapHubs(new HubConfiguration { EnableCrossDomain = true })
                .UseNancy((options) =>
                {

                })
                .UseStageMarker(PipelineStage.MapHandler);
        }
    }
}