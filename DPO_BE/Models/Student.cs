using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("Student")]
public partial class Student
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public string? Name { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Birthday { get; set; }

    [Column("MSV")]
    public string Msv { get; set; } = null!;

    public string? Class { get; set; }

    public string? Hometown { get; set; }

    public string? Major { get; set; }

    [Column("SDT")]
    public string? Sdt { get; set; }

    public string? Email { get; set; }

    public bool? IsMale { get; set; }

    [InverseProperty("IdStudentNavigation")]
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
}
