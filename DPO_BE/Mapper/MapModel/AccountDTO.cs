using DPO.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DPO.Mapper.MapModel
{
    public class AccountDTO
    {
        public string? Username { get; set; }

        public int? IdDepartment { get; set; }

        public int Id { get; set; }

        public int? IdStudent { get; set; }

        public string? Password { get; set; }

        public string? Role { get; set; }


        public virtual ICollection<Case> Cases { get; set; } = new List<Case>();

        public virtual Department? IdDepartmentNavigation { get; set; }
        public virtual Student? IdStudentNavigation { get; set; }
    }
}
