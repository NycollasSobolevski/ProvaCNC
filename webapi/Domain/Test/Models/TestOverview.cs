namespace webapi.Domain.Model;

public class TestOverview
{
    public Test Test {get;set;}
    public List<Avaliation> Results {get;set;} = [];
}

public class Avaliation
{
    public int Incorrects {get;set;} = 0;
    public int Corrects {get;set;} = 0;
    public int MissPlaceds {get;set;} = 0;
}