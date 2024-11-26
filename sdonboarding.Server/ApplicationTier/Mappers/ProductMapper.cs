using sdonboarding.Server.ApplicationTier.Dtos;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.ApplicationTier.Mappers
{
    public class ProductMapper
    {
        public static Product ProductDtoToEntity(ProductDto productDto)
        {
            var entity = new Product
            {
                Id = productDto.Id,
                Name = productDto.Name,
                Price = productDto.Price
            };

            return entity;
        }

        public static ProductDto EntityToProductDto(Product product)
        {
            var dto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price
            };

            return dto;
        }
    }
}
