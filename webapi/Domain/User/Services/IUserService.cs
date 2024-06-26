using webapi.Domain.Model;

namespace webapi.Domain.Service;

public interface IUserService
{
    public Task<JWT> Login( LoginBody login );
    public Task UpdatePassword (User login, string token);
    public Task<bool> ValidateUser(string token);
}