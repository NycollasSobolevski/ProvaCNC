using System.IdentityModel.Tokens.Jwt;
using back.Core.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using webapi.Core.Repository;
using webapi.Domain.Model;
using webapi.Domain.Service;

namespace webapi.Core.Service;

public class UserService : BaseService<User>, IUserService
{
    private readonly IJwtService jwtService;
    public UserService(
        UserRepository repository, 
        IJwtService jwtService
    ) : base(repository)
    {
        this.jwtService = jwtService;
    }

    public async Task<JWT> Login(LoginBody login)
    {
        var entity = await this.repository
            .GetAllNoTracking()
            .SingleOrDefaultAsync( u => u.Identification == login.Login )
                ?? throw new DllNotFoundException();

        string loginhash = PasswordConfig.GetHash( login.Password, entity.Salt );

        if(loginhash != entity.Password) {
            System.Console.WriteLine(loginhash);
            System.Console.WriteLine(entity.Password);
            throw new UnauthorizedAccessException();
        }

        LoginReturn loginObjToken = new (){
            Id = entity.Id,
            Name = entity.Name,
            Identification = entity.Identification,
            Admin = entity.Admin
        };

        JWT token = new()
        {
            Value = jwtService.GetToken(loginObjToken)
        };

        return token;

    }

    public async Task UpdatePassword(User login, string token)
    {
        User userToken = this.jwtService.Validate<User>(token);
        User reqestedUser =  await this.repository
            .GetAllNoTracking()
            .SingleOrDefaultAsync( e => e.Id == userToken.Id)
                ?? throw new UnauthorizedAccessException();

        var entity = await this.repository
            .GetAllNoTracking()
            .SingleOrDefaultAsync(e => e.Id == login.Id)
                ?? throw new KeyNotFoundException();

        if(!reqestedUser.Admin && reqestedUser.Id != entity.Id) {
            throw new UnauthorizedAccessException();
        }

        entity.Salt = PasswordConfig.GenerateStringSalt(6);
        entity.Password = PasswordConfig.GetHash(login.Password, entity.Salt);

        this.repository.Update(entity);
        await this.repository.SaveAsync();
        this.repository.Detach(entity);

    }

    public override async Task<User> CreateAsync(User obj)
    {
        var exists = await this.repository
            .GetAllNoTracking()
            .SingleOrDefaultAsync( u => u.Identification == obj.Identification );
        
        if(exists is not null) {
            throw new UnauthorizedAccessException("User already Exists");
        }

        obj.Salt = PasswordConfig.GenerateStringSalt(6);
        obj.Password = PasswordConfig.GetHash( obj.Password, obj.Salt);

        return await base.CreateAsync(obj);
    }

    public async Task<bool> ValidateUser(string token)
    {
        var payload = this.jwtService.Validate<LoginReturn>(token);
        var User = await this.repository
            .GetAllNoTracking()
            .SingleOrDefaultAsync(e => e.Id == payload.Id)
                ?? throw new UnauthorizedAccessException();
 
        return true;
    }

}