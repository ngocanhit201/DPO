using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("Account")]
public partial class Account
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Role { get; set; }

    [StringLength(50)]
    public string? MsvStudent { get; set; }

    [ForeignKey("Id")]
    [InverseProperty("Account")]
    public virtual Case IdNavigation { get; set; } = null!;

    [ForeignKey("MsvStudent")]
    [InverseProperty("Accounts")]
    public virtual Student? MsvStudentNavigation { get; set; }
}
