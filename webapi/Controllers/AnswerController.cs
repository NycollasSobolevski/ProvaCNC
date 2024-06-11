using Microsoft.AspNetCore.Mvc;
using webapi.Core.Service;
using webapi.Domain.Model;
using webapi.Domain.Service;

namespace webapi.Controller;
public class AnswerController : BaseController<Answer> {

    [HttpPost("api/[controller]/CorrectTest")]
    public async Task<ActionResult> Post(
        [FromBody] Answer body, 
        [FromServices] IService<Answer> service,
        [FromServices] IAnswerService service2
        )
    {
        try
        {
            var answer = await service.CreateAsync(body);
            var res = service2.CorrectAnswer(answer);
            return Ok();
        }
        catch (UnauthorizedAccessException){
            return Unauthorized("Já foi atingido o limite desta prova");
        }   
        catch (DllNotFoundException){
            return Unauthorized("Prova não encontrada");
        }   
        catch (System.Exception e)
        {
            System.Console.WriteLine(e);
            return BadRequest();
        }
    }
}
