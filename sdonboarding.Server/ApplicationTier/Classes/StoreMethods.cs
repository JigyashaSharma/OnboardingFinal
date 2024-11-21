using Microsoft.EntityFrameworkCore;
using sdonboarding.Server.ApplicationTier.Common;
using sdonboarding.Server.ApplicationTier.Dtos;
using sdonboarding.Server.ApplicationTier.Interfaces;
using sdonboarding.Server.ApplicationTier.Mappers;
using sdonboarding.Server.Models;

namespace sdonboarding.Server.ApplicationTier.Classes
{
    public class StoreMethods : IStoreMethods
    {
        private readonly IndustryConnectOnboardingContext _context;

        public StoreMethods(IndustryConnectOnboardingContext context)
        {
            _context = context;
        }

        public async Task<PagedDtos<StoreDto>?> GetAllStoresAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _context.Stores.CountAsync();

            if (totalCount < 0)
            {
                //Nothing in table
                return null;
            }

            var storesDto = await _context.Stores
                .Include(s => s.Sales)
                .ThenInclude(s => s.Product)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(st => StoreMapper.EntityToStoreDto(st))
                .ToListAsync();

            //Pagination
            //add the StoreDto to the paged Dto
            return new PagedDtos<StoreDto>
            {
                Dtos = storesDto,
                TotalCount = totalCount
            };
        }
        public async Task<StoreDto?> GetStoreAsync(int id)
        {
            var store = await _context.Stores
                .Include(s => s.Sales)
                .ThenInclude(s => s.Product)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (store == null)
            {
                return null;
            }

            //detaching the entity so that it can be reused later
            _context.Entry(store).State = EntityState.Detached;
            return StoreMapper.EntityToStoreDto(store);
        }
        public async Task<StoreDto> AddStoreAsync(StoreDto storeDto)
        {
            var store = StoreMapper.StoreDtoToEntity(storeDto);
            _context.Stores.Add(store);
            await _context.SaveChangesAsync();

            //loading sales for store and Product sold
            await _context.Entry(store)
                .Collection(s => s.Sales)
                .Query()
                .Include(s => s.Product)
                .LoadAsync();

            return StoreMapper.EntityToStoreDto(store);
        }
        public async Task<StoreDto> UpdateStoreAsync(int id, StoreDto storeDto)
        {
            var store = StoreMapper.StoreDtoToEntity(storeDto);

            if (!StoreExists(id))
            {
                //Store doesn't exist add it.

                storeDto = StoreMapper.EntityToStoreDto(store);
                return await AddStoreAsync(storeDto);
            }
            else
            {
                store.Id = id;
                _context.Entry(store).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                //load sales collection
                await _context.Entry(store)
                    .Collection(s => s.Sales)
                    .Query()
                    .Include(s => s.Product)
                    .LoadAsync();
                return StoreMapper.EntityToStoreDto(store);
            }
        }
        public async Task<StoreDto> PatchStoreDetails(int id, StoreDto storeDto)
        {
            var store = StoreMapper.StoreDtoToEntity(storeDto);

            _context.Entry(store).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return storeDto;
        }

        public async Task<StatusEnum> DeleteStoreAsync(int id)
        {
            var store = await _context.Stores.FindAsync(id);
            if (store == null)
            {
                return StatusEnum.NotFound;
            }

            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();

            return StatusEnum.NoContent;
        }
        public bool StoreExists(int id)
        {
            return _context.Stores.Any(e => e.Id == id);
        }
    }
}
