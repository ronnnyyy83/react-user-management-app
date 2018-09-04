## React User Management APP

I used reactjs v16(reactrouter), bootstrap for design, enzym v3 / jest for test and webpack behind the scene.

To start running this application first run 'npm install'

To Run project 'npm start'

To Test 'npm test'

To create production package 'npm build'

I also change code in API project to enable CORS to be able to accept request from another domain/port. I currently AllowedAllOrigins (since I used different port while developing) by using this code blocking
```
public void ConfigureServices(IServiceCollection services)
  {
      services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
                                                              .AllowAnyMethod()
                                                               .AllowAnyHeader()));
      services.AddTransient<IUserService, UserService>();
      services.AddTransient<ILoginService, LoginService>();

      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);


  }

  // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
  public void Configure(IApplicationBuilder app, IHostingEnvironment env)
  {
      if (env.IsDevelopment())
      {
          app.UseDeveloperExceptionPage();
      }
      else
      {
          app.UseHsts();
      }

      app.UseCors("AllowAll");

      //app.UseHeaderAuthorization();
      app.UseMvc();
  }
```

I wrote couple of tests for login page since the most important part for UI but I did not make really complex tests like mocking data.

I also used Jenkins for deployment to my Amazon server. I can not share that in this example but basically running script using 'npm test' before deployment, then 'npm build to create package', then bitbucket repository to deploy.
For .Net Api project i also created a publish account and used it in jenkins to build and deploy .Net project.
