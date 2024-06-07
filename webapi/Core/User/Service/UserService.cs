using webapi.Core.Map;
using webapi.Domain.Model;

namespace webapi.Core.Service;

public class UserService : BaseService<User>
{
    public UserService(UserRepository repository) : base(repository)
    {
    }
}