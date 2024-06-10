using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlastDeck.Models;

public class Answer
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Word { get; set; }

    [Required]
    [ForeignKey("Card")]
    public int CardId { get; set; }

    // Navigation properties
    public Card? Card { get; set; }
}
