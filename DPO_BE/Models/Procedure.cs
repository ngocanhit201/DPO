using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("Procedure")]
[Index("Id", Name = "IX_Procedure", IsUnique = true)]
public partial class Procedure
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? Fee { get; set; }

    public int? Level { get; set; }

    public string? Code { get; set; }

    [InverseProperty("IdProcedureNavigation")]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();

    [InverseProperty("IdProcedureNavigation")]
    public virtual ICollection<OrderProcedure> OrderProcedures { get; set; } = new List<OrderProcedure>();

    [ForeignKey("IdProcedure")]
    [InverseProperty("IdProcedures")]
    public virtual ICollection<Paper> IdPapers { get; set; } = new List<Paper>();
}
