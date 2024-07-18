namespace BlastDeck.Models.DTOs;

public class GetSetUserCardSetsUserCardCardDTO
{
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public int CorrectAnswerId { get; set; }
    public int CreatorId { get; set; }
    public string EnglishWord { get; set; }
    public string? CorrectAnswer { get; set; }

    public GetSetUserCardSetsUserCardCardDTO(Card card)
    {
        if (card.Answers == null || card.CorrectAnswer == null)
        {
            throw new Exception(
                "Must include Answers and CorrectAnswer on card when making GetSetUserCardSetsUserCardCardDTO"
            );
        }

        Id = card.Id;
        ImageURL = card.ImageURL;
        CorrectAnswerId = card.CorrectAnswerId != null ? (int)card.CorrectAnswerId : 0;
        CreatorId = card.CreatorId;
        EnglishWord = card.EnglishWord;
        CorrectAnswer = card.CorrectAnswer.Word;
    }
}
