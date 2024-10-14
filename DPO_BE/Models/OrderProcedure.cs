using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("OrderProcedure")]
public partial class OrderProcedure
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("idProcedure")]
    public int? IdProcedure { get; set; }

    public int? Order { get; set; }

    [Column("idDepartment")]
    public int? IdDepartment { get; set; }

    [ForeignKey("IdDepartment")]
    [InverseProperty("OrderProcedures")]
    public virtual Department? IdDepartmentNavigation { get; set; }

    [ForeignKey("IdProcedure")]
    [InverseProperty("OrderProcedures")]
    public virtual Procedure? IdProcedureNavigation { get; set; }
}
