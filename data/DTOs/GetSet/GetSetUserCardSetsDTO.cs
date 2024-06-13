using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlastDeck.Models.DTOs;

public class GetSetUserCardSetsDTO
{
    public int Id { get; set; }
    public int UserCardId { get; set; }
    public int SetId { get; set; }
    public GetSetUserCardSetsUserCardDTO UserCard { get; set; }

    public GetSetUserCardSetsDTO(UserCardSet userCardSet)
    {
        if(userCardSet.UserCard == null)
        {
            throw new Exception("Must include UserCard when using GetSetUserCardSetsDTO");
        }

        Id = userCardSet.Id;
        UserCardId = userCardSet.UserCardId;
        SetId = userCardSet.SetId;
        UserCard = new GetSetUserCardSetsUserCardDTO(userCardSet.UserCard);
    }
}