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

    public virtual DbSet<CaseProgress> CaseProgresses { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<File> Files { get; set; }

    public virtual DbSet<OrderProcedure> OrderProcedures { get; set; }

    public virtual DbSet<Paper> Papers { get; set; }

    public virtual DbSet<Procedure> Procedures { get; set; }

    public virtual DbSet<ResultFrom> ResultFroms { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=StudentProceduresOnline;User ID=sa;Password=123456;Trust Server Certificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasOne(d => d.IdDepartmentNavigation).WithMany(p => p.Accounts).HasConstraintName("FK_Account_Department");

            entity.HasOne(d => d.IdStudentNavigation).WithMany(p => p.Accounts).HasConstraintName("FK_Account_Student");
        });

        modelBuilder.Entity<Case>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Case_1");

            entity.Property(e => e.Comment).IsFixedLength();
            entity.Property(e => e.IdCaseProgress).IsFixedLength();

            entity.HasOne(d => d.IdAccountNavigation).WithMany(p => p.Cases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Case_Account");

            entity.HasOne(d => d.IdProcedureNavigation).WithMany(p => p.Cases)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Case_Procedure_1");

            entity.HasOne(d => d.IdResultFormNavigation).WithMany(p => p.Cases).HasConstraintName("FK_Case_ResultFrom");
        });

        modelBuilder.Entity<CaseProgress>(entity =>
        {
            entity.HasOne(d => d.IdCaseNavigation).WithMany(p => p.CaseProgresses).HasConstraintName("FK_CaseProgress_Case");

            entity.HasOne(d => d.IdDepartmentNavigation).WithMany(p => p.CaseProgresses).HasConstraintName("FK_CaseProgress_Department");

            entity.HasOne(d => d.IdStatusNavigation).WithMany(p => p.CaseProgresses).HasConstraintName("FK_CaseProgress_State");
        });

        modelBuilder.Entity<File>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__File__3213E83FE008ACF0");

            entity.HasOne(d => d.IdCaseNavigation).WithMany(p => p.Files).HasConstraintName("FK_File_Case");
        });

        modelBuilder.Entity<OrderProcedure>(entity =>
        {
            entity.HasOne(d => d.IdDepartmentNavigation).WithMany(p => p.OrderProcedures).HasConstraintName("FK_OrderProcedure_Department");

            entity.HasOne(d => d.IdProcedureNavigation).WithMany(p => p.OrderProcedures).HasConstraintName("FK_OrderProcedure_Procedure");
        });

        modelBuilder.Entity<Procedure>(entity =>
        {
            entity.HasMany(d => d.IdPapers).WithMany(p => p.IdProcedures)
                .UsingEntity<Dictionary<string, object>>(
                    "ProcedurePaper",
                    r => r.HasOne<Paper>().WithMany()
                        .HasForeignKey("IdPaper")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_ProcedurePaper_Papers"),
                    l => l.HasOne<Procedure>().WithMany()
                        .HasForeignKey("IdProcedure")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_ProcedurePaper_Procedure"),
                    j =>
                    {
                        j.HasKey("IdProcedure", "IdPaper");
                        j.ToTable("ProcedurePaper");
                        j.IndexerProperty<int>("IdProcedure").HasColumnName("idProcedure");
                        j.IndexerProperty<int>("IdPaper").HasColumnName("idPaper");
                    });
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_State");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Student_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
