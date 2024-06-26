using webapi.Core.Context;
using webapi.Core.Repository;
using webapi.Domain.Model;

namespace webapi.Core.Repository;

public class UserRepository : BaseRepository<User>
{
    public UserRepository ( CnctestContext context ) 
    {
        this.context = context;
        this.table = context.Users;
    }
}