using Nancy;
using Nancy.ModelBinding;
using Nancy.Security;
using System;
using System.IO;

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
