using BlastDeck.Data;
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
    public IActionResult GetSets()
    {
        
    }
}