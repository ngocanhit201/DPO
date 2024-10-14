using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DPO.Models;

namespace DPO.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ResultFromsController : ControllerBase
    {
        private readonly StudentProceduresOnlineContext _context;

        public ResultFromsController(StudentProceduresOnlineContext context)
        {
            _context = context;
        }

        // GET: api/ResultFroms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResultFrom>>> GetResultFroms()
        {
            return await _context.ResultFroms.ToListAsync();
        }

        // GET: api/ResultFroms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResultFrom>> GetResultFrom(int id)
        {
            var resultFrom = await _context.ResultFroms.FindAsync(id);

            if (resultFrom == null)
            {
                return NotFound();
            }

            return resultFrom;
        }

        // PUT: api/ResultFroms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResultFrom(int id, ResultFrom resultFrom)
        {
            if (id != resultFrom.Id)
            {
                return BadRequest();
            }

            _context.Entry(resultFrom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultFromExists(id))
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

        // POST: api/ResultFroms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ResultFrom>> PostResultFrom(ResultFrom resultFrom)
        {
            _context.ResultFroms.Add(resultFrom);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResultFrom", new { id = resultFrom.Id }, resultFrom);
        }

        // DELETE: api/ResultFroms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResultFrom(int id)
        {
            var resultFrom = await _context.ResultFroms.FindAsync(id);
            if (resultFrom == null)
            {
                return NotFound();
            }

            _context.ResultFroms.Remove(resultFrom);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResultFromExists(int id)
        {
            return _context.ResultFroms.Any(e => e.Id == id);
        }
    }
}
