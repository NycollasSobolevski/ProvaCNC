using webapi.Domain.Model;

namespace webapi.Domain.Repository;

public interface IRepository<T>
    where T : TEntity
{
    IQueryable<T> Get();
    IQueryable<T> GetAllNoTracking();
    T Add(T obj);
    void AddMany( IEnumerable<T> objects );
    void Remove(T obj);
    void Update(T obj);
    void Save();
    Task SaveAsync();
    void Detach( T obj );
}