using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using webapi.Core.Repository;
using webapi.Domain.Model;
using webapi.Domain.Repository;
using webapi.Domain.Service;

namespace webapi.Core.Service;

public class AnswerService : BaseService<Answer>, IAnswerService
{
    protected readonly IRepository<Test> testRepository;
    public AnswerService(
        AnswerRepository repository,
        TestRepository testRepository
    ) : base(repository)
    {
        this.testRepository = testRepository;
    }

    public override async Task<Answer> CreateAsync(Answer obj)
    {
        var test = await this.testRepository
            .GetAllNoTracking()
            .SingleOrDefaultAsync( entity => entity.Id == obj.IdTest);

        obj.Grade = CalculateGrade(obj, test);

        if(obj.Id == 0){
            return await base.CreateAsync(obj);
        }

        if(obj.Attempts > test.Attempts) {
            throw new UnauthorizedAccessException();
        }

        obj.Attempts++;

        var newObj = await this.UpdateAsync(obj.Id, obj);
        
        return obj;

    }

    public async Task<CorrectedAnswer> CorrectAnswer ( Answer answer ) {
        var test = await this.testRepository
            .GetAllNoTracking()
            .SingleOrDefaultAsync(entity => entity.Id == answer.IdTest)
                ?? throw new DllNotFoundException();
        
        System.Console.WriteLine(test.Attempts );
        System.Console.WriteLine( answer.Attempts);

        CorrectedAnswer answerResult = new(){
            Answer = answer,
            Locations = new List<LocalCorrection>(),
            Finished = test.Attempts <= answer.Attempts
        };

        List<string[]> testList = [];
        List<string[]> testTemplateList = [];
        List<string[]> answerList = [];

        var testLines = test.Question.Split("\n");
        var answerLines = answer.UserAnswer.Split("\n");
        var testTemplateLines = test.Answer.Split("\n");

        for (int i = 0; i < testLines.Length; i++)
        {
            testList.Add(testLines[i].Split(" "));
            testTemplateList.Add(testTemplateLines[i].Split(" "));
            answerList.Add(answerLines[i].Split(" "));
        }

        for (int x = 0; x < testList.Count; x++)
        {
            for (int y = 0; y < testList[x].Length; y++)
            {
                bool templateEqualTest   = testList[x][y] == testTemplateList[x][y];
                bool templateEqualAnswer = testTemplateList[x][y] == answerList[x][y];
                bool testEqualAnswer     = testList[x][y] == answerList[x][y];
                if(testEqualAnswer)
                {
                    continue;
                }
                if(!testEqualAnswer && !templateEqualTest && !templateEqualAnswer)
                {
                    answerResult.Locations.Add(new LocalCorrection {
                        X = x,
                        Y = y,
                        Value = AnswerCorrection.MissPlaced
                    });
                    continue;
                }
                if(!testEqualAnswer && templateEqualTest) 
                {
                    answerResult.Locations.Add(new LocalCorrection {
                        X = x,
                        Y = y,
                        Value = AnswerCorrection.Incorrect
                    });
                    continue;
                }
                if(!testEqualAnswer && templateEqualAnswer)
                {
                    answerResult.Locations.Add(new LocalCorrection {
                        X = x,
                        Y = y,
                        Value = AnswerCorrection.Correct
                    });
                    continue;
                }
            }
        }


        return answerResult;
    }

    private static int CalculateGrade( Answer answer, Test test ) {

        var testQuestion = test.Question.Split("\n").Select( line => line.Split(" ")).ToList();
        var testAnswer   = test.Answer.Split("\n").Select( line => line.Split(" ")).ToList();
        var userAnswer   = answer.UserAnswer.Split("\n").Select( line => line.Split(" ")).ToList();
        int res = 0;

        for (int line = 0; line < userAnswer.Count; line++)
        {
            for (int cell = 0; cell < userAnswer[line].Length; cell++)
            {
                bool templateEqualTest   = testQuestion[line][cell] == testAnswer[line][cell];
                bool templateEqualAnswer = testAnswer  [line][cell] == userAnswer[line][cell];
                bool testEqualAnswer     = testQuestion[line][cell] == userAnswer[line][cell];
                
                if( !templateEqualTest && templateEqualAnswer ) {
                    res++;
                }

            }
        }

        return res;
    }
}