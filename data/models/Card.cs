using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlastDeck.Models;

public class Card
{
    [Key]
    public int Id { get; set; }

    public string ImageURL { get; set; }

    [ForeignKey("Answer")]
    public int CorrectAnswerId { get; set; }

    [ForeignKey("UserProfile")]
    public int CreatorId { get; set; }

    // Navigation properties
    public UserProfile Creator { get; set; }
    public ICollection<Answer> Answers { get; set; }
    public ICollection<UserCard> UserCards { get; set; }
}