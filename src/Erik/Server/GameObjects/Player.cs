namespace Erik.Server.GameObjects
{
    public class Player
    {
        public string ConnectionId { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public double Angle { get; set; }

        public Player(string connectionId)
        {
            ConnectionId = connectionId;
        }

        public void Update(double x, double y, double angle)
        {
            Angle = angle;
            X = x;
            Y = y;
        }
    }
}