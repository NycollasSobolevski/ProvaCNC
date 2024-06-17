using Microsoft.EntityFrameworkCore;
using webapi.Core.Repository;
using webapi.Domain.Model;
using webapi.Domain.Service;

namespace webapi.Core.Service;

public class TestService : BaseService<Test>, ITestService
{
    public TestService(TestRepository repository) : base(repository) { }

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


    private string GenerateRandomString(int length){
        Random rnd = new Random();
        byte[] strBytes = new byte[length];
        rnd.NextBytes(strBytes);
        string value = System.Convert.ToBase64String(strBytes).Replace("=", "");
        return value;
    }
}