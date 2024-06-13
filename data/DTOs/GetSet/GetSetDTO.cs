namespace BlastDeck.Models.DTOs;

public class GetSetDTO
{
    public int Id { get; set; }
    public string SetName { get; set; }
    public int CreatorId { get; set; }
    public List<GetSetUserCardSetsDTO> UserCardSets { get; set; }
    public GetSetDTO(Set set)
    {
        

        Id = set.Id;
        SetName = set.SetName;
        CreatorId = set.CreatorId;
    }
}
