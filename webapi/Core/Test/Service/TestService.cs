using Microsoft.EntityFrameworkCore;
using webapi.Core.Repository;
using webapi.Domain.Model;
using webapi.Domain.Repository;
using webapi.Domain.Service;

namespace webapi.Core.Service;

public class TestService : BaseService<Test>, ITestService
{
    private readonly IUserService userService;

    public TestService(TestRepository repository, IUserService userService) 
        : base(repository) { 
            this.userService = userService;
        }

    public async Task<string> GetNewCode()
    {
        string code = this.GenerateRandomString(5);

        var elementIfExists = await this.repository
            .GetAllNoTracking() 
            .FirstOrDefaultAsync( e => e.Code == code );

        if(elementIfExists is not null ) {
            code = await this.GetNewCode();
        }

        return code;
    }

    public async Task<Test> GetTestByCode(string code)
    {
        System.Console.WriteLine(code);

        code = code.Replace(" ","");

        var test = await this.repository
            .GetAllNoTracking()
            .FirstOrDefaultAsync(c => c.Code == code)
                ?? throw new DllNotFoundException();

        test.Answer = null;

        return test;
    }


    public override async Task<GetAllReturn<Test>> GetAllAsync(int page = 0, int limit = 10)
    {
        GetAllReturn<Test> res;

        var db = this.repository
            .GetAllNoTracking()
            .Include(e => e.Answers.OrderByDescending(e2 => e2.Id))
            .OrderByDescending(e => e.Id)
            .Where(e => e.IsActive);

        if(limit == 0){
            res = new(){
                Items = await db.ToListAsync(),
            };
            return res;
        }

        var items = await db
            .Skip(page * limit)
            .Take( limit + 1 )
            .ToListAsync();


        res = new(){
            Items = items,
            Count = db.Count(),
            Next = items.Count > limit,
            Pages = (int)Math.Ceiling((decimal)db.Count() / limit)
        };

        return res;
    }

    public async Task<TestOverview> GetAllData(int id, string token)
    {
        await this.userService.ValidateUser(token);

        TestOverview res = new();

        var test = await this.repository
            .GetAllNoTracking()
            .Include(e => e.Answers)
            .SingleOrDefaultAsync(e => e.Id == id)
                ?? throw new KeyNotFoundException("Prova não encontrada");
        
        List<Answer> answers = [.. test.Answers];

        List<string[]> testAnswer   = test.Answer.Split("\n").Select( line => line.Split(" ") ).ToList();
        List<string[]> testQuestion = test.Question.Split("\n").Select( line => line.Split(" ") ).ToList();

        res.Results = Enumerable
            .Range(0, testAnswer.Count)
            .Select(i => new Avaliation())
            .ToList();

        // Corrigindo prova por prova
        for (int testIndex = 0; testIndex < test.Answers.Count; testIndex++)
        {
            // selecionando cada prova
            List<string[]> answer = answers[testIndex].UserAnswer.Split("\n").Select( line => line.Split(" ")).ToList();
            
            //corrigindo linha por linha da prova atual
            for (int lineIndex = 0; lineIndex < answer.Count; lineIndex++)
            {
                //corrigindo celula 
                for (int cellIndex = 0; cellIndex < answer[lineIndex].Length; cellIndex++)
                {
                    // com base na celula de resposta do aluno
                    bool testQuestionEqualTestAnswer = testQuestion[lineIndex][cellIndex] == testAnswer[lineIndex][cellIndex];
                    bool answerEqualTestQuestion     = answer[lineIndex][cellIndex] == testQuestion[lineIndex][cellIndex];
                    bool answerEqualTestAnswer       = answer[lineIndex][cellIndex] == testAnswer[lineIndex][cellIndex] ;

                    if (answerEqualTestAnswer && answerEqualTestQuestion) 
                    {
                        continue;
                    }

                    if( !testQuestionEqualTestAnswer && answerEqualTestAnswer ) 
                    {
                        res.Results[lineIndex].Corrects ++ ;
                    }
                    else if( testQuestionEqualTestAnswer && !answerEqualTestQuestion ) 
                    {
                        res.Results[lineIndex].Incorrects ++ ;
                    }
                    else if( !testQuestionEqualTestAnswer && !answerEqualTestQuestion ) 
                    {
                        res.Results[lineIndex].MissPlaceds ++ ;
                    }
                }
            }
        }

        res.Test = test;

        return res;

    }


    private string GenerateRandomString(int length){
        Random rnd = new Random();
        byte[] strBytes = new byte[length];
        rnd.NextBytes(strBytes);
        string value = System.Convert.ToBase64String(strBytes).Replace("=", "");
        return value;
    }

}