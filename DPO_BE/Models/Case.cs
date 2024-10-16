using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("Case")]
public partial class Case
{
    [Column("idCaseProgress")]
    [StringLength(10)]
    public string? IdCaseProgress { get; set; }

    [Column("idAccount")]
    public int IdAccount { get; set; }

    [Column("idProcedure")]
    public int IdProcedure { get; set; }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? DateCreate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? DateDone { get; set; }

    [StringLength(10)]
    public string? Comment { get; set; }

    [Column("idResultForm")]
    public int? IdResultForm { get; set; }

    public string? Require { get; set; }

    [InverseProperty("IdCaseNavigation")]
    public virtual ICollection<CaseProgress> CaseProgresses { get; set; } = new List<CaseProgress>();

    [InverseProperty("IdCaseNavigation")]
    public virtual ICollection<File> Files { get; set; } = new List<File>();

    [ForeignKey("IdAccount")]
    [InverseProperty("Cases")]
    public virtual Account IdAccountNavigation { get; set; } = null!;

    [ForeignKey("IdProcedure")]
    [InverseProperty("Cases")]
    public virtual Procedure IdProcedureNavigation { get; set; } = null!;

    [ForeignKey("IdResultForm")]
    [InverseProperty("Cases")]
    public virtual ResultFrom? IdResultFormNavigation { get; set; }
}
