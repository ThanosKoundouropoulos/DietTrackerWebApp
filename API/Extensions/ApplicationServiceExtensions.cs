using System.ComponentModel;
using System.Reflection;
using System.Text.Json.Serialization;
using Application.Core;
using Application.Goals;
using Application.Interfaces;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;

using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
         IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
           services.AddDbContext<DataContext>(options =>
                options.UseSqlite(config.GetConnectionString("DefaultConnection"))
                    .EnableSensitiveDataLogging()
            );
            /*services.AddControllersWithViews()
            .AddJsonOptions(options =>
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

            services.AddControllers().AddJsonOptions(options =>
{
                options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
            });*/
           

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor ,UserAccessor>();
            return services;
        }
    }
}