namespace BlastDeck.Models.DTOs;

public class GetStarredCardsDTO
{
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public int CorrectAnswerId { get; set; }
    public int CreatorId { get; set; }
    public List<GetCardsAnswerDTO> Answers { get; set; }
    public GetCardsAnswerDTO CorrectAnswer { get; set; }
    public string EnglishWord { get; set; }
    public bool? Starred { get; set; }
    public int? MasteryLevel { get; set; }

    public GetStarredCardsDTO(Card card)
    {
        if (card.Answers == null || card.CorrectAnswer == null)
        {
            throw new Exception("must include Answers and CorrectAnswer on card for GetCardsDTO.");
        }

        Id = card.Id;
        ImageURL = card.ImageURL;
        CorrectAnswerId = card.CorrectAnswerId;
        CreatorId = card.CreatorId;
        Answers = card.Answers.Select(a => new GetCardsAnswerDTO(a)).ToList();
        CorrectAnswer = new GetCardsAnswerDTO(card.CorrectAnswer);
        EnglishWord = card.EnglishWord;
    }
}
