using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

public partial class Paper
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Code { get; set; }

    [ForeignKey("IdPaper")]
    [InverseProperty("IdPapers")]
    public virtual ICollection<Procedure> IdProcedures { get; set; } = new List<Procedure>();
}
