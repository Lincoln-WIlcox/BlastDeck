using System.ComponentModel.DataAnnotations;

namespace BlastDeck.Models;

public class UserProfile
{
    [Key]
    public int Id { get; set; }
    public string IdentityUserId { get; set; }

    // Navigation properties
    public List<UserCard> UserCards { get; set; }
    public List<Set> Sets { get; set; }
    public List<Card> CreatedCards { get; set; }
}
