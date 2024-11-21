using sdonboarding.Server.ApplicationTier.Dtos;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.ApplicationTier.Mappers
{
    public class StoreMapper
    {
        public static Store StoreDtoToEntity(StoreDto storeDto)
        {
            return new Store
            {
                Id = storeDto.Id,
                Name = storeDto.Name,
                Address = storeDto.Address
            };
        }

        public static StoreDto EntityToStoreDto(Store store)
        {
            return new StoreDto(store);
        }
    }
}
