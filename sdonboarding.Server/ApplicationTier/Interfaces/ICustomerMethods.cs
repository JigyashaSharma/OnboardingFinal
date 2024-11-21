using sdonboarding.Server.ApplicationTier.Dtos;
using sdonboarding.Server.ApplicationTier.Common;

namespace sdonboarding.Server.ApplicationTier.Interfaces
{
    public interface ICustomerMethods
    {
        public Task<CustomerDto?> GetCustomerAsync(int id);

        public Task<PagedDtos<CustomerDto>?> GetAllCustomersAsync(int pageNumber, int pageSize);

        public Task<CustomerDto> AddCustomerAsync(CustomerDto customerDto);
        public Task<CustomerDto> UpdateCustomerAsync(int id, CustomerDto customerDto);
        public Task<CustomerDto> PatchCustomerDetails(int id, CustomerDto customerDto);

        public Task<StatusEnum> DeleteCustomerAsync(int id);
        public bool CustomerExists(int id);
    }
}
