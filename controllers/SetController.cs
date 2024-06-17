using System.Security.Claims;
using BlastDeck.Data;
using BlastDeck.Models;
using BlastDeck.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/api/[controller]")]
public class SetController : ControllerBase
{
    private BlastDeckDbContext _dbContext;

    public SetController(BlastDeckDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetSets()
    {
        return Ok(_dbContext.Sets.Select(s => new GetSetsDTO(s)));
    }

    [HttpGet("by-user")]
    [Authorize]
    public IActionResult GetSetsForUser()
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        return Ok(
            _dbContext.Sets.Where(s => s.CreatorId == profile.Id).Select(s => new GetSetsDTO(s))
        );
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetSet(int id)
    {
        Set? set = _dbContext
            .Sets.Include(s => s.UserCardSets)
            .ThenInclude(ucs => ucs.UserCard)
            .ThenInclude(uc => uc.Card)
            .ThenInclude(c => c.Answers)
            .Include(s => s.UserCardSets)
            .ThenInclude(ucs => ucs.UserCard)
            .ThenInclude(uc => uc.Card)
            .ThenInclude(c => c.CorrectAnswer)
            .SingleOrDefault(s => s.Id == id);

        if (set == null)
        {
            return BadRequest($"No set with id {id}");
        }

        return Ok(new GetSetDTO(set));
    }

    [HttpDelete("{id}/remove-card")]
    [Authorize]
    public IActionResult RemoveCardFromSet(int id, int cardId)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        Set set = _dbContext.Sets.SingleOrDefault(s => s.Id == id);
        if (profile.Id != set.CreatorId)
        {
            return BadRequest("you are not the creator of this set");
        }

        UserCardSet? userCardSet = _dbContext
            .UserCardSets.Include(ucs => ucs.UserCard)
            .SingleOrDefault(ucs => ucs.UserCard.CardId == cardId && ucs.SetId == id);

        if (userCardSet == null)
        {
            return BadRequest();
        }

        _dbContext.UserCardSets.Remove(userCardSet);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateSetByMe(PostSetDTO postSet)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        Set set = new Set { SetName = postSet.SetName, CreatorId = profile.Id, };

        _dbContext.Sets.Add(set);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost("{id}/add-cards")]
    [Authorize]
    public IActionResult AddCardsToSet(AddCardsToSetDTO cardsToAdd, int id)
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up =>
            up.IdentityUserId == identityUserId
        );

        Set set = _dbContext.Sets.SingleOrDefault(s => s.Id == id);
        if (profile.Id != set.CreatorId)
        {
            return BadRequest("you are not the creator of this set");
        }

        List<UserCardSet> userCardSets = _dbContext
            .UserCards.Where(uc =>
                uc.UserId == profile.Id && cardsToAdd.cardIds.Any(cId => cId == uc.CardId)
            )
            .Select(uc => new UserCardSet { UserCardId = uc.Id, SetId = id })
            .ToList();

        foreach (UserCardSet userCardSet in userCardSets)
        {
            _dbContext.UserCardSets.Add(userCardSet);
        }

        _dbContext.SaveChanges();

        return NoContent();
    }
}
