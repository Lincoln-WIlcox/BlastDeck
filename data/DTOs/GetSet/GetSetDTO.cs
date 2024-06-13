namespace BlastDeck.Models.DTOs;

public class GetSetDTO
{
    public int Id { get; set; }
    public string SetName { get; set; }
    public int CreatorId { get; set; }
    public List<GetSetUserCardSetsDTO> UserCardSets { get; set; }
    public GetSetDTO(Set set)
    {
        if(set.UserCardSets == null)
        {
            throw new Exception("Must include UserCardSets when making GetSetDTO");
        }

        Id = set.Id;
        SetName = set.SetName;
        CreatorId = set.CreatorId;
        UserCardSets = set.UserCardSets.Select(ucs => new GetSetUserCardSetsDTO(ucs)).ToList();
    }
}
