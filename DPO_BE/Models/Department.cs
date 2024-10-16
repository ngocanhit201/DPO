using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("Department")]
public partial class Department
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Code { get; set; }

    [InverseProperty("IdDepartmentNavigation")]
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();

    [InverseProperty("IdDepartmentNavigation")]
    public virtual ICollection<CaseProgress> CaseProgresses { get; set; } = new List<CaseProgress>();

    [InverseProperty("IdDepartmentNavigation")]
    public virtual ICollection<OrderProcedure> OrderProcedures { get; set; } = new List<OrderProcedure>();
}
