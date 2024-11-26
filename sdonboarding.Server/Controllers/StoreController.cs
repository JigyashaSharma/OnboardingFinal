using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using sdonboarding.Server.ApplicationTier.Common;
using sdonboarding.Server.ApplicationTier.Dtos;
using sdonboarding.Server.ApplicationTier.Interfaces;

namespace sdonboarding.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreMethods _storeMethods;
        public StoreController(IStoreMethods storeMethods)
        {
            _storeMethods = storeMethods;
        }

        // GET: api/Store
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PagedDtos<StoreDto>>>> GetStores(int pageNumber, int pageSize)
        {
            try
            {
                var pagedResult = await _storeMethods.GetAllStoresAsync(pageNumber, pageSize);
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

        // GET: api/Store/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreDto>> GetStore(int id)
        {
            try
            {
                var storeDto = await _storeMethods.GetStoreAsync(id);
                if (storeDto == null)
                {
                    return NotFound();
                }
                return storeDto;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Store/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<StoreDto>> Put(int id, StoreDto? storeDto)
        {
            try
            {
                if (storeDto == null)
                {
                    return BadRequest("Provide some value for Store.");
                }

                storeDto = await _storeMethods.UpdateStoreAsync(id, storeDto);
                return Ok(storeDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Store
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StoreDto>> Post(StoreDto? storeDto)
        {
            try
            {
                if (storeDto == null)
                {
                    return BadRequest("Give proper values for Store.");
                }

                storeDto = await _storeMethods.AddStoreAsync(storeDto);
                return Created("", storeDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<StoreDto>> Patch(int id, [FromBody] JsonPatchDocument<StoreDto> patchDto)
        {
            try
            {
                if (patchDto == null)
                {
                    return BadRequest("No values were send to change");
                }

                var storeDto = await _storeMethods.GetStoreAsync(id);

                if (storeDto == null)
                {
                    return BadRequest($"Store with ID {id} was not found.");
                }

                patchDto.ApplyTo(storeDto);

                storeDto = await _storeMethods.PatchStoreDetails(id, storeDto);

                return Ok(storeDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        // DELETE: api/Store/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeleteStore(int id)
        {
            try
            {
                var status = await _storeMethods.DeleteStoreAsync(id);

                if (status == StatusEnum.NoContent)
                {
                    return $"Store with Id: {id} deleted successfully!!!";
                }
                else
                {
                    return NotFound();
                }
            }
            catch (DbUpdateException dbEx)
            {
                var message = "";
                // Check if the InnerException is a SqlException
                if (dbEx.InnerException is SqlException sqlEx)
                {

                    // Now you can access the 'Number' property of SqlException
                    int sqlErrorNumber = sqlEx.Number;

                    // You can also log or handle the specific error number
                    Console.WriteLine($"SQL Error Number: {sqlErrorNumber}");

                    // Handle different SQL error numbers if necessary
                    if (sqlErrorNumber == 547) // Foreign key constraint violation error number
                    {
                        message = "Cannot delete Store, it has reference in Sale.";
                        Console.WriteLine(message);
                        return message;
                    }
                    message = $"An error occurred: {dbEx.Message}";
                    Console.WriteLine(message);
                    return message;
                }
                else
                {
                    // If InnerException is not a SqlException, handle accordingly
                    message = $"An error occurred: {dbEx.Message}";
                    Console.WriteLine(message);
                    return message;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
