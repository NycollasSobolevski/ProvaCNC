using webapi.Domain.Model;

namespace webapi.Domain.Service;

public interface IUserService
{
    public Task<JWT> Login( User login );
    public Task UpdatePassword (User login);
}