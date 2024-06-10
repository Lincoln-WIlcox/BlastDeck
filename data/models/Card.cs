using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlastDeck.Models;

public class Card
{
    [Key]
    public int Id { get; set; }

    public string ImageURL { get; set; }

    [Required]
    [ForeignKey("CorrectAnswer")]
    public int CorrectAnswerId { get; set; }

    [Required]
    [ForeignKey("Creator")]
    public int CreatorId { get; set; }

    [Required]
    public string EnglishWord { get; set; }

    // Navigation properties
    public UserProfile? Creator { get; set; }
    public List<Answer>? Answers { get; set; }
    public Answer? CorrectAnswer { get; set; }
    public List<UserCard>? UserCards { get; set; }
}
