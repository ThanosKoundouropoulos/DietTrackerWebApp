import { Button, Segment, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { Weight } from '../models/weight';
import { format } from 'date-fns';


interface Props {
  weightIn: Weight;
}

export default observer(function weightEntryItem({ weightIn }: Props) {
  const { weightStore} = useStore();
  const {deleteWeight} = weightStore;
  


  

 

  const handleDelete = async () => {
    deleteWeight(weightIn.id);
  };

  return (
    <>
        <Segment className="meal-wrapper">
            <Header as="h1" floated="left" className="macros" size="medium">
              weightIn.date?
            </Header>
            <Header as="h1" floated="left" className="macros" size="medium">
            {weightIn.weight}
            </Header>
            <Button inverted color="red" className="macros" onClick={handleDelete}>
            Delete
            </Button>
        </Segment>

       
    </>
   
  );
})
 // {format(weightIn.date!, 'dd MMM yyyy')}