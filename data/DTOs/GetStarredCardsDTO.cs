namespace BlastDeck.Models.DTOs;

public class GetStarredCardsDTO
{
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public int CreatorId { get; set; }
    public string CorrectAnswer { get; set; }
    public string EnglishWord { get; set; }
    public bool? Starred { get; set; }
    public int? MasteryLevel { get; set; }

    public GetStarredCardsDTO(Card card)
    {

        Id = card.Id;
        ImageURL = card.ImageURL;
        CreatorId = card.CreatorId;
        CorrectAnswer = card.CorrectAnswer;
        EnglishWord = card.EnglishWord;
    }
}
