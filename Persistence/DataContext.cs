using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext :  IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<DietGoal> DietGoals {get; set;}
        public DbSet<Food> Foods {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
            .HasOne(e => e.DietGoal)
            .WithOne(e => e.AppUser)
            .HasForeignKey<DietGoal>(e => e.AppUserId)
            .IsRequired(false);
        }
        
        
    }
}