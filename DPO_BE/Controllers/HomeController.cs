using DPO.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DPO.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        StudentProceduresOnlineContext _context = new StudentProceduresOnlineContext();
        public HomeController(StudentProceduresOnlineContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Home()
        {
            var students = _context.Students;
            return Ok(students);
        }

    }
}
