using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using webapi.Domain.Model;

namespace webapi.Core.Map;

public class AnswerClassMap : IEntityTypeConfiguration<Answer>
{
    public void Configure(EntityTypeBuilder<Answer> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK__answers__3213E83F11F9C252");

        builder.ToTable("answers");

        builder.Property(e => e.Id).HasColumnName("id");
        builder.Property(e => e.UserAnswer)
            .IsUnicode(false)
            .HasColumnName("answer");
        builder.Property(e => e.Attempts).HasColumnName("attempts");
        builder.Property(e => e.IdTest).HasColumnName("id_test");
        builder.Property(e => e.IsActive)
            .HasDefaultValue(true)
            .HasColumnName("is_active");
        builder.Property(e => e.Student)
            .HasMaxLength(255)
            .IsUnicode(false)
            .HasColumnName("student");
        builder.Property(e => e.Time)
            .HasColumnName("time");

        builder.HasOne(d => d.IdTestNavigation).WithMany(p => p.Answers)
            .HasForeignKey(d => d.IdTest)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK__answers__id_test__3D5E1FD2");
    }
}