namespace BlastDeck.Models.DTOs;

public class GetCardWithoutCorrectAnswerDTO
{
    const int NUMBER_OF_ANSWERS = 3;
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public int CreatorId { get; set; }
    public List<GetCardsAnswerDTO> Answers { get; set; }
    public string EnglishWord { get; set; }
    public bool? Starred { get; set; }

    public GetCardWithoutCorrectAnswerDTO(Card card, List<Card> otherCards)
    {
        if (card.CorrectAnswer == null || otherCards.Any(c => c.CorrectAnswer == null))
        {
            throw new Exception(
                "must include correct answer on all cards for GetCardWithoutCorrectAnswerDTO."
            );
        }

        Id = card.Id;
        ImageURL = card.ImageURL;
        CreatorId = card.CreatorId;
        Answers = [];
        Random random = new Random();
        for (int i = 0; i < NUMBER_OF_ANSWERS; i++)
        {
            int randomNumber = random.Next(0, otherCards.Length);
            Answers.Add(new GetCardsAnswerDTO(otherCards[randomNumber].CorrectAnswer));
        }
        EnglishWord = card.EnglishWord;
    }
}
