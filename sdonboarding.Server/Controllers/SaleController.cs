using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using sdonboarding.Server.ApplicationTier.Common;
using sdonboarding.Server.ApplicationTier.Dtos;
using sdonboarding.Server.ApplicationTier.Interfaces;

namespace sdonboarding.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly ISaleMethods _saleMethods;

        public SaleController(ISaleMethods saleMethods)
        {
            _saleMethods = saleMethods;
        }

        // GET: api/Sale
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PagedDtos<SaleDto>>>> GetAllSales(int pageNumber, int pageSize)
        {
            try
            {
                var pagedResult = await _saleMethods.GetAllSalesAsync(pageNumber, pageSize);
                if (pagedResult == null)
                {
                    return NotFound();
                }

                return Ok(pagedResult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Sale/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleDto>> GetSaleAsync(int id)
        {
            try
            {
                var saleDto = await _saleMethods.GetSaleAsync(id);
                if (saleDto == null)
                {
                    return NotFound();
                }
                return saleDto;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Sale/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SaleDto>> Post(SaleDto? saleDto)
        {
            try
            {
                if (saleDto == null)
                {
                    return BadRequest("Give proper values for sale.");
                }

                saleDto = await _saleMethods.AddSaleAsync(saleDto);
                return Created("", saleDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Sale
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<SaleDto>> Put(int id, SaleDto? saleDto)
        {
            try
            {
                if (saleDto == null)
                {
                    return BadRequest("Provide some value for Sale");
                }

                saleDto = await _saleMethods.UpdateSaleAsync(id, saleDto);
                return Ok(saleDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<SaleDto>> Patch(int id, [FromBody] JsonPatchDocument<SaleDto> patchDto)
        {
            try
            {
                if (patchDto == null)
                {
                    return BadRequest("No values were send to change");
                }

                var saleDto = await _saleMethods.GetSaleAsync(id);

                if (saleDto == null)
                {
                    return BadRequest($"Sale with ID {id} was not found.");
                }

                patchDto.ApplyTo(saleDto);

                saleDto = await _saleMethods.PatchSaleDetails(id, saleDto);

                return Ok(saleDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // DELETE: api/Sale/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(int id)
        {
            try
            {
                var status = await _saleMethods.DeleteSaleAsync(id);

                if (status == StatusEnum.NoContent)
                {
                    return $"Sale with Id: {id} deleted successfully!!!";
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
