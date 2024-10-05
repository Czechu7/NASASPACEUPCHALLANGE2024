namespace API.DTOs;
public class QuestionDto
{
    public int Id { get; set; }
    public string? Description { get; set; }
    public string? Forecast { get; set; }
    public List<DecisionDto>? Decisions { get; set; }
}