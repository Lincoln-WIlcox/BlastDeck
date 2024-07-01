using System.Security.Claims;
using BlastDeck.Data;
using BlastDeck.Models;
using BlastDeck.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlastDeck.Controllers;

// switch (masteryLevel)
// {
//     case 1:
//     case 2:
//     case 3:
//         timeBeforePractice = new TimeSpan(1, 0, 0, 0);
//         break;
//     case 4:
//         timeBeforePractice = new TimeSpan(2, 0, 0, 0);
//         break;
//     case 5:
//         timeBeforePractice = new TimeSpan(3, 0, 0, 0);
//         break;
//     case 6:
//         timeBeforePractice = new TimeSpan(7, 0, 0, 0);
//         break;
//     case 7:
//         timeBeforePractice = new TimeSpan(14, 0, 0, 0);
//         break;
//     default:
//         timeBeforePractice = new TimeSpan(0);
//         break;
// }

[ApiController]
[Route("api/[controller]")]
public class CardController : ControllerBase
{
    Dictionary<int, TimeSpan> MasteryLevelTimeSpans = new Dictionary<int, TimeSpan>
    {
        { 0, new TimeSpan(0) },
        { 1, new TimeSpan(1, 0, 0, 0) },
        { 2, new TimeSpan(1, 0, 0, 0) },
        { 3, new TimeSpan(1, 0, 0, 0) },
        { 4, new TimeSpan(2, 0, 0, 0) },
        { 5, new TimeSpan(3, 0, 0, 0) },
        { 6, new TimeSpan(7, 0, 0, 0) },
        { 7, new TimeSpan(14, 0, 0, 0) }
    };

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
        createCard(postedCard);

        return NoContent();
    }

    [HttpGet("mine")]
    [Authorize]
    public IActionResult GetCardsByMe()
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        return Ok(
            _dbContext
                .Cards.Include(c => c.Answers)
                .Include(c => c.CorrectAnswer)
                .Where(c => c.CreatorId == profile.Id)
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

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetCardById(int id)
    {
        Card? card = _dbContext
            .Cards.Include(c => c.Answers)
            .Include(c => c.CorrectAnswer)
            .SingleOrDefault(c => c.Id == id);

        if (card == null)
        {
            return BadRequest();
        }

        return Ok(new GetCardsDTO(card));
    }

    [HttpGet("{id}/no-correct-answer")]
    [Authorize]
    public IActionResult GetCardByIdWithoutCorrectAnswer(int id)
    {
        Card? card = _dbContext.Cards.Include(c => c.Answers).SingleOrDefault(c => c.Id == id);

        if (card == null)
        {
            return BadRequest();
        }

        return Ok(new GetCardWithoutCorrectAnswerDTO(card));
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult UpdateCard(PostCardDTO puttingCard, int id)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        Card existingCard = _dbContext.Cards.SingleOrDefault(c => c.Id == id);

        if (existingCard == null || profile.Id != existingCard.CreatorId)
        {
            return BadRequest();
        }

        _dbContext.Cards.Remove(existingCard);

        _dbContext.SaveChanges();

        foreach (Answer answer in _dbContext.Answers)
        {
            if (answer.CardId == existingCard.Id)
            {
                _dbContext.Answers.Remove(answer);
            }
        }

        _dbContext.SaveChanges();

        createCard(puttingCard, id);

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeleteCard(int id)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        Card? card = _dbContext.Cards.SingleOrDefault(c => c.Id == id);

        if (card == null || card.CreatorId != profile.Id)
        {
            return BadRequest();
        }

        _dbContext.Cards.Remove(card);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpGet("starred")]
    [Authorize]
    public IActionResult GetStarredCards(int? notInSet)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        List<Card> cards = _dbContext
            .UserCards.Include(uc => uc.Card)
            .ThenInclude(c => c.Answers)
            .Include(uc => uc.Card)
            .ThenInclude(c => c.CorrectAnswer)
            .Include(uc => uc.UserCardSets)
            .Where(uc =>
                uc.UserId == profile.Id
                && (notInSet == null || uc.UserCardSets.All(ucs => ucs.SetId != notInSet))
            )
            .Select(uc => uc.Card)
            .ToList();

        return Ok(cards.Select(c => new GetStarredCardsDTO(c)));
    }

    [HttpGet("cards-to-practice")]
    [Authorize]
    public IActionResult GetCardsToPracticeIds(int? setId)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        List<Card> cards = _dbContext
            .UserCards.Include(uc => uc.Card)
            .ThenInclude(c => c.Answers)
            .Include(uc => uc.Card)
            .ThenInclude(c => c.CorrectAnswer)
            .Include(uc => uc.UserCardSets)
            .ToList()
            .Where(uc =>
            {
                if (
                    uc.UserId == profile.Id
                    && (
                        setId == null
                        || _dbContext.UserCardSets.SingleOrDefault(ucs =>
                            ucs.UserCardId == uc.Id && ucs.SetId == setId
                        ) != null
                    )
                )
                {
                    int masteryLevel = _dbContext
                        .UserAnswers.Where(ua => ua.UserCardId == uc.Id)
                        .GroupBy(ua => ua.DateAnswered.Date)
                        .ToList()
                        .Aggregate(
                            0,
                            (int masteryLevel, IGrouping<DateTime, UserAnswer> userAnswers) =>
                            {
                                bool answeredStage2Correctly = false;
                                bool answeredStage3Correctly = false;
                                foreach (UserAnswer userAnswer in userAnswers)
                                {
                                    if (!userAnswer.AnsweredCorrectly)
                                    {
                                        return Math.Max(masteryLevel - 1, 0);
                                    }
                                    else if (userAnswer.Stage == 2)
                                    {
                                        answeredStage2Correctly = true;
                                    }
                                    else if (userAnswer.Stage == 3)
                                    {
                                        answeredStage3Correctly = true;
                                    }
                                }
                                if (answeredStage2Correctly && answeredStage3Correctly)
                                {
                                    return Math.Min(masteryLevel + 1, 7);
                                }
                                return masteryLevel;
                            }
                        );

                    TimeSpan timeBeforePractice = MasteryLevelTimeSpans[masteryLevel];

                    List<UserAnswer> userAnswers = _dbContext
                        .UserAnswers.Where(ua => ua.UserCardId == uc.Id)
                        .ToList();

                    DateTime lastDatePracticed;
                    if (userAnswers.Count > 0)
                    {
                        lastDatePracticed = userAnswers.Max(ua => ua.DateAnswered);
                    }
                    else
                    {
                        return true;
                    }

                    if (DateTime.Today - lastDatePracticed.Date >= timeBeforePractice)
                    {
                        return true;
                    }
                }
                return false;
            })
            .Select(uc => uc.Card)
            .ToList();

        return Ok(cards.Select(c => c.Id));
    }

    void createCard(PostCardDTO createCard, int withId = 0)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        Card card = new Card
        {
            ImageURL = createCard.ImageURL,
            CreatorId = profile.Id,
            EnglishWord = createCard.EnglishWord,
        };

        if (withId != 0)
        {
            card.Id = withId;
        }

        _dbContext.Cards.Add(card);
        _dbContext.SaveChanges();

        for (int i = 0; i < createCard.Answers.Count; i++)
        {
            Answer answer = new Answer { Word = createCard.Answers[i], CardId = card.Id };
            _dbContext.Answers.Add(answer);
            _dbContext.SaveChanges();
            if (i == createCard.CorrectAnswerIndex)
            {
                card.CorrectAnswerId = answer.Id;
            }
        }

        _dbContext.SaveChanges();
    }
}
