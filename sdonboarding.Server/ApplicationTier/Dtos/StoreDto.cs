using sdonboarding.Server.Models;

namespace sdonboarding.Server.ApplicationTier.Dtos
{
    public class StoreDto
    {
        public int Id { get; set; }

        public string? Name { get; set; } = null!;

        public string? Address { get; set; }

        //Needed for the creation of StoreDto object for the controller request
        public StoreDto() { }
        public StoreDto(Store store)
        {
            Id = store.Id;
            Name = store?.Name;
            Address = store?.Address;
        }
    }
}
