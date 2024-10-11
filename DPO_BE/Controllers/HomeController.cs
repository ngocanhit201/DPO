using AutoMapper;
using DPO.Mapper.MapModel;
using DPO.Models;
using DPO.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DPO.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HomeController : MyController
    {
        public HomeController(IMapper mapper, StudentProceduresOnlineContext context) : base(mapper, context)
        {
        }

        [HttpGet]
        public async Task<IActionResult> ListProcedure()
        {
            var procedures = _context.Procedures.ToList();
            var acc = _context.Accounts.ToList();
            var accDto = _mapper.Map<List<AccountDTO>>(acc);
            accDto.Add(new AccountDTO());
            return Ok(accDto);
        }
       

    }
}
