using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlastDeck.Models;

public class UserAnswer
{
    [Key]
    public int Id { get; set; }

    [ForeignKey("UserCard")]
    public int UserCardId { get; set; }

    public bool AnsweredCorrectly { get; set; }

    public int Stage { get; set; }

    public DateTime DateAnswered { get; set; }

    // Navigation properties
    public UserCard UserCard { get; set; }
}