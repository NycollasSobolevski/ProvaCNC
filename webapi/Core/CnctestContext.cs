using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using webapi.Core.Map;
using webapi.Domain.Model;

namespace webapi.Core.Context;

public partial class CnctestContext : DbContext
{
    public CnctestContext()
    {
    }

    public CnctestContext(DbContextOptions<CnctestContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Answer> Answers { get; set; }

    public virtual DbSet<Test> Tests { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected string DatabaseSource = Environment.GetEnvironmentVariable("SQL_DATABASE_URL")!;
    protected string DatabaseName = Environment.GetEnvironmentVariable("SCORETRACK_DATABASE_NAME")!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer($"Data Source={this.DatabaseSource};Initial Catalog={this.DatabaseName};Integrated Security=True;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.ApplyConfiguration(new AnswerClassMap());
        modelBuilder.ApplyConfiguration(new TestClassMap());
        modelBuilder.ApplyConfiguration(new UserClassMap());

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
