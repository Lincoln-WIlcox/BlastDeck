using System.Security.Claims;
using System.Text;
using BlastDeck.Data;
using BlastDeck.Models;
using BlastDeck.Models.DTOs;
using BlastDeck.Models.DTOs;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlastDeck.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CardController : ControllerBase
{
    private BlastDeckDbContext _dbContext;

    public CardController(BlastDeckDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    public IActionResult GetCards()
    {
        return Ok(
            _dbContext.Cards.Include(c => c.Answers).Select(c => new GetCardsDTO(c)).ToList()
        );
    }
}
