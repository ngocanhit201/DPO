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

    public int? IdCase { get; set; }

    [ForeignKey("IdCase")]
    [InverseProperty("CaseProgresses")]
    public virtual Case? IdCaseNavigation { get; set; }

    [ForeignKey("IdStatus")]
    [InverseProperty("CaseProgresses")]
    public virtual State? IdStatusNavigation { get; set; }
}
