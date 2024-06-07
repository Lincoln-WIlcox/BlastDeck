namespace BlastDeck.Models.DTOs;

public class GetCardsAnswerDTO
{
    public int Id { get; set; }
    public string Word { get; set; }
    public int CardId { get; set; }

    public GetCardsAnswerDTO(Answer answer)
    {
        Id = answer.Id;
        Word = answer.Word;
        CardId = answer.CardId;
    }
}
