using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlastDeck.Models;

public class UserCardSet
{
    [Key]
    public int Id { get; set; }

    [ForeignKey("UserCard")]
    public int UserCardId { get; set; }

    [ForeignKey("Set")]
    public int SetId { get; set; }

    // Navigation properties
    public UserCard UserCard { get; set; }
    public Set Set { get; set; }
}