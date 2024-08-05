import { observer } from "mobx-react-lite"
import { Button, Container, Table } from "semantic-ui-react";
import { useStore } from "../../stores/store";


function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

interface Props {
    setOpenDetails: (state: boolean) => void;
}


export default observer(({ setOpenDetails }: Props) => {
    const { dietGoalStore } = useStore();
    const { totalNutrientsConsumed } = dietGoalStore;

    const nutrients = [
        { name: 'Caffeine', quantity: round(totalNutrientsConsumed.caffeine, 2), unit: 'mg' },
        { name: 'Sugars', quantity: round(totalNutrientsConsumed.sugars, 2), unit: 'g' },
        { name: 'Fiber', quantity: round(totalNutrientsConsumed.fiber, 2), unit: 'g' },
        { name: 'Calcium', quantity: round(totalNutrientsConsumed.calcium, 2), unit: 'mg' },
        { name: 'Iron', quantity: round(totalNutrientsConsumed.iron, 2), unit: 'mg' },
        { name: 'Magnesium', quantity: round(totalNutrientsConsumed.magnesium, 2), unit: 'mg' },
        { name: 'Potassium', quantity: round(totalNutrientsConsumed.potassium, 2), unit: 'mg' },
        { name: 'Sodium', quantity: round(totalNutrientsConsumed.sodium, 2), unit: 'mg' },
        { name: 'Zinc', quantity: round(totalNutrientsConsumed.zinc, 2), unit: 'mg' },
        { name: 'Retinol', quantity: round(totalNutrientsConsumed.retinol, 2), unit: 'µg' },
        { name: 'Vitamin A', quantity: round(totalNutrientsConsumed.vitaminA, 2), unit: 'µg' },
        { name: 'Beta Carotene', quantity: round(totalNutrientsConsumed.betaCarotene, 2), unit: 'µg' },
        { name: 'Vitamin D', quantity: round(totalNutrientsConsumed.vitaminD, 2), unit: 'µg' },
        { name: 'Vitamin C', quantity: round(totalNutrientsConsumed.vitaminC, 2), unit: 'mg' },
        { name: 'Folate', quantity: round(totalNutrientsConsumed.folate, 2), unit: 'µg' },
        { name: 'Vitamin B12', quantity: round(totalNutrientsConsumed.vitaminB12, 2), unit: 'µg' },
        { name: 'Vitamin K', quantity: round(totalNutrientsConsumed.vitaminK, 2), unit: 'µg' },
        { name: 'Cholesterol', quantity: round(totalNutrientsConsumed.cholesterol, 2), unit: 'mg' },
        { name: 'Saturated Fatty Acids', quantity: round(totalNutrientsConsumed.saturatedFattyAcids, 2), unit: 'g' },
        { name: 'Monounsaturated Fatty Acids', quantity: round(totalNutrientsConsumed.monounsaturatedFattyAcids, 2), unit: 'g' },
        { name: 'Polyunsaturated Fatty Acids', quantity: round(totalNutrientsConsumed.polyunsaturatedFattyAcids, 2), unit: 'g' }
    ];

    return (
        <Container className="nutritionContainer">
            <Button 
                size="small" 
                style={{backgroundColor: 'rgb(89, 20, 33)'}} 
                className='global-font' 
                negative 
                onClick={() => setOpenDetails(false)}
            >
                Close
            </Button>
            <Table celled className="global-font">
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
                            <Table.Cell>{nutrient.name}</Table.Cell>
                            <Table.Cell>{nutrient.quantity}</Table.Cell>
                            <Table.Cell>{nutrient.unit}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

        </Container>



    );
})