using sdonboarding.Server.ApplicationTier.Dtos;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.ApplicationTier.Mappers
{
    public class CustomerMapper
    {
        public static Customer CustomerDtoToEntity(CustomerDto customerDto)
        {
            var entity = new Customer
            {
                Id = customerDto.Id,
                Name = customerDto.Name,
                Address = customerDto.Address
            };

            return entity;
        }

        public static CustomerDto EntityToCustomerDto(Customer customer)
        {
            var dto = new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Address = customer.Address
            };
            return dto;
        }
    }
}
