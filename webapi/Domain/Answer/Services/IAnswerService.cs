using webapi.Domain.Model;

namespace webapi.Domain.Service;

public interface IAnswerService
{
    public Task<CorrectedAnswer> CorrectAnswer ( Answer answer );
}
