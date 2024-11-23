using AutoMapper;
using DPO.Models;
using DPO.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DPO.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class PaperController : MyController
	{
		public PaperController(IMapper mapper, StudentProceduresOnlineContext context) : base(mapper, context)
		{
		}
		[HttpGet]
		public async Task<IActionResult> GetListPaper()
		{
			var listPaper = await _context.Papers.ToListAsync();
			return Ok(listPaper);
		}



	}
}
