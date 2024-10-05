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
    public class GameController : BaseApiController
    {
        private readonly DataContext _context;

        // Dependency Injection of DataContext
        public GameController(DataContext context)
        {
            _context = context;
        }

        // GET: api/games
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            try
            {
                var games = await _context.Games.ToListAsync();
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
        public async Task<ActionResult<Game>> AddGame(Game game)
        {
            try
            {
                _context.Games.Add(game);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetGames), new { id = game.Id }, game);
            }
            catch (Exception ex)
            {
                // Return a 500 status with error details
                return StatusCode(500, new { message = "An error occurred while saving the game.", details = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
