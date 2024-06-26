using webapi.Domain.Model;

namespace webapi.Domain.Service;

public interface ITestService
{
    public Task<Test> GetTestByCode( string code );
    public Task<string> GetNewCode();
    public Task<Test> GetAllData(int id, string token );
}
