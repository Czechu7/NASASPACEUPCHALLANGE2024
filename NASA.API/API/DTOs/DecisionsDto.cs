namespace API.DTOs;
public class DecisionDto
{
    public int Id { get; set; }
    public string? Description { get; set; }
    public double Budget { get; set; }
    public double Safety { get; set; }
    public double Infrastructure { get; set; }
    public double Morale { get; set; }
    public string? ToolTip { get; set; }
}