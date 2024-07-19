namespace Domain{
    public class WeightIn
    {
        public Guid Id { get; set; }
        public float Weight { get; set; }
        public DateTime DateRecorded { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}

