using Microsoft.AspNetCore.Mvc;
using API.Controllers.API.Controllers;
using Application.Goals;
using Microsoft.AspNetCore.Authorization;
using Domain;

namespace API.Controllers
{


    public class GoalsController : BaseApiController
    {
    
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetDietGoals()
        {
           
            return HandleResult(await Mediator.Send(new List.Query()));
          
            
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDietGoal(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateDietGoals(DietGoal dtgoal)
        {                                                 
            return HandleResult(await Mediator.Send(new Create.Command {DietGoal = dtgoal}));
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDietGoal(Guid id)
        {                                               
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditDietGoals(Guid id,DietGoal dietGoal)
        {      
            dietGoal.Id = id;                                          
            return HandleResult(await Mediator.Send(new Edit.Command {dietGoal = dietGoal}));
        }

       
    }
}