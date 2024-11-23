using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DPO.Models;
using DPO.Utils;
using AutoMapper;

namespace DPO.Controllers
{

	public class ProceduresController : MyController
	{
		public ProceduresController(IMapper mapper, StudentProceduresOnlineContext context) : base(mapper, context)
		{
		}
		[HttpGet]
		public async Task<IActionResult> ListProcedure()
		{
			var procedures = _context.Procedures.ToList();
			return Ok(procedures);
		}
		[HttpGet]
		public async Task<IActionResult> ListOrderProcedureAllDepartment()
		{
			var listDepartment = _context.Departments.OrderBy(e => e.Id).ToList();
			var listProcedure = _context.Procedures.Include(e => e.OrderProcedures).OrderBy(e => e.Id).ToList();
			var listProcedureDerpartment = new List<List<string>>() { };
			listProcedure.ForEach(item =>
			{
				var procedureDepartment = new List<string>();
				procedureDepartment.Add(item.Name);
				listDepartment.ForEach(department =>
				{
					var itemOrderProcedure =  item.OrderProcedures.FirstOrDefault(op => op.IdDepartment == department.Id);
					if(itemOrderProcedure != null)
					{
						procedureDepartment.Add(itemOrderProcedure.Order.ToString());
					}
					else
					{
						procedureDepartment.Add("_");
					}

				});
				listProcedureDerpartment.Add(procedureDepartment);
			});

			return Ok(listProcedureDerpartment);
		}
		[HttpGet]
		public async Task<IActionResult> ProcedureProgresStatus(int idProcedure, int idCase)
		{
			var results = new List<ProcedureProgresStatusModel>();
			var listOrderProcedure = _context.OrderProcedures.Where(e => e.IdProcedure == idProcedure).OrderBy(e => e.Order).Include(e => e.IdDepartmentNavigation).Select(e => new { e.IdDepartment, e.Order, e.IdDepartmentNavigation.Name }).ToList();
			var listCaseProgress = _context.CaseProgresses.Where(e => e.IdCase == idCase).OrderBy(e => e.Id).ToList();
			foreach (var item in listOrderProcedure)
			{
				var result = new ProcedureProgresStatusModel()
				{
					idDepartment = item.IdDepartment ?? 0,
					nameDepartment = item.Name,
				};
				var status = listCaseProgress.FirstOrDefault(e => e.IdDepartment == item.IdDepartment);
				if (status != null)
				{
				}
			}

			return Ok("Tam chua xu ly");
		}
		[HttpPost]
		public async Task<IActionResult> CreateProcedure([FromBody] Procedure procedure)
		{
			_context.Add(procedure);
			_context.SaveChanges();
			return Ok(procedure);

		}
		[HttpPost]
		public async Task<IActionResult> DeleteProcedure(int id)
		{
			var x = _context.Procedures.ToList();
			var procedure = await _context.Procedures.FirstOrDefaultAsync(p => p.Id == id);
			if (procedure == null)
			{
				return BadRequest("Not found");
			}
			_context.Remove(procedure);
			return Ok(id);
		}
		[HttpGet]
		public async Task<IActionResult> GetByProcedureById(int id)
		{
			var x = _context.Procedures.ToList();
			var procedure = _context.Procedures.Include(p => p.OrderProcedures).ThenInclude(op => op.IdDepartmentNavigation).Include(p => p.IdPapers).FirstOrDefault(p => p.Id == id);
			if (procedure == null)
			{
				return BadRequest("Not found");
			}
			return Ok(procedure);
		}
	}
	public class ProcedureProgresStatusModel
	{
		public int idDepartment { get; set; }
		public string? nameDepartment { get; set; }
		public int idState { get; set; }
		public string? nameState { get; set; }
		public string? codeState { get; set; }
	}
}
