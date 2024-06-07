using System.ComponentModel.DataAnnotations;

namespace BlastDeck.Models;

public class UserProfile
{
    [Key]
    public int Id { get; set; }
    public string IdentityUserId { get; set; }

    // Navigation properties
    public ICollection<UserCard> UserCards { get; set; }
    public ICollection<Set> Sets { get; set; }
    public ICollection<Card> CreatedCards { get; set; }
}
