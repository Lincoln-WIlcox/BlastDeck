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
public class AnswerController : ControllerBase
{
    private BlastDeckDbContext _dbContext;

    public AnswerController(BlastDeckDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost("passive")]
    [Authorize]
    public IActionResult AnswerPassive(PostAnswerPassiveDTO postUserAnswer)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        Card? card = _dbContext.Cards.SingleOrDefault(c => c.Id == postUserAnswer.CardId);

        UserCard? userCard = _dbContext.UserCards.SingleOrDefault(uc =>
            uc.CardId == postUserAnswer.CardId && uc.UserId == profile.Id
        );

        if (userCard == null || card == null)
        {
            return BadRequest();
        }

        bool AnsweredCorrectly = card.CorrectAnswer == postUserAnswer.Answer;

        UserAnswer userAnswer = new UserAnswer
        {
            UserCardId = userCard.Id,
            AnsweredCorrectly = AnsweredCorrectly,
            Stage = 2,
            DateAnswered = DateTime.Now
        };

        _dbContext.UserAnswers.Add(userAnswer);
        _dbContext.SaveChanges();

        return Ok(
            new WasAnswerCorrectDTO
            {
                AnsweredCorrectly = AnsweredCorrectly,
                CorrectAnswer = card.CorrectAnswer,
                AudioURL = card.AudioURL
            }
        );
    }

    [HttpPost("active")]
    [Authorize]
    public IActionResult AnswerActive(ActiveAnswerDTO activeAnswer)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        Card? card = _dbContext.Cards.SingleOrDefault(c => c.Id == activeAnswer.CardId);

        UserCard? userCard = _dbContext.UserCards.SingleOrDefault(uc =>
            uc.CardId == activeAnswer.CardId && uc.UserId == profile.Id
        );

        if (userCard == null || card == null)
        {
            return BadRequest();
        }

        bool AnsweredCorrectly =
            card.CorrectAnswer.ToLower().Trim() == activeAnswer.Answer.ToLower().Trim();

        UserAnswer userAnswer = new UserAnswer
        {
            UserCardId = userCard.Id,
            AnsweredCorrectly = AnsweredCorrectly,
            Stage = 3,
            DateAnswered = DateTime.Now
        };

        _dbContext.UserAnswers.Add(userAnswer);
        _dbContext.SaveChanges();

        return Ok(
            new WasAnswerCorrectDTO
            {
                AnsweredCorrectly = AnsweredCorrectly,
                CorrectAnswer = card.CorrectAnswer,
                AudioURL = card.AudioURL
            }
        );
    }
}
