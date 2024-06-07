using webapi.Core.Repository;
using webapi.Domain.Model;

namespace webapi.Core.Service;

public class TestService : BaseService<Test>
{
    public TestService(TestRepository repository) : base(repository)
    {
    }
}