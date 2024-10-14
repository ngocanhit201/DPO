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

        public CasesController(StudentProceduresOnlineContext context)
        {
            _context = context;
        }

        // GET: api/Cases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Case>>> GetCases()
        {
            return await _context.Cases.ToListAsync();
        }

        // GET: api/Cases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Case>> GetCase(int id)
        {
            var @case = await _context.Cases.FindAsync(id);

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
              
            };
           
            _context.Cases.Add(myCase);
            await _context.SaveChangesAsync();

            if (@case.files != null) {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", @case.IdAccount.ToString(), myCase.Id.ToString());
                foreach (var file in @case.files) { 
                    GodMethod.UploadFile(file, path);
                    _context.Files.Add(new Models.File()
                    {
                        IdCase = myCase.Id,
                        Name = file.Name,
                        Url = path+'\\'+file.Name

                    });
                    await _context.SaveChangesAsync();

                }

            }
        

            


           return Ok(myCase);
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
