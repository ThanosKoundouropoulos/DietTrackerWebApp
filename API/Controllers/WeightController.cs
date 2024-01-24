using Microsoft.AspNetCore.Mvc;
using API.Controllers.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Domain;
using Application.WeightIns;

namespace API.Controllers
{


    public class WeightController : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateWeightIn(WeightIn weightIn)
        {                                                 
            return HandleResult(await Mediator.Send(new Create.Command {WeightIn= weightIn}));
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeightIn(Guid id)
        {                                               
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetWeightIns()
        {
            return HandleResult(await Mediator.Send(new List.Query())); 
        }
    
    }
}