namespace BlastDeck.Models.DTOs;

public class GetCardsDTO
{
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public int CorrectAnswerId { get; set; }
    public int CreatorId { get; set; }
    public ICollection<GetCardsAnswerDTO> Answers { get; set; }
}
