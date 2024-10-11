using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("ResultFrom")]
public partial class ResultFrom
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Code { get; set; }

    [InverseProperty("IdResultFormNavigation")]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();
}
