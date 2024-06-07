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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=CA-C-0064X\\SQLEXPRESS;Initial Catalog=CNCTest;Integrated Security=True;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.ApplyConfiguration(new AnswerClassMap());
        modelBuilder.ApplyConfiguration(new TestClassMap());
        modelBuilder.ApplyConfiguration(new UserClassMap());

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
