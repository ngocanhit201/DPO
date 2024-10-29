using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("Status")]
public partial class Status
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Code { get; set; }

    [InverseProperty("IdStatusNavigation")]
    public virtual ICollection<CaseProgress> CaseProgresses { get; set; } = new List<CaseProgress>();
}
