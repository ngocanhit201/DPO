using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("Account")]
public partial class Account
{
    public string? Username { get; set; }

    [Column("idDepartment")]
    public int? IdDepartment { get; set; }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("idStudent")]
    public int? IdStudent { get; set; }

    public string? Password { get; set; }

    public string? Role { get; set; }

    [InverseProperty("IdAccountNavigation")]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();

    [ForeignKey("IdDepartment")]
    [InverseProperty("Accounts")]
    public virtual Department? IdDepartmentNavigation { get; set; }

    [ForeignKey("IdStudent")]
    [InverseProperty("Accounts")]
    public virtual Student? IdStudentNavigation { get; set; }
}
