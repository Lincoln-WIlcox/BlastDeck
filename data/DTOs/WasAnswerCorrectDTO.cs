namespace BlastDeck.Models.DTOs;

public class WasAnswerCorrectDTO
{
    public bool AnsweredCorrectly { get; set; }
    public string CorrectAnswer { get; set; }
    public string AudioURL { get; set; }
}
