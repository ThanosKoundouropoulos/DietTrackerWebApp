using Microsoft.AspNetCore.Mvc;
using API.Controllers.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Domain;
using Application.Foods;

namespace API.Controllers
{


    public class FoodsController : BaseApiController
    {
      [AllowAnonymous]
      [HttpGet("all")]
      public async Task<IActionResult> GetAllFoods()
      {
        return HandleResult(await Mediator.Send(new All.Query()));
          
      }
    
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetFoods()
        {
           
            return HandleResult(await Mediator.Send(new List.Query()));
          
            
        }
        
        [AllowAnonymous]
        [HttpPost("{id}/add")]
        public async Task<IActionResult> Add(Guid id, [FromBody] Add.Command command)
        {                                                
            return HandleResult(await Mediator.Send(new Add.Command
            {
                FoodId = id,
                amountConsumed = command.amountConsumed

            }));
        }

       [AllowAnonymous]
        [HttpDelete("{goalId}/{foodId}/delete")]
        public async Task<IActionResult> Delete(Guid goalId, Guid foodId)
        {
            return HandleResult(await Mediator.Send(new DeleteFood.Command { GoalId = goalId, FoodId = foodId }));
        }

        [AllowAnonymous]
        [HttpGet("search")]
      public async Task<IActionResult> Search([FromQuery] string foodName)
      {
        return HandleResult(await Mediator.Send(new Search.Query { FoodName = foodName }));
      }
    
    }
}