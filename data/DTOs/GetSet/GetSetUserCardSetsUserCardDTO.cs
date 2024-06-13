namespace BlastDeck.Models.DTOs;

public class GetSetUserCardSetsUserCardDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int CardId { get; set; }
    public GetSetUserCardSetsUserCardCardDTO Card { get; set; }

    public GetSetUserCardSetsUserCardDTO(UserCard userCard)
    {
        if(userCard.Card == null)
        {
            throw new Exception("Must include card on user card when creating GetSetUserCardSetsUserCardDTO");
        }

        Id = userCard.Id;
        UserId = userCard.UserId;
        CardId = userCard.CardId;
        Card = new GetSetUserCardSetsUserCardCardDTO(userCard.Card);
    }
}