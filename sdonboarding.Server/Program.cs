using Microsoft.EntityFrameworkCore;
using sdonboarding.Server.ApplicationTier.Classes;
using sdonboarding.Server.ApplicationTier.Interfaces;
using sdonboarding.Server.Models;

var builder = WebApplication.CreateBuilder(args);

//Add congiguration settings
var configuration = new ConfigurationBuilder()
   .SetBasePath(AppContext.BaseDirectory)
   .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
   .AddEnvironmentVariables()
   .Build();

//get connection string to database
var constring = configuration.GetConnectionString("DefaultConnection");

//Add dbcontexxt
builder.Services.AddDbContext<IndustryConnectOnboardingContext>(options => options.UseSqlServer(constring, sqlOptions =>
{
    sqlOptions.EnableRetryOnFailure(
        maxRetryCount: 3,           // Maximum number of retries
        maxRetryDelay: TimeSpan.FromSeconds(5), // Delay between retries
        errorNumbersToAdd: null);   // Specify any specific SQL error codes if needed
}));

builder.Services.AddScoped<ICustomerMethods, CustomerMethods>();
builder.Services.AddScoped<IProductMethods, ProductMethods>();
builder.Services.AddScoped<ISaleMethods, SaleMethods>();
builder.Services.AddScoped<IStoreMethods, StoreMethods>();

builder.Services.AddControllers().AddNewtonsoftJson(); ;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
app.UseSwagger();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
    app.UseHttpsRedirection();
}


app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
