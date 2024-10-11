using AutoMapper;
using DPO.Mapper.MapModel;
using DPO.Models;

namespace DPO.Mapper
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // Add your mappings here
            CreateMap<Account, AccountDTO>();
            // Example:
            // CreateMap<Customer, CustomerDto>();
        }

    }
}
