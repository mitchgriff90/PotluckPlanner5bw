import React, { useState, useEffect }from "react";
import { axiosWithAuth } from "../utility/AxiosWithAuth";

export default function PotluckInfoCard(props) {

 const [potLucks, setPotLucks] = useState([])

    useEffect(() => {
        axiosWithAuth()
        .get('/api/user/id')
        .then(res => {
            setPotLucks(res.data);
            })
        .catch(err => {console.log(err);
        });
    }, []);

    const deletePotluckEvent = color => {
        axiosWithAuth()
        .delete(`/api/user/${potLucks.id}`)
        .then(res => {
          const newPotluckList = potLucks.filter((potluck) => {
             return potluck.id !== res.data
          })
          setPotLucks(newPotluckList)
        })
        .catch(err => console.log(err))
    };

    return(
        <div>
            <div>
                {potLucks.map((potLuck) => {
                    return (
                        <div key={potLuck.id}>
                            <h3>Event Name: {potLuck.eventName}</h3>
                            <p>Location: {potLuck.location }</p>
                            <p>Date: {potLuck.date}</p>
                            <p>Time: {potLuck.time}</p>
                        </div>    
                    )
                })}
                 <button onClick = {e => {
                    e.stopPropagation();
                    deletePotluckEvent(potLucks.id)
                 }}> Delete Potluck Event </button>
            </div>
        </div>
    )
}