import { observer } from "mobx-react-lite";
import { Fragment } from "react";

import { Container, Header, Segment } from "semantic-ui-react";

import { useStore } from "../stores/store";
import WeightEntryItem from "./weightEntryItem";









export default observer(function WeightEntryList(){
    const {weightStore} = useStore();
    const {weightIns} = weightStore;

    return(
        <Container textAlign="center" className="weightListContainer">
           {weightIns.map((win) => (
                    <WeightEntryItem key={win.id} weightIn={win}/>
                ))}
        </Container>
    )
})