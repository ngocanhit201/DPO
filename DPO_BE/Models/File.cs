﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DPO.Models;

[Table("File")]
public partial class File
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public string? Name { get; set; }

    [Column("idCase")]
    public int? IdCase { get; set; }

    public string? Url { get; set; }

    [ForeignKey("IdCase")]
    [InverseProperty("Files")]
    public virtual Case? IdCaseNavigation { get; set; }
}
