using webapi.Core.Context;
using webapi.Domain.Model;

namespace webapi.Core.Repository;

public class TestRepository : BaseRepository<Test>
{
    public TestRepository ( CnctestContext context ) 
    {
        this.context = context;
        this.table = context.Tests;
    }
}