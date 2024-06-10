
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using webapi.Domain.Model;
using webapi.Domain.Service;

namespace webapi.Controller;
[EnableCors("MainPolicy")]
public class  BaseController<T> : ControllerBase
    where T : TEntity
{
    [HttpGet("api/[controller]/{id}")]
    public async Task<ActionResult> Get(
        int id,
        [FromServices] IService<T> service
    ) {
        try
        {
            var res = await service.GetAsync(id);
            return Ok(res);
        }
        catch (System.Exception e)
        {
            System.Console.WriteLine(e);
            return BadRequest();
        }
    }
    [HttpPost("api/[controller]/")]
    public async Task<ActionResult> Post(
        [FromBody] T body,
        [FromServices] IService<T> service
    ) {
        try
        {
            var res = await service.CreateAsync(body);
            return Ok(res);
        }
        catch (System.Exception e)
        {
            System.Console.WriteLine(e);
            return BadRequest();
        }
    }
}
