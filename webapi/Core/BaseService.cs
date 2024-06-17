using Microsoft.EntityFrameworkCore;
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

    public async virtual Task<T> CreateAsync(T obj)
    {
        System.Console.WriteLine(obj.IsActive);
        var entity = this.repository.Add(obj);
        await this.repository.SaveAsync();
        this.repository.Detach(entity);
        return entity;
    }

    public async virtual Task DeleteAsync(int identification, string token)
    {

        var entity = await this.repository
            .GetAllNoTracking()
            .SingleOrDefaultAsync( ent => ent.Id == identification)
                ?? throw new KeyNotFoundException();

        this.repository.Remove(entity);
        await this.repository.SaveAsync();
        this.repository.Detach(entity);
    }

    public T Find(T obj)
    {
        throw new NotImplementedException();
    }

    public async virtual Task<GetAllReturn<T>> GetAllAsync(int page = 0, int limit = 10)
    {
        GetAllReturn<T> res;

        var db = this.repository
            .GetAllNoTracking()
            .Where(e => e.IsActive);

        if(limit == 0){
            res = new(){
                Items = await db.ToListAsync(),
            };
            return res;
        }

        var items = await db
            .Skip(page * limit)
            .Take( limit + 1 )
            .ToListAsync();


        res = new(){
            Items = items,
            Count = db.Count(),
            Next = items.Count > limit,
            Pages = (int)Math.Ceiling((decimal)db.Count() / limit)
        };

        return res;
    }

    public async virtual Task<T> GetAsync(int identification)
    {
        var entity = await this.repository
            .GetAllNoTracking()
            .SingleOrDefaultAsync(t => t.Id == identification)
                ?? throw new KeyNotFoundException();

        return entity;
    }

    public async virtual Task<T> UpdateAsync(int identification, T obj)
    {
        var entity = await this.repository
            .GetAllNoTracking()
            .SingleOrDefaultAsync( t => t.Id == identification)
                ?? throw new KeyNotFoundException();
        
        entity = obj;

        this.repository.Update(entity);
        await this.repository.SaveAsync();
        this.repository.Detach(entity);

        return entity;
    }


}