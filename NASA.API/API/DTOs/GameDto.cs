namespace API.DTOs;

public class GameDto
{
    public  int Id { get; set; }
     public string? UserName { get; set; }
    public double Decision1 { get; set; }
    public double Decision2 { get; set; }
    public double Decision3 { get; set; }
    public double Decision4 { get; set; }
    public DateTime Created { get; set; }
}
