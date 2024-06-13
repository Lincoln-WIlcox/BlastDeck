namespace BlastDeck.Models.DTOs;

public class GetSetUserCardSetsUserCardCardDTO
{
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public int CorrectAnswerId { get; set; }
    public int CreatorId { get; set; }
    public string EnglishWord { get; set; }

    public List<GetSetUserCardSetsUserCardCardAnswersDTO>? Answers { get; set; }
    public GetSetUserCardSetsUserCardCardAnswersDTO? CorrectAnswer { get; set; }

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
        CorrectAnswerId = card.CorrectAnswerId;
        CreatorId = card.CreatorId;
        EnglishWord = card.EnglishWord;
        Answers = card
            .Answers.Select(a => new GetSetUserCardSetsUserCardCardAnswersDTO(a))
            .ToList();
        CorrectAnswer = new GetSetUserCardSetsUserCardCardAnswersDTO(card.CorrectAnswer);
    }
}
