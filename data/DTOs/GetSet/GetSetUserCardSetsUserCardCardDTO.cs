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
}
