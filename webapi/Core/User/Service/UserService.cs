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

    public async Task<JWT> Login(User login)
    {
        var entity = await this.repository
            .GetAllNoTracking()
            .SingleOrDefaultAsync( u => u.Identification == login.Identification )
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

    public async Task UpdatePassword(User login)
    {
        var entity = await this.repository
            .GetAllNoTracking()
            .SingleOrDefaultAsync(e => e.Id == login.Id)
                ?? throw new Exception();

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
            throw new Exception("User already Exists");
        }

        obj.Salt = PasswordConfig.GenerateStringSalt(6);
        obj.Password = PasswordConfig.GetHash(obj.Salt, obj.Password);

        return await base.CreateAsync(obj);
    }

}