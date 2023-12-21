using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public String DisplayName { get; set; }
        public String gender { get; set; }
        public int age { get; set; }
        public float weight { get; set; }
        public float height { get; set; }
        public int activityLevel { get; set; }
        public bool hasDietPlan { get; set; }
        
        [JsonIgnore]
        public DietGoal DietGoal { get; set; }
    }
}

