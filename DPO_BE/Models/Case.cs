using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("Case")]
public partial class Case
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("idAccount")]
    public int? IdAccount { get; set; }

    [Column("idProcedure")]
    public int? IdProcedure { get; set; }

    [Column("idState")]
    public int? IdState { get; set; }

    public string? DateDone { get; set; }

    [InverseProperty("IdNavigation")]
    public virtual Account? Account { get; set; }

    [ForeignKey("IdProcedure")]
    [InverseProperty("Cases")]
    public virtual Procedure? IdProcedureNavigation { get; set; }

    [ForeignKey("IdState")]
    [InverseProperty("Cases")]
    public virtual State? IdStateNavigation { get; set; }
}
