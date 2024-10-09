using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("Student")]
public partial class Student
{
    public string? Name { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Birthday { get; set; }

    [Key]
    [Column("MSV")]
    [StringLength(50)]
    public string Msv { get; set; } = null!;

    public string? Class { get; set; }

    public string? Hometown { get; set; }

    public string? Major { get; set; }

    [InverseProperty("MsvStudentNavigation")]
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
}
