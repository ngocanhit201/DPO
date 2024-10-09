using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("File")]
public partial class File
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Url { get; set; }

    [ForeignKey("IdFile")]
    [InverseProperty("IdFiles")]
    public virtual ICollection<Procedure> IdProcedures { get; set; } = new List<Procedure>();
}
