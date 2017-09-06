using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using ProjektArbete.Models;

namespace ProjektArbete
{
    public class Startup
    {
        IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            //var connStri = configuration["ConnectionStrings"];
            //Dependecyinjection
            services.AddScoped<DataManager>();
            services.AddSession();
            services.AddMvc();

        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error/ErrorPage");
            }

            app.UseStatusCodePagesWithRedirects("/Error/HttpError/{0}");

            app.UseSession();
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}
