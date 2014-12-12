using Erik.Server.GameObjects;
using Erik.Server.Utils;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Erik.Server
{
    public class Game
    {
        private long _actualFPS = 0;
        private HighFrequencyTimer _gameLoop;

        public IList<Player> Players { get; set; }

        private readonly static Lazy<Game> _instance = new Lazy<Game>(() => new Game());

        public static Game Instance
        {
            get { return _instance.Value; }
        }

        public Game() 
        {
            Players = new List<Player>();

            _gameLoop = new HighFrequencyTimer(1000 / 20, id => Update(id), () => { }, () => { }, (fps) =>
            {
                _actualFPS = fps;
            });

            _gameLoop.Start();
        }

        private long Update(long id)
        {
            GetContext().Clients.All.UpdatePositions(Players);
            return id;
        }

        public static IHubContext GetContext()
        {
            return GlobalHost.ConnectionManager.GetHubContext<GameHub>();
        }

        public void AddPlayer(string connectionId) {
            Players.Add(new Player(connectionId));
        }

        public void RemovePlayer(string connectionId) {
            Players.Remove(Players.Where(x => x.ConnectionId == connectionId).SingleOrDefault());
            GetContext().Clients.All.RemovePlayer(connectionId);
        }

        public void UpdatePlayer(string connectionId, double posX, double posY, double angle)
        {
            var player = Players.SingleOrDefault(x => x.ConnectionId == connectionId);

            if (player != null)
                player.Update(posX, posY, angle);
        }
    }
}