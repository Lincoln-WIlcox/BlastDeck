using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlastDeck.Models;

public class Card
{
    [Key]
    public int Id { get; set; }
    public string ImageURL { get; set; }

    [Required]
    public string? CorrectAnswer { get; set; }

    [Required]
    public string AudioURL { get; set; }

    [Required]
    [ForeignKey("Creator")]
    public int CreatorId { get; set; }

    [Required]
    public string EnglishWord { get; set; }

    // Navigation properties
    public UserProfile? Creator { get; set; }
    public List<UserCard>? UserCards { get; set; }
}
