namespace BlastDeck.Models.DTOs;

public class GetSetUserCardSetsUserCardCardDTO
{
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public int CreatorId { get; set; }
    public string EnglishWord { get; set; }
    public string CorrectAnswer { get; set; }

    public GetSetUserCardSetsUserCardCardDTO(Card card)
    {
        Id = card.Id;
        ImageURL = card.ImageURL;
        CreatorId = card.CreatorId;
        EnglishWord = card.EnglishWord;
        CorrectAnswer = card.CorrectAnswer;
    }
}
