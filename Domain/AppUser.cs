using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public String DisplayName { get; set; }
        public String Bio { get; set; }
    }
}