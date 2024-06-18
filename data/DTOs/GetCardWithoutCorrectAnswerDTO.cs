namespace BlastDeck.Models.DTOs;

public class GetCardWithoutCorrectAnswerDTO
{
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public int CreatorId { get; set; }
    public List<GetCardsAnswerDTO> Answers { get; set; }
    public string EnglishWord { get; set; }
    public bool? Starred { get; set; }

    public GetCardWithoutCorrectAnswerDTO(Card card)
    {
        if (card.Answers == null)
        {
            throw new Exception("must include Answers on Card for GetCardWithoutCorrectAnswerDTO.");
        }

        Id = card.Id;
        ImageURL = card.ImageURL;
        CreatorId = card.CreatorId;
        Answers = card.Answers.Select(a => new GetCardsAnswerDTO(a)).ToList();
        EnglishWord = card.EnglishWord;
    }
}
