using webapi.Domain.Model;

namespace webapi.Domain.Service;

public interface ITestService
{
    public Task<Test> GetTestByCode ( string code );
}
