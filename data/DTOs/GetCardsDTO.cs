namespace BlastDeck.Models.DTOs;

public class GetCardsDTO
{
    public int Id { get; set; }
    public string ImageURL { get; set; }
    public int CorrectAnswerId { get; set; }
    public int CreatorId { get; set; }
    public List<GetCardsAnswerDTO> Answers { get; set; }

    public GetCardsDTO(Card card)
    {
        if (card.Answers == null)
        {
            throw new Exception("must include Answers on card for GetCardsDTO.");
        }

        Id = card.Id;
        ImageURL = card.ImageURL;
        CorrectAnswerId = card.CorrectAnswerId;
        CreatorId = card.CreatorId;
        Answers = card.Answers.Select(a => new GetCardsAnswerDTO(a)).ToList();
    }
}
