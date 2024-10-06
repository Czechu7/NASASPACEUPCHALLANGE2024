using API.Extensions;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Question
{
    public int Id { get; set; }
    public string? Description { get; set; }
    public string? Forecast { get; set; }
    public virtual ICollection<Decisions>? Decisions { get; set; }


}
