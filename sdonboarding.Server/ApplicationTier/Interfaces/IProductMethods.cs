using sdonboarding.Server.ApplicationTier.Common;
using sdonboarding.Server.ApplicationTier.Dtos;

namespace sdonboarding.Server.ApplicationTier.Interfaces
{
    public interface IProductMethods
    {
        public Task<PagedDtos<ProductDto>?> GetAllProductsAsync(int pageNumber, int pageSize);
        public Task<ProductDto?> GetProductAsync(int id);

        public Task<ProductDto> AddProductAsync(ProductDto product);

        public Task<ProductDto> UpdateProductAsync(int id, ProductDto product);

        public Task<ProductDto> PatchProductDetails(int id, ProductDto product);
        public Task<StatusEnum> DeleteProductAsync(int id);
        public bool ProductExists(int id);
    }
}
