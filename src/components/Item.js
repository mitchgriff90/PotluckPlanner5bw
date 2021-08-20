import React from "react";

const Item = ({item, completed, id, toggleCompleted}) => {

    return (
        <div onClick = { () => toggleCompleted (id)}
            style = {{ textDecoration: completed?'line-through' : '',
                    color: completed? 'red': '' }} >
                <li > {item} </li>
            
        </div>
    )
};

export default Item