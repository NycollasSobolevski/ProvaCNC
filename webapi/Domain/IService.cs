using webapi.Domain.Model;

namespace webapi.Domain.Service;

public interface IService<T> : IService<T,T>
    where T : TEntity
{ }

public interface IService<T, TDto>
    where T : TEntity
{
    public Task<TDto> CreateAsync( T obj );
    public Task<TDto> GetAsync ( int identification );
    public Task<TDto> UpdateAsync( int identification, T obj );
    public Task<GetAllReturn<TDto>> GetAllAsync( int page = 0, int limit = 10 );
    public Task DeleteAsync( int identification, string token );
    public TDto Find ( T obj );

}