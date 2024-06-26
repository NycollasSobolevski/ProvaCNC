using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using webapi.Domain.Model;

namespace webapi.Core.Map;

public class TestClassMap : IEntityTypeConfiguration<Test>
{
    public void Configure(EntityTypeBuilder<Test> builder)
    {
            builder.HasKey(e => e.Id).HasName("PK__test__3213E83F92C55A40");

            builder.ToTable("test");

            builder.Property(e => e.Id).HasColumnName("id");
            builder.Property(e => e.Answer)
                .IsUnicode(false)
                .HasColumnName("answer");
            builder.Property(e => e.Attempts).HasColumnName("attempts");
            builder.Property(e => e.Code)
                .HasMaxLength(25)
                .IsUnicode(true)
                .HasColumnName("code");
            builder.Property(e => e.Description)
                .IsUnicode(false)
                .HasColumnName("description");
            builder.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            builder.Property(e => e.Question)
                .IsUnicode(false)
                .HasColumnName("question");
            builder.Property(e => e.Title)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("title");
    }
}