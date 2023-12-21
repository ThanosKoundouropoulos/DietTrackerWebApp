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
        public DbSet<DietGoalFoods> DietGoalFoods {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
            .HasOne(e => e.DietGoal)
            .WithOne(e => e.AppUser)
            .HasForeignKey<DietGoal>(e => e.AppUserId)
            .IsRequired(false);

            builder.Entity<DietGoalFoods>(x => x.HasKey(df => new{df.FoodId, df.GoalId}));
            
            builder.Entity<DietGoalFoods>()
                .HasOne(f => f.Food)
                .WithMany(g => g.DietGoals)
                .HasForeignKey(df => df.FoodId);

             builder.Entity<DietGoalFoods>()
                .HasOne(f => f.DietGoal)
                .WithMany(g => g.Foods)
                .HasForeignKey(df => df.GoalId);
        }
        
        
    }
}