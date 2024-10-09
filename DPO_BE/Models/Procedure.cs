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

    [InverseProperty("IdProcedureNavigation")]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();

    [ForeignKey("IdProcedure")]
    [InverseProperty("IdProcedures")]
    public virtual ICollection<File> IdFiles { get; set; } = new List<File>();
}
