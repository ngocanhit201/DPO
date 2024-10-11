using AutoMapper;
using DPO.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DPO.Utils
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MyController : ControllerBase
    {
        public StudentProceduresOnlineContext _context;
        public IMapper _mapper;

        public MyController(IMapper mapper, StudentProceduresOnlineContext context)
        {
            _mapper = mapper;
            _context = context;
        }
    }
}
