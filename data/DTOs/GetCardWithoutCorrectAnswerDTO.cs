namespace BlastDeck.Models.DTOs;

public class GetCardWithoutCorrectAnswerDTO
{
    const int NUMBER_OF_ANSWERS = 4;
    const int NUMBER_OF_ANSWERS_IN_PASSIVE_TWO = 8;
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public int CreatorId { get; set; }
    public List<string> Answers { get; set; }
    public string EnglishWord { get; set; }
    public string AudioURL { get; set; }
    public bool? Starred { get; set; }

    public GetCardWithoutCorrectAnswerDTO(
        Card card,
        List<Card>? otherCards = null,
        bool passiveTwo = false
    )
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
        AudioURL = card.AudioURL;
        EnglishWord = card.EnglishWord;

        List<Card>? otherCardsDuplicate = otherCards.GetRange(0, otherCards.Count);
        Answers = [];
        Random random = new Random();
        if (otherCards != null)
        {
            int answerAmount = Math.Min(
                passiveTwo ? NUMBER_OF_ANSWERS_IN_PASSIVE_TWO - 1 : NUMBER_OF_ANSWERS - 1,
                otherCardsDuplicate.Count - 1
            );
            for (int i = 0; i <= answerAmount; i++)
            {
                int randomNumber = random.Next(0, otherCardsDuplicate.Count);
                Answers.Add(otherCardsDuplicate[randomNumber].CorrectAnswer);
                otherCardsDuplicate.RemoveAt(randomNumber);
            }
        }
        int randomIndex = random.Next(0, Answers.Count + 1);
        if (randomIndex == Answers.Count)
        {
            Answers.Add(card.CorrectAnswer);
        }
        else
        {
            Answers.Insert(randomIndex, card.CorrectAnswer);
        }
    }
}
