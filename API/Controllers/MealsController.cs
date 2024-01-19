using Microsoft.AspNetCore.Mvc;
using API.Controllers.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Domain;
using Application.Meals;


namespace API.Controllers
{


    public class MealsController : BaseApiController
    {
        
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetMeals()
        { 
            return HandleResult(await Mediator.Send(new List.Query()));   
        }

        [AllowAnonymous]
        [HttpGet("{id}/entries")]
        public async Task<IActionResult> GetMealEntries(Guid goalId)
        { 
            return HandleResult(await Mediator.Send(new ListEntries.Query {GoalId = goalId}));   
        }
        
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateMeal(Meal meal)
        {                                                 
            return HandleResult(await Mediator.Send(new Create.Command {Meal = meal}));
        }

        [AllowAnonymous]
        [HttpPost("{id}/add")]
        public async Task<IActionResult> Add(Guid id)
        {                                                
            return HandleResult(await Mediator.Send(new Add.Command { MealId = id }));
        }


        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {                                               
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }

        [AllowAnonymous]
        [HttpDelete("{goalId}/{mealId}/deleteMealEntry")]
        public async Task<IActionResult> Delete(Guid goalId, Guid mealId)
        {
            return HandleResult(await Mediator.Send(new DeleteEntry.Command { GoalId = goalId, MealId = mealId }));
        }
      
    
    }
}