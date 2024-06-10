using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using webapi.Domain.Model;
using webapi.Domain.Service;

namespace webapi.Controller;

[EnableCors("MainPolicy")]
public class UserController : ControllerBase 
{
    [HttpPost("api/[controller]/auth/subscribe")]
    public async Task<ActionResult> Subscribe (
        [FromServices] IService<User> service,
        [FromBody] User body
    )
    {
        try
        {
            await service.CreateAsync(body);
            return Ok();
        }
        catch (System.Exception e )
        {
            if(e.Message == "User already Exists") {
                return Unauthorized(e.Message);

            }
            System.Console.WriteLine(e);
            return BadRequest();
        }
    }
    [HttpPost("api/[controller]/auth/login")]
    public async Task<ActionResult> Login (
        [FromServices] IUserService service,
        [FromBody] User body
    )
    {
        try
        {
            var jwt = await service.Login(body);
            return Ok(jwt);
        }
        catch (UnauthorizedAccessException) {
            return Unauthorized("Login and password dont match");
        }
        catch (DllNotFoundException) {
            return Unauthorized("Login and password dont match");
        }
        catch (System.Exception e )
        {
            System.Console.WriteLine(e);
            return BadRequest();
        }
    }

    [HttpGet("get")]
    public async Task<ActionResult> get (
        [FromServices] IUserService service
    ){
        try
        {

            User body = new(){
                Id = 2,
                Password = "admin"
            };
            await service.UpdatePassword(body);
            return Ok();
        }
        catch (System.Exception e)
        {
            System.Console.WriteLine(e);
            return BadRequest();            
        }
    }

}
