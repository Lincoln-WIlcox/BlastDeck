using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlastDeck.Models.DTOs;

public class GetSetUserCardSetsDTO
{
    public int Id { get; set; }
    public int UserCardId { get; set; }
    public int SetId { get; set; }
    public GetSetUserCardSetsUserCardDTO UserCard { get; set; }
}