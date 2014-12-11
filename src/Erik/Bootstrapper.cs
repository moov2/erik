using Nancy;
using Nancy.Bootstrapper;
using Nancy.Cryptography;
using Nancy.Session;
using Nancy.TinyIoc;

namespace Erik
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        /// <summary>
        /// Runs when the application first spins up.
        /// </summary>
        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {

        }

        /// <summary>
        /// Runs when a request is made to the server.
        /// </summary>
        protected override void RequestStartup(TinyIoCContainer requestContainer, IPipelines pipelines, NancyContext context)
        {

        }
    }
}
