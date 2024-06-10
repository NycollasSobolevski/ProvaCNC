using Microsoft.EntityFrameworkCore;
using webapi.Core.Context;
using webapi.Domain.Model;
using webapi.Domain.Repository;

namespace webapi.Core.Repository;

public class BaseRepository<T> : IRepository<T>
    where T : TEntity
{
    protected CnctestContext context;
    protected DbSet<T> table;

    public T Add(T obj)
            => table.Add(obj).Entity;

    public void AddMany(IEnumerable<T> objects)
        => table.AddRange(objects);

    public IQueryable<T> Get()
        => table;

    public IQueryable<T> GetAllNoTracking()
        => table.AsNoTracking();

    public void Remove(T obj)
        => table.Remove(obj);

    public void Save()
        => context.SaveChanges();

    public Task SaveAsync()
        => context.SaveChangesAsync();

    public void Update(T obj)
        => context.Entry(obj).State = EntityState.Modified;


    public void Detach(T obj)
    {
        context.Entry(obj).State = EntityState.Detached;
    }

}