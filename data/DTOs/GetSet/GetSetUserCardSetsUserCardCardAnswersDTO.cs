namespace BlastDeck.Models.DTOs;

public class GetSetUserCardSetsUserCardCardAnswersDTO
{
    public int Id { get; set; }
    public string Word { get; set; }
    public int CardId { get; set; }

    public GetSetUserCardSetsUserCardCardAnswersDTO(Answer answer)
    {
        Id = answer.Id;
        Word = answer.Word;
        CardId = answer.CardId;
    }
}
