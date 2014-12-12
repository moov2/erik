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
                .MapSignalR()
                .UseNancy((options) =>
                {

                })
                .UseStageMarker(PipelineStage.MapHandler);
        }
    }
}