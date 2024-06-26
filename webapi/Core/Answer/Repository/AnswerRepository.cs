using webapi.Core.Context;
using webapi.Domain.Model;

namespace webapi.Core.Repository;

public class AnswerRepository : BaseRepository<Answer>
{
    public AnswerRepository ( CnctestContext context ) 
    {
        this.context = context;
        this.table = context.Answers;
    }
}