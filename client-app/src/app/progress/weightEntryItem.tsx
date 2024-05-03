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
    //{format(activity.date!, 'dd MMM yyyy')}
  return (
    <>
        <Segment className="meal-wrapper">
            <Header as="h1" floated="left" className="macros global-font" size="medium">
            0001-01-01
            </Header>
            <Header as="h1" floated="left" className="macros  global-font" size="medium">
            {weightIn.weight}
            </Header>
            <Button size='medium' inverted color="red" className="macros global-font" onClick={handleDelete}>
            -
            </Button>
        </Segment>

       
    </>
   
  );
})
 // {format(weightIn.date!, 'dd MMM yyyy')}