using Nancy;

namespace Erik.Modules
{
    public class DefaultModule : NancyModule
    {
        public DefaultModule()
        {
            Get["/"] = parameters =>
            {
                return Response.AsFile("index.html");
            };
        }
    }
}
