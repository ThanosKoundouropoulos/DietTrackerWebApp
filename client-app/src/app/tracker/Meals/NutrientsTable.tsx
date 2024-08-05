import { observer } from "mobx-react-lite"
import { Table } from "semantic-ui-react";
import { useStore } from "../../stores/store";


function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}


export default observer(function NutrientsTable(){
  const { mealStore } = useStore();
  const { } = mealStore;

  const nutrients = [
    { name: 'Quantity', quantity: mealStore.totalNutrients.quantity, unit: 'g' },
    { name: 'Calories', quantity: mealStore.totalNutrients.calories, unit: 'kcal' },
    { name: 'Proteins', quantity: mealStore.totalNutrients.proteins, unit: 'g' },
    { name: 'Carbs', quantity: round(mealStore.totalNutrients.carbs, 2), unit: 'g' },
    { name: 'Fats', quantity: round(mealStore.totalNutrients.fats, 2), unit: 'g' },
    { name: 'Caffeine', quantity: round(mealStore.totalNutrients.caffeine, 2), unit: 'mg' },
    { name: 'Sugars', quantity: round(mealStore.totalNutrients.sugars, 2), unit: 'g' },
    { name: 'Fiber', quantity: round(mealStore.totalNutrients.fiber, 2), unit: 'g' },
    { name: 'Calcium', quantity: round(mealStore.totalNutrients.calcium, 2), unit: 'mg' },
    { name: 'Iron', quantity: round(mealStore.totalNutrients.iron, 2), unit: 'mg' },
    { name: 'Magnesium', quantity: round(mealStore.totalNutrients.magnesium, 2), unit: 'mg' },
    { name: 'Potassium', quantity: round(mealStore.totalNutrients.potassium, 2), unit: 'mg' },
    { name: 'Sodium', quantity: round(mealStore.totalNutrients.sodium, 2), unit: 'mg' },
    { name: 'Zinc', quantity: round(mealStore.totalNutrients.zinc, 2), unit: 'mg' },
    { name: 'Retinol', quantity: round(mealStore.totalNutrients.retinol, 2), unit: 'µg' },
    { name: 'Vitamin A', quantity: round(mealStore.totalNutrients.vitaminA, 2), unit: 'µg' },
    { name: 'Beta Carotene', quantity: round(mealStore.totalNutrients.betaCarotene, 2), unit: 'µg' },
    { name: 'Vitamin D', quantity: round(mealStore.totalNutrients.vitaminD, 2), unit: 'µg' },
    { name: 'Vitamin C', quantity: round(mealStore.totalNutrients.vitaminC, 2), unit: 'mg' },
    { name: 'Folate', quantity: round(mealStore.totalNutrients.folate, 2), unit: 'µg' },
    { name: 'Vitamin B12', quantity: round(mealStore.totalNutrients.vitaminB12, 2), unit: 'µg' },
    { name: 'Vitamin K', quantity: round(mealStore.totalNutrients.vitaminK, 2), unit: 'µg' },
    { name: 'Cholesterol', quantity: round(mealStore.totalNutrients.cholesterol, 2), unit: 'mg' },
    { name: 'Saturated Fatty Acids', quantity: round(mealStore.totalNutrients.saturatedFattyAcids, 2), unit: 'g' },
    { name: 'Monounsaturated Fatty Acids', quantity: round(mealStore.totalNutrients.monounsaturatedFattyAcids, 2), unit: 'g' },
    { name: 'Polyunsaturated Fatty Acids', quantity: round(mealStore.totalNutrients.polyunsaturatedFattyAcids, 2), unit: 'g' }
];
    
    return(
      <div style={{ position: 'absolute', left: 8, maxHeight: '450px', width: 294, overflow: 'auto', boxShadow: '0 0 10px', scrollbarWidth: 'none', msOverflowStyle: 'none', borderRadius: 10 }}>
          <Table inverted className="custom-table global-font" celled>
              <Table.Header>
                  <Table.Row>
                      <Table.HeaderCell >Nutrient</Table.HeaderCell>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell>Units</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>
              <Table.Body>
                  {nutrients.map((nutrient, index) => (
                      <Table.Row key={index}>
                          <Table.Cell >{nutrient.name}</Table.Cell>
                          <Table.Cell>{nutrient.quantity}</Table.Cell>
                          <Table.Cell>{nutrient.unit}</Table.Cell>
                      </Table.Row>
                  ))}
              </Table.Body>
          </Table>
      </div>
        
    )
})