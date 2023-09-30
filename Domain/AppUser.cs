using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public String DisplayName { get; set; }
        public float weight { get; set; }
        public float height { get; set; }
        public int activityLevel { get; set; }
        public bool hasDietPlan { get; set; }
    }
}

