using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;


namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationService(this IServiceCollection services,
        IConfiguration config)
    {
        services.AddControllers();

        services.AddDbContext<DataContext>(options =>
            options.UseSqlServer(config.GetConnectionString("DefaultConnection")));
        services.AddSwaggerGen();

        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();
        return services;
    }
}