using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using webapi.Domain.Model;

namespace webapi.Core.Map;

public class UserClassMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
            builder.HasKey(e => e.Id).HasName("PK__user__3213E83FA8D232C8");

            builder.ToTable("user");

            builder.Property(e => e.Id).HasColumnName("id");
            builder.Property(e => e.Admin).HasColumnName("admin");
            builder.Property(e => e.Identification)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("identification");
            builder.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            builder.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            builder.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            builder.Property(e => e.Salt)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("salt");
    }
}