using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

public partial class StudentProceduresOnlineContext : DbContext
{
    public StudentProceduresOnlineContext()
    {
    }

    public StudentProceduresOnlineContext(DbContextOptions<StudentProceduresOnlineContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Case> Cases { get; set; }

    public virtual DbSet<File> Files { get; set; }

    public virtual DbSet<Procedure> Procedures { get; set; }

    public virtual DbSet<State> States { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=StudentProceduresOnline;User ID=sa;Password=123456;Trust Server Certificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.MsvStudent).IsFixedLength();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Account)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Account_Case_1");

            entity.HasOne(d => d.MsvStudentNavigation).WithMany(p => p.Accounts).HasConstraintName("FK_Account_Student");
        });

        modelBuilder.Entity<Case>(entity =>
        {
            entity.HasOne(d => d.IdProcedureNavigation).WithMany(p => p.Cases).HasConstraintName("fk_Case_Procedure_1");

            entity.HasOne(d => d.IdStateNavigation).WithMany(p => p.Cases).HasConstraintName("FK_Case_State");
        });

        modelBuilder.Entity<File>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__File__3213E83FE008ACF0");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasMany(d => d.IdProcedures).WithMany(p => p.IdFiles)
                .UsingEntity<Dictionary<string, object>>(
                    "ProcedureFile",
                    r => r.HasOne<Procedure>().WithMany()
                        .HasForeignKey("IdProcedure")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_ProcedureFile_Procedure"),
                    l => l.HasOne<File>().WithMany()
                        .HasForeignKey("IdFile")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_ProcedureFile_File"),
                    j =>
                    {
                        j.HasKey("IdFile", "IdProcedure").HasName("PK__Procedur__CBA8538643CF0ECF");
                        j.ToTable("ProcedureFile");
                        j.IndexerProperty<int>("IdFile").HasColumnName("idFile");
                        j.IndexerProperty<int>("IdProcedure").HasColumnName("idProcedure");
                    });
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.Msv).HasName("PK__Student__C790E5ACF54E8CEA");

            entity.Property(e => e.Msv).IsFixedLength();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
