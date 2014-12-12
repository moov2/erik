using Nancy;
using Nancy.Bootstrapper;
using Nancy.Conventions;
using Nancy.TinyIoc;

namespace Erik.AppStart
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        /// <summary>
        /// Runs when the application first spins up.
        /// </summary>
        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {

        }

        protected override void ConfigureConventions(Nancy.Conventions.NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);

            Conventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("assets", "assets")
            );
        }

        /// <summary>
        /// Runs when a request is made to the server.
        /// </summary>
        protected override void RequestStartup(TinyIoCContainer requestContainer, IPipelines pipelines, NancyContext context)
        {

        }
    }
}
