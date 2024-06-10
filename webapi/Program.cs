using Microsoft.EntityFrameworkCore;
using Security_jwt;
using webapi.Core.Context;
using webapi.Core.Map;
using webapi.Core.Repository;
using webapi.Core.Service;
using webapi.Domain.Model;
using webapi.Domain.Service;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddDbContext<CnctestContext>( options => options.UseSqlServer(), ServiceLifetime.Scoped );

builder.Services.AddTransient<UserRepository>();
builder.Services.AddTransient<IService<User>, UserService>();
builder.Services.AddTransient<IUserService, UserService>();

builder.Services.AddTransient<TestRepository>();
builder.Services.AddTransient<IService<Test>, TestService>();
builder.Services.AddTransient<ITestService, TestService>();

builder.Services.AddTransient<AnswerRepository>();
builder.Services.AddTransient<IService<Answer>, AnswerService>();


builder.Services.AddTransient<IJwtService>( p => 
    new JwTService(new PasswordProvider
    (
        Environment.GetEnvironmentVariable("JWT_PASSWORD_PROVIDER")
    ))
);

builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: "MainPolicy",
            policy =>
            {
                policy
                    .AllowAnyHeader()
                    .AllowAnyOrigin()
                    .AllowAnyMethod();
            }
        );
    }
);





var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors();

app.Run();
