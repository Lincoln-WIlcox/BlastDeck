using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlastDeck.Models;

public class Set
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string SetName { get; set; }

    [ForeignKey("User")]
    public int CreatorId { get; set; }

    // Navigation properties
    public UserProfile Creator { get; set; }
    public ICollection<UserCardSet> UserCardSets { get; set; }
}
