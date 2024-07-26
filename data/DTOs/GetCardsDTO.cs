namespace BlastDeck.Models.DTOs;

public class GetCardsDTO
{
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public string CorrectAnswer { get; set; }
    public int CreatorId { get; set; }
    public string EnglishWord { get; set; }
    public bool? Starred { get; set; }

    public GetCardsDTO(Card card)
    {
        Id = card.Id;
        ImageURL = card.ImageURL;
        CreatorId = card.CreatorId;
        CorrectAnswer = card.CorrectAnswer;
        EnglishWord = card.EnglishWord;
    }
}
