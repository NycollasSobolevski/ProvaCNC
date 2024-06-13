
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using webapi.Core.Service;
using webapi.Domain.Model;
using webapi.Domain.Service;

namespace webapi.Controller;
[EnableCors("MainPolicy")]
[ApiController]
[Route("api/")]
public class  BaseController<T> : ControllerBase
    where T : TEntity
{
    [HttpGet("[controller]/{id}")]
    public virtual async Task<ActionResult> Get(
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

    [HttpPost("[controller]/")]
    public virtual  async Task<ActionResult> Post(
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
