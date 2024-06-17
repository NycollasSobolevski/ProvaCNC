namespace webapi.Domain.Model;

public class CorrectedAnswer
{
    public Answer Answer {get;set;}
    public List<LocalCorrection> Locations {get;set;}
    public bool Finished {get;set;}
}