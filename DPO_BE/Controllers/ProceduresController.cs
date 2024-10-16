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

        [HttpPost]
        public async Task<IActionResult> CreateProcedure([FromBody] Procedure procedure )
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
           if(procedure == null)
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
}
