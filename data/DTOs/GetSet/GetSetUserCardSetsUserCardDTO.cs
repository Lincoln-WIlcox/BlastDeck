namespace BlastDeck.Models.DTOs;

public class GetSetUserCardSetsUserCardDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int CardId { get; set; }
    public GetSetUserCardSetsUserCardCardDTO Card { get; set; }
}