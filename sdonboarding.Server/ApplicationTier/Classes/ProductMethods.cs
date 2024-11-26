using Microsoft.EntityFrameworkCore;
using sdonboarding.Server.ApplicationTier.Common;
using sdonboarding.Server.ApplicationTier.Dtos;
using sdonboarding.Server.ApplicationTier.Interfaces;
using sdonboarding.Server.ApplicationTier.Mappers;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.ApplicationTier.Classes
{
    public class ProductMethods : IProductMethods
    {
        private readonly IndustryConnectOnboardingContext _context;

        public ProductMethods(IndustryConnectOnboardingContext context)
        {
            _context = context;
        }
        public async Task<PagedDtos<ProductDto>?> GetAllProductsAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _context.Products.CountAsync();

            if (totalCount < 0)
            {
                //Nothing in table
                return null;
            }

            var products = await _context.Products
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            //Add the returned product to ProductDto
            List<ProductDto> productsDto = new List<ProductDto>();

            foreach (var product in products)
            {
                productsDto.Add(ProductMapper.EntityToProductDto(product));
            }

            //Pagination
            //add the ProductDto to the paged Dto
            return new PagedDtos<ProductDto>
            {
                Dtos = productsDto,
                TotalCount = totalCount
            };
        }

        public async Task<ProductDto?> GetProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return null;
            }

            //detaching the entity so that it can be reused later
            _context.Entry(product).State = EntityState.Detached;
            return ProductMapper.EntityToProductDto(product);
        }

        public async Task<ProductDto> AddProductAsync(ProductDto productDto)
        {
            var product = ProductMapper.ProductDtoToEntity(productDto);
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return ProductMapper.EntityToProductDto(product);
        }

        public async Task<ProductDto> UpdateProductAsync(int id, ProductDto productDto)
        {
            var product = ProductMapper.ProductDtoToEntity(productDto);

            if (!ProductExists(id))
            {
                //Product doesn't exist add it.

                var pDto = ProductMapper.EntityToProductDto(product);
                return await AddProductAsync(pDto);
            }
            else
            {
                product.Id = id;
                _context.Entry(product).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return ProductMapper.EntityToProductDto(product);
            }
        }

        public async Task<ProductDto> PatchProductDetails(int id, ProductDto productDto)
        {

            var product = ProductMapper.ProductDtoToEntity(productDto);
            _context.Entry(product).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return productDto;
        }
        public async Task<StatusEnum> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return StatusEnum.NotFound;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return StatusEnum.NoContent;
        }

        public bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
