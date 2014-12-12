using Microsoft.AspNet.SignalR;
using System;
using System.Threading.Tasks;

namespace Erik.Server
{
    public class GameHub : Hub
    {
        private readonly Game _game;

        public GameHub()
        {
            _game = Game.Instance;
        }

        public override Task OnConnected()
        {
            _game.AddPlayer(Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            _game.RemovePlayer(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }

        public void UpdatePlayerLocation(double x, double y, double angle)
        {
            _game.UpdatePlayer(Context.ConnectionId, x, y, angle);
        }
    }
}