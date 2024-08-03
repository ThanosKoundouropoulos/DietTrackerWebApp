import { observer } from "mobx-react-lite"
import { Table } from "semantic-ui-react";
import { useStore } from "../../stores/store";





export default observer(function NutrientsTable(){
  const { mealStore } = useStore();
  const { } = mealStore;

  const nutrients = [
    { name: 'Quantity', quantity: mealStore.totalNutrients.quantity, unit: 'g' },
    { name: 'Calories', quantity: mealStore.totalNutrients.calories, unit: 'kcal' },
    { name: 'Proteins', quantity: mealStore.totalNutrients.proteins, unit: 'g' },
    { name: 'Carbs', quantity: mealStore.totalNutrients.carbs, unit: 'g' },
    { name: 'Fats', quantity: mealStore.totalNutrients.fats, unit: 'g' },
    { name: 'Caffeine', quantity: mealStore.totalNutrients.caffeine, unit: 'mg' },
    { name: 'Sugars', quantity: mealStore.totalNutrients.sugars, unit: 'g' },
    { name: 'Fiber', quantity: mealStore.totalNutrients.fiber, unit: 'g' },
    { name: 'Calcium', quantity: mealStore.totalNutrients.calcium, unit: 'mg' },
    { name: 'Iron', quantity: mealStore.totalNutrients.iron, unit: 'mg' },
    { name: 'Magnesium', quantity: mealStore.totalNutrients.magnesium, unit: 'mg' },
    { name: 'Potassium', quantity: mealStore.totalNutrients.potassium, unit: 'mg' },
    { name: 'Sodium', quantity: mealStore.totalNutrients.sodium, unit: 'mg' },
    { name: 'Zinc', quantity: mealStore.totalNutrients.zinc, unit: 'mg' },
    { name: 'Retinol', quantity: mealStore.totalNutrients.retinol, unit: 'µg' },
    { name: 'Vitamin A', quantity: mealStore.totalNutrients.vitaminA, unit: 'µg' },
    { name: 'Beta Carotene', quantity: mealStore.totalNutrients.betaCarotene, unit: 'µg' },
    { name: 'Vitamin D', quantity: mealStore.totalNutrients.vitaminD, unit: 'µg' },
    { name: 'Vitamin C', quantity: mealStore.totalNutrients.vitaminC, unit: 'mg' },
    { name: 'Folate', quantity: mealStore.totalNutrients.folate, unit: 'µg' },
    { name: 'Vitamin B12', quantity: mealStore.totalNutrients.vitaminB12, unit: 'µg' },
    { name: 'Vitamin K', quantity: mealStore.totalNutrients.vitaminK, unit: 'µg' },
    { name: 'Cholesterol', quantity: mealStore.totalNutrients.cholesterol, unit: 'mg' },
    { name: 'Saturated Fatty Acids', quantity: mealStore.totalNutrients.saturatedFattyAcids, unit: 'g' },
    { name: 'Monounsaturated Fatty Acids', quantity: mealStore.totalNutrients.monounsaturatedFattyAcids, unit: 'g' },
    { name: 'Polyunsaturated Fatty Acids', quantity: mealStore.totalNutrients.polyunsaturatedFattyAcids, unit: 'g' }
  ];
    
    return(
        <div style={{position:'absolute',left:8, maxHeight: '370px',width:294, overflow: 'auto' ,boxShadow: '0 0 10px',scrollbarWidth: 'none', msOverflowStyle: 'none' ,borderRadius:10}}>
        <Table inverted className="custom-table global-font"  celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nutrient</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Units</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {nutrients.map((nutrient, index) => (
              <Table.Row key={index}>
                <Table.Cell>{nutrient.name}</Table.Cell>
                <Table.Cell>{nutrient.quantity}</Table.Cell>
                <Table.Cell>{nutrient.unit}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
        
    )
})