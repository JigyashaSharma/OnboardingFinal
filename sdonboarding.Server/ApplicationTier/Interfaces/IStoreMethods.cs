using sdonboarding.Server.ApplicationTier.Common;
using sdonboarding.Server.ApplicationTier.Dtos;

namespace sdonboarding.Server.ApplicationTier.Interfaces
{
    public interface IStoreMethods
    {
        public Task<PagedDtos<StoreDto>?> GetAllStoresAsync(int pageNumber, int pageSize);
        public Task<StoreDto?> GetStoreAsync(int id);

        public Task<StoreDto> AddStoreAsync(StoreDto storeDto);

        public Task<StoreDto> UpdateStoreAsync(int id, StoreDto storeDto);

        public Task<StoreDto> PatchStoreDetails(int id, StoreDto storeDto);
        public Task<StatusEnum> DeleteStoreAsync(int id);
        public bool StoreExists(int id);
    }
}
