using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlastDeck.Models;

public class UserCard
{
    [Key]
    public int Id { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    [ForeignKey("Card")]
    public int CardId { get; set; }

    // Navigation properties
    public UserProfile User { get; set; }
    public Card Card { get; set; }
    public List<UserCardSet> UserCardSets { get; set; }
    public List<UserAnswer> UserAnswers { get; set; }
}