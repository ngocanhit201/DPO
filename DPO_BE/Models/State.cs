using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("State")]
public partial class State
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Code { get; set; }

    [InverseProperty("IdStateNavigation")]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();
}
