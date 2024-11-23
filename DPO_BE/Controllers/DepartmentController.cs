using AutoMapper;
using DPO.Models;
using DPO.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DPO.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class DepartmentController : MyController
	{
		public DepartmentController(IMapper mapper, StudentProceduresOnlineContext context) : base(mapper, context)
		{
		}
		[HttpGet]
		public async Task<IActionResult> GetListDepartment()
		{
			var listPaper = await _context.Departments.ToListAsync();
			return Ok(listPaper);
		}



	}
}
