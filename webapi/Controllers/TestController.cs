using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using webapi.Domain.Model;
using webapi.Domain.Service;

namespace webapi.Controller;
public class TestController : BaseController<Test> { 
    [HttpGet("[controller]/GetTest/{code}")]
    public async Task<ActionResult> GetTest (
        string code,
        [FromServices] ITestService service
    ) {
        try
        {
            var test = await service.GetTestByCode(code);
            return Ok(test);
        }
        catch (DllNotFoundException) {
            return NotFound("Test não encontrado");
        }
        catch (System.Exception e)
        {
            System.Console.WriteLine(e);
            return BadRequest();
        }
    }


    [HttpGet("[controller]/GetNewCode")]
    public async Task<ActionResult> GetNewCode(
        [FromServices] ITestService service
    ){
        try
        {
            string res = await service.GetNewCode();
            var json = JsonSerializer.Serialize(res);

            return Ok(json);
        }
        catch (System.Exception e)
        {
            System.Console.WriteLine(e);
            return BadRequest();
        }
    }

    [HttpGet("[controller]/GetAllData/{id}")]
    public async Task<ActionResult> GetWithAnswer (
        [FromServices] ITestService service,
        int id
    ){
        try
        {
            string token = Request.Headers.Authorization;
            var res = await service.GetAllData(id, token);
            return Ok(res);
        }
        catch(UnauthorizedAccessException e) {
            return Unauthorized(e);
        }
        catch(KeyNotFoundException e) {
            return NotFound(e);
        }
        catch (System.Exception e)
        {
            System.Console.WriteLine(e);
            return BadRequest();            
        }
    }
}
