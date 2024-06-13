using BlastDeck.Data;
using BlastDeck.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
}
