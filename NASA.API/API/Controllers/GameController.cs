using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

 // api/users

public class GameController(DataContext context) : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Game>>> GetUsers()
    {
        var games = await context.Games.ToListAsync();

        return games;
    }
    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult<Game>> AddGame(Game game)
    {
        context.Games.Add(game);
        await context.SaveChangesAsync();
        return game;
    }
}   

