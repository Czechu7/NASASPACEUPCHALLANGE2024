using API.Extensions;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Decisions
{
    public int Id { get; set; }
    public string? Description { get; set; }
    public double Budget { get; set; }
    public double Safety { get; set; }
    public double Infrastructure { get; set; }
    public double Morale { get; set; }
    public int QuestionId { get; set; }
    public string? ToolTip { get; set; }
    [JsonIgnore]
    public virtual Question? Question { get; set; }

}
