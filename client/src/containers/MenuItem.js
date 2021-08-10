import React, {useState} from 'react'

const MenuItem = (props) => {

    const [quantity, setQuantity] = useState(0)

    const handleChange = (e) => {
        e.preventDefault()
        setQuantity(e.target.value)
        props.changeTheQuantity({
            quantity: parseInt(e.target.value), 
            item_id: parseInt(e.target.id)
        })
    }

    if(props.loggedIn) {
        return (
        <div>
            <ul className={"menu_items"} id={props.item_id}>
                <b>{props.name}    </b>
                <br/>
                <b>${props.price}  </b>
                <br/>
                <input
                    type="number"
                    id={props.item_id}
                    defaultValue="0"
                    value={quantity}
                    // onChange={(e) => props.changeTheQuantity(e.target)}
                    onChange={handleChange}
                />

                <br/>
            </ul>
        </div>
        )
    }
    else{
        return (
            <div>
                <ul className={"menu_items"} id={props.item_id}>
                    <b>{props.name}    </b>
                    <br/>
                    <b>${props.price}  </b>
                    <br/>
                </ul>
            </div>
        )
    }
}

// if(quantity != 0) {
//    setQuantity(i.quantity)
//    setItemId()
//}

export default MenuItem