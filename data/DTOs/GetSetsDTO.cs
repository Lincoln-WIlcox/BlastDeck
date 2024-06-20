namespace BlastDeck.Models.DTOs;

public class GetSetsDTO
{
    public int Id { get; set; }
    public string SetName { get; set; }
    public int CreatorId { get; set; }
    public bool CanPractice { get; set; }
    public GetSetsDTO(Set set)
    {
        Id = set.Id;
        SetName = set.SetName;
        CreatorId = set.CreatorId;
    }
}
