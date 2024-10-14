using AutoMapper;
using DPO.Mapper.MapModel;
using DPO.Models;
using DPO.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DPO.Controllers
{
    public class AuthController : MyController
    {
        public AuthController(IMapper mapper, StudentProceduresOnlineContext context) : base(mapper, context)
        {
        }
        [HttpGet]
        public async Task<IActionResult> Login(string username, string password)
        {
            var user = _context.Accounts.Include(e => e.IdStudentNavigation).Include(e=> e.IdDepartmentNavigation).FirstOrDefault(e => e.Password == password && e.Username == username);
            if (user == null)
            {
                return BadRequest("Not fond");
            }
            var userDto = _mapper.Map<AccountDTO>(user);
            return Ok(userDto);
        }
    }
}
