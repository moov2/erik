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
                .MapSignalR(new HubConfiguration { })
                .UseNancy((options) =>
                {

                })
                .UseStageMarker(PipelineStage.MapHandler);
        }
    }
}