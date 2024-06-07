using webapi.Core.Repository;
using webapi.Domain.Model;

namespace webapi.Core.Service;

public class AnswerService : BaseService<Answer>
{
    public AnswerService(AnswerRepository repository) : base(repository)
    {
    }
}