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
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        return Ok(
            _dbContext
                .Cards.Include(c => c.Answers)
                .Select(c => new GetCardsDTO(c))
                .ToList()
                .Select(c =>
                {
                    //this checked if this card is starred by this user.
                    UserCard? userCard = _dbContext.UserCards.SingleOrDefault(uc =>
                        uc.UserId == profile.Id && uc.CardId == c.Id
                    );
                    c.Starred = userCard == null;
                    return c;
                })
        );
    }

    [HttpPost("{id}/star")]
    [Authorize]
    public IActionResult StarCard(int id)
    {
        Card? card = _dbContext.Cards.SingleOrDefault(c => c.Id == id);

        if (card == null)
        {
            return BadRequest($"There is no card with Id {id}");
        }

        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        UserCard? existingUserCard = _dbContext.UserCards.SingleOrDefault(uc =>
            uc.CardId == card.Id && uc.UserId == profile.Id
        );

        if (existingUserCard != null)
        {
            return BadRequest("This card is already starred.");
        }

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

    [HttpPost]
    [Authorize]
    public IActionResult CreateCardByMe(PostCardDTO postedCard)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        Card card = new Card
        {
            ImageURL = postedCard.ImageURL,
            CreatorId = profile.Id,
            EnglishWord = postedCard.EnglishWord,
            CorrectAnswerId = 1
        };

        _dbContext.Cards.Add(card);
        _dbContext.SaveChanges();

        for (int i = 0; i < postedCard.Answers.Count; i++)
        {
            Answer answer = new Answer { Word = postedCard.Answers[i], CardId = card.Id };
            _dbContext.Answers.Add(answer);
            _dbContext.SaveChanges();
            if (i == postedCard.CorrectAnswerIndex)
            {
                card.CorrectAnswerId = answer.Id;
            }
        }

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpGet("/mine")]
    public IActionResult GetCardsByMe()
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        return Ok(
            _dbContext.Cards.Where(c => c.CreatorId == profile.Id).Select(c => new GetCardsDTO(c))
        );
    }
}
