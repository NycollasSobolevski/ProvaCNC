namespace webapi.Domain.Model;

public class LoginReturn
{
    public int Id {get;set;}
    public string Name {get;set;}
    public string Identification {get;set;}
    public bool Admin { get; set; }
}