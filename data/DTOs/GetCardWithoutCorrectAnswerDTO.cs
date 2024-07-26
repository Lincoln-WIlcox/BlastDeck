namespace BlastDeck.Models.DTOs;

public class GetCardWithoutCorrectAnswerDTO
{
    const int NUMBER_OF_ANSWERS = 3;
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public int CreatorId { get; set; }
    public List<string> Answers { get; set; }
    public string EnglishWord { get; set; }
    public bool? Starred { get; set; }

    public GetCardWithoutCorrectAnswerDTO(Card card, List<Card>? otherCards = null)
    {
        if (card.CorrectAnswer == null)
        {
            throw new Exception(
                "must include correct answer on all cards for GetCardWithoutCorrectAnswerDTO."
            );
        }

        Id = card.Id;
        ImageURL = card.ImageURL;
        CreatorId = card.CreatorId;
        Answers = [card.CorrectAnswer];
        if (otherCards != null)
        {
            Random random = new Random();
            for (int i = 0; i <= Math.Min(NUMBER_OF_ANSWERS, otherCards.Count); i++)
            {
                int randomNumber = random.Next(0, otherCards.Count);
                Answers.Add(otherCards[randomNumber].CorrectAnswer);
                otherCards.RemoveAt(randomNumber);
            }
        }
        EnglishWord = card.EnglishWord;
    }
}
