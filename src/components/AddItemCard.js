import React, { useEffect } from "react";
import { axiosWithAuth } from "../utility/AxiosWithAuth";

import styled from 'styled-components'

import Item from './Item'

const FoodListContainer = styled.div`
    border: 1px solid gray;
    margin: 2rem;
    width: auto;
    height: auto;
`

const AddItemCard = ({setItem, state, toggleCompleted}) => {
    useEffect(() => {
        axiosWithAuth()
        .get('/api/user/event/id')
        .then(res => {
            setItem(res.state.items);
            })
        .catch(err => {console.log(err);
        });
    }, []);

    return (
        <FoodListContainer>
             <h4>Food List</h4>
            {state.tasks.map(foodItem => {
                return(
                <Item  key = {foodItem.id} 
                      item={foodItem.item}
                      toggleCompleted={toggleCompleted}
                      completed={foodItem.completed}
                      id={foodItem.id}/>)
            })}
        </FoodListContainer>
    )
}
export default AddItemCard