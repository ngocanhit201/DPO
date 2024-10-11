using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("Case")]
public partial class Case
{
    [Column("idAccount")]
    public int IdAccount { get; set; }

    [Column("idProcedure")]
    public int IdProcedure { get; set; }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("idState")]
    public int? IdState { get; set; }

    public string? DateDone { get; set; }

    [StringLength(10)]
    public string? Comment { get; set; }

    [Column("idResultForm")]
    public int? IdResultForm { get; set; }

    public string? Require { get; set; }

    [ForeignKey("IdAccount")]
    [InverseProperty("Cases")]
    public virtual Account IdAccountNavigation { get; set; } = null!;

    [ForeignKey("IdProcedure")]
    [InverseProperty("Cases")]
    public virtual Procedure IdProcedureNavigation { get; set; } = null!;

    [ForeignKey("IdResultForm")]
    [InverseProperty("Cases")]
    public virtual ResultFrom? IdResultFormNavigation { get; set; }

    [ForeignKey("IdState")]
    [InverseProperty("Cases")]
    public virtual State? IdStateNavigation { get; set; }

    [ForeignKey("IdCase")]
    [InverseProperty("IdCases")]
    public virtual ICollection<File> IdFiles { get; set; } = new List<File>();
}
