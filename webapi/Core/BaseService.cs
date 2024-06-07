using webapi.Core.Repository;
using webapi.Domain.Model;
using webapi.Domain.Repository;
using webapi.Domain.Service;

namespace webapi.Core.Service;

public class BaseService<T> : IService<T>
    where T : TEntity
{
    protected readonly IRepository<T> repository;
    protected BaseService(BaseRepository<T> repository)
    {
        this.repository = repository;
    }

    public Task<T> CreateAsync(T obj)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(int identification, string token)
    {
        throw new NotImplementedException();
    }

    public T Find(T obj)
    {
        throw new NotImplementedException();
    }

    public Task<GetAllReturn<T>> GetAllAsync(int page = 0, int limit = 10)
    {
        throw new NotImplementedException();
    }

    public Task<T> GetAsync(int identification)
    {
        throw new NotImplementedException();
    }

    public Task<T> UpdateAsync(int identification, T obj)
    {
        throw new NotImplementedException();
    }
}