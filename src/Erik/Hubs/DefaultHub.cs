using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Erik.Hubs
{
    public class DefaultHub : Hub
    {
        public void UpdatePlayerLocation(int id, double x, double y)
        {
            Console.WriteLine(string.Format("Player {0} location x: {1} y: {2}", id, x, y));
        }
    }
}