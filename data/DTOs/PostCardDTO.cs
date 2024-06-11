namespace BlastDeck.Models.DTOs;

public class PostCardDTO
{
    public string ImageURL { get; set; }
    public string EnglishWord { get; set; }
    public List<string> Answers { get; set; }
    public int CorrectAnswerIndex { get; set; }
}
