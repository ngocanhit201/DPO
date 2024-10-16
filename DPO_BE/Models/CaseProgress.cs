using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("CaseProgress")]
public partial class CaseProgress
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("idStatus")]
    public int? IdStatus { get; set; }

    [Column("idDepartment")]
    public int? IdDepartment { get; set; }

    public int? IdCase { get; set; }

    [ForeignKey("IdCase")]
    [InverseProperty("CaseProgresses")]
    public virtual Case? IdCaseNavigation { get; set; }

    [ForeignKey("IdDepartment")]
    [InverseProperty("CaseProgresses")]
    public virtual Department? IdDepartmentNavigation { get; set; }

    [ForeignKey("IdStatus")]
    [InverseProperty("CaseProgresses")]
    public virtual State? IdStatusNavigation { get; set; }
}
