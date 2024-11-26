using Microsoft.EntityFrameworkCore;
using sdonboarding.Server.ApplicationTier.Common;
using sdonboarding.Server.ApplicationTier.Dtos;
using sdonboarding.Server.ApplicationTier.Interfaces;
using sdonboarding.Server.ApplicationTier.Mappers;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.ApplicationTier.Classes
{
    public class CustomerMethods : ICustomerMethods
    {
        private readonly IndustryConnectOnboardingContext _context;

        public CustomerMethods(IndustryConnectOnboardingContext context)
        {
            _context = context;
        }

        public async Task<PagedDtos<CustomerDto>?> GetAllCustomersAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _context.Customers.CountAsync();

            if (totalCount < 0)
            {
                //Nothing in table
                return null;
            }

            var customersDto = await _context.Customers
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(c => CustomerMapper.EntityToCustomerDto(c))
                .ToListAsync();

            //Pagination
            //add the CustomerDto to the paged Dto
            return new PagedDtos<CustomerDto>
            {
                Dtos = customersDto,
                TotalCount = totalCount
            };
        }
        public async Task<CustomerDto?> GetCustomerAsync(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return null;
            }

            //detaching the entity so that it can be reused later
            _context.Entry(customer).State = EntityState.Detached;
            return CustomerMapper.EntityToCustomerDto(customer);
        }
        public async Task<CustomerDto> AddCustomerAsync(CustomerDto customerDto)
        {
            var customer = CustomerMapper.CustomerDtoToEntity(customerDto);

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CustomerMapper.EntityToCustomerDto(customer);
        }

        public async Task<CustomerDto> UpdateCustomerAsync(int id, CustomerDto customerDto)
        {
            var customer = CustomerMapper.CustomerDtoToEntity(customerDto);

            if (!CustomerExists(id))
            {
                //Customer doesn't exist add it.

                customerDto = CustomerMapper.EntityToCustomerDto(customer);
                return await AddCustomerAsync(customerDto);
            }
            else
            {
                customer.Id = id;
                _context.Entry(customer).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return CustomerMapper.EntityToCustomerDto(customer);
            }
        }

        public async Task<CustomerDto> PatchCustomerDetails(int id, CustomerDto customerDto)
        {

            var customer = CustomerMapper.CustomerDtoToEntity(customerDto);

            _context.Entry(customer).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return customerDto;
        }
        public async Task<StatusEnum> DeleteCustomerAsync(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return StatusEnum.NotFound;
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return StatusEnum.NoContent;
        }

        public bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
    }
}
