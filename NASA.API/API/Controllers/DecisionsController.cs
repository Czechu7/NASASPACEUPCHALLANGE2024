using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    // api/games
    public class DecisionsController : BaseApiController
    {
        private readonly DataContext _context;

        // Dependency Injection of DataContext
        public DecisionsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/games
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Decisions>>> GetGames()
        {
            try
            {
                var games = await _context.Decisions.ToListAsync();
                return Ok(games);
            }
            catch (Exception ex)
            {
                // Return a 500 status with error details
                return StatusCode(500, new { message = "An error occurred while retrieving the games.", details = ex.Message });
            }
        }

        // POST: api/games
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Decisions>> AddGame(Decisions Decisions)
        {
            try
            {
                _context.Decisions.Add(Decisions);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetGames), new { id = Decisions.Id }, Decisions);
            }
            catch (Exception ex)
            {
                // Return a 500 status with error details
                return StatusCode(500, new { message = "An error occurred while saving the game.", details = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
