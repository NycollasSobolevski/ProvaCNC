using Microsoft.EntityFrameworkCore;
using webapi.Core.Repository;
using webapi.Domain.Model;
using webapi.Domain.Service;

namespace webapi.Core.Service;

public class TestService : BaseService<Test>, ITestService
{
    public TestService(TestRepository repository) : base(repository) { }

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
}