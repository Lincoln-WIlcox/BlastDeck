using System.Security.Claims;
using BlastDeck.Data;
using BlastDeck.Models;
using BlastDeck.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public IActionResult GetCards()
    {
        return Ok(
            _dbContext.Cards.Include(c => c.Answers).Select(c => new GetCardsDTO(c)).ToList()
        );
    }

    [HttpPost("{id}/star")]
    [Authorize]
    public IActionResult StarCard(int id)
    {
        Card? card = _dbContext.Cards.SingleOrDefault(c => c.Id == id);

        if (card == null)
        {
            return BadRequest();
        }

        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        UserCard userCard = new UserCard { CardId = card.Id, UserId = profile.Id };

        _dbContext.UserCards.Add(userCard);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}/unstar")]
    [Authorize]
    public IActionResult UnStarCard(int id)
    {
        Card? card = _dbContext.Cards.SingleOrDefault(c => c.Id == id);

        if (card == null)
        {
            return BadRequest($"Card does not exist with Id {id}");
        }

        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        UserCard? userCard = _dbContext.UserCards.SingleOrDefault(uc =>
            uc.CardId == card.Id && uc.UserId == profile.Id
        );

        if (userCard == null)
        {
            return BadRequest("This card is not starred by the current user.");
        }

        _dbContext.Remove(userCard);
        _dbContext.SaveChanges();

        return NoContent();
    }
}
