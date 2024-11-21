using sdonboarding.Server.Models;

namespace sdonboarding.Server.ApplicationTier.Dtos
{
    public class SaleDto
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public int ProductId { get; set; }

        public DateTime DateSold { get; set; }

        public int StoreId { get; set; }

        public string? Customer { get; }

        public string? Product { get; }

        public string? Store { get; }

        public SaleDto() { }
        public SaleDto(Sale sale)
        {
            Id = sale.Id;
            CustomerId = sale.CustomerId;
            ProductId = sale.ProductId;
            StoreId = sale.StoreId;
            Customer = sale.Customer?.Name;
            Product = sale.Product?.Name;
            Store = sale.Store?.Name;
            DateSold = sale.DateSold;
        }
    }
}
