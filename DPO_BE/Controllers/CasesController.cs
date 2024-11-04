using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DPO.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DPO.Utils;

namespace DPO.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class CasesController : ControllerBase
	{
		private readonly StudentProceduresOnlineContext _context;
		private readonly ISendMailService _sendmailservice;

		public CasesController(StudentProceduresOnlineContext context, ISendMailService sendmailservice)
		{
			_context = context;
            _sendmailservice = sendmailservice;
		}

		// GET: api/Cases
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Case>>> GetCases()
		{
			return await _context.Cases.ToListAsync();
		}
		[HttpGet]
		public async Task<IActionResult> GetCasesByIdDepartment(int queryIdDepartment)
		{
			var listCaseAndDepartment =
			   from c in _context.Cases.AsNoTracking()
			   join p in _context.Procedures.AsNoTracking()
			   on c.IdProcedure equals p.Id into procedures

			   from p in procedures.DefaultIfEmpty()
			   join op in _context.OrderProcedures.AsNoTracking()
			   on p.Id equals op.IdProcedure into orderProcedures

			   from op in orderProcedures.DefaultIfEmpty()
			   join a in _context.Accounts.AsNoTracking()
			   on c.IdAccount equals a.Id into accounts

			   from a in accounts.DefaultIfEmpty()
			   join stu in _context.Students.AsNoTracking()
			   on a.IdStudent equals stu.Id into students
			   from stu in students.DefaultIfEmpty()
			   where op.IdDepartment == queryIdDepartment


			   select new
			   {
				   Case = c,
				   Procedure = p,
				   OrderProcedure = op,
				   Account = a,
				   Student = stu
			   };
			//from c in _context.Cases.AsNoTracking()
			//    join op in _context.OrderProcedures.AsNoTracking()
			//    on c.IdProcedure equals op.IdProcedure
			//    from p in _context.Procedures.AsNoTracking()
			//    join c.
			//    where op.IdDepartment == queryIdDepartment
			//    select new { Case = c};

			return Ok(listCaseAndDepartment);
		}
		[HttpGet]
		public async Task<IActionResult> GetStatusCaseForDepartment(int idDepartment, int idCase)
		{
			var listCaseProgress = _context.CaseProgresses.Where(e => e.IdCase == idCase).OrderBy(e => e.Id).ToList();
			var message = "";
			var huyStatus = listCaseProgress.FirstOrDefault(e => e.IdStatus == MyConstant.Status.HUYID);
			if (huyStatus != null) {
				message = "Thủ tục đã bị huỷ";
				return Ok(message);
			}
			foreach(var item in listCaseProgress)
			{
				if (item.IdStatus == MyConstant.Status.HUYID)
				{
					message = "Thủ tục đã bị huỷ";
					break;
				}
				if (item.IdDepartment == idDepartment && item.IdStatus == MyConstant.Status.UNSETID)
				{
					message = "Duyệt";
					break;
				}
				if (item.IdDepartment == idDepartment && item.IdStatus == MyConstant.Status.DUYETID)
				{
					message = "Đã duyệt";

					break;
				}
				if (item.IdDepartment != idDepartment && item.IdStatus == MyConstant.Status.UNSETID)
				{
					message = "Chờ phòng ban trước xử lý";
					break;
				}
	


			}
			// check is done
		

			return Ok(message);
		}
		[HttpPost]
		public async Task<IActionResult> ApproveCase(int idCase,  int idDepartment,  int statusCode)
		{
			var thisCase = _context.CaseProgresses.FirstOrDefault(e => e.IdCase == idCase && e.IdDepartment == idDepartment);
			if (thisCase == null)
			{
				return BadRequest("not found case");
			}
			thisCase.IdStatus = statusCode;
			_context.Update(thisCase);
			_context.SaveChanges();
			var listCaseProgress = _context.CaseProgresses.Where(e => e.IdCase == idCase).OrderBy(e => e.Id).ToList();

			var countDuyet = listCaseProgress.Where(e => e.IdStatus == MyConstant.Status.DUYETID).Count();
			if (countDuyet == listCaseProgress.Count())
			{
				await GodMethod.SendMailResutl(_sendmailservice);

			}
			return Ok(statusCode);
		}
		// GET: api/Cases/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Case>> GetCase(int id)
		{
			var @case = await _context.Cases.Include(e => e.Files).FirstOrDefaultAsync(e => e.Id == id);

			if (@case == null)
			{
				return NotFound();
			}

			return @case;
		}

		// PUT: api/Cases/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutCase(int id, Case @case)
		{
			if (id != @case.Id)
			{
				return BadRequest();
			}

			_context.Entry(@case).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!CaseExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// POST: api/Cases
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<Case>> PostCase(CreateCaseModel @case)
		{
			var myCase = new Case()
			{
				IdAccount = @case.IdAccount,

				IdProcedure = @case.IdProcedure,
				IdResultForm = @case.IdResultForm,
				DateCreate = DateTime.Now,

			};
			
			// save
			_context.Cases.Add(myCase);
			await _context.SaveChangesAsync();
			// add un set progress
			var listProgress = _context.OrderProcedures.Where(p => p.IdProcedure == @case.IdProcedure).OrderBy(e => e.Order).ToList();
			var listCaseProgress = new List<CaseProgress>();
			foreach (var item in listProgress)
			{
				var caseProgress = new CaseProgress()
				{
					IdStatus = (int?)MyConstant.UnsetStatus.Id,
					IdDepartment = item.IdDepartment,
					IdCase = myCase.Id
				};
				listCaseProgress.Add(caseProgress);
			}
			_context.AddRange(listCaseProgress);
			_context.SaveChanges();
			if (@case.files != null)
			{
				string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", @case.IdAccount.ToString(), myCase.Id.ToString());
				foreach (var file in @case.files)
				{
					GodMethod.UploadFile(file, path);
					_context.Files.Add(new Models.File()
					{
						IdCase = myCase.Id,
						Name = file.Name,
						Url = GodMethod.ConcatWithSlash(new List<string>() { "Uploads", @case.IdAccount.ToString(), myCase.Id.ToString(), file.FileName })

					});
					await _context.SaveChangesAsync();

				}

			}





			return Ok(myCase);
		}
		[HttpGet]
		public async Task<IActionResult> GetCaseProgress(int idCase)
		{
			var listCaseOfProgress = _context.CaseProgresses.Where(e =>  e.IdCase == idCase).Include(e => e.IdStatusNavigation).Include(e => e.IdDepartmentNavigation).AsNoTracking().ToList();
			return Ok(listCaseOfProgress);
		}
		// DELETE: api/Cases/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCase(int id)
		{
			var @case = await _context.Cases.FindAsync(id);
			if (@case == null)
			{
				return NotFound();
			}

			_context.Cases.Remove(@case);
			await _context.SaveChangesAsync();

			return NoContent();
		}
		[HttpGet]
		public async Task<IActionResult> Test()
		{

			MailContent content = new MailContent
			{
				To = "ngocanhit201@gmail.com",
				Subject = "DNU: Thông Báo Giải Quyết Thủ Tục",
				Body = GodMethod.MailContent(null, null)
			};
			await _sendmailservice.SendMail(content);
			return Ok("OK");
		}

		private bool CaseExists(int id)
		{
			return _context.Cases.Any(e => e.Id == id);
		}
	}
	public class CreateCaseModel
	{
		public int IdAccount { get; set; }
		public int IdProcedure { get; set; }
		public int? IdResultForm { get; set; }
		public List<IFormFile>? files { get; set; }

	}
}
