import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

const SubmitOrder = (props) => {

    const [orderName, setOrderName] = useState("")
    const [allItems, setAllItems] = useState([])
    const [errors, setErrors] = useState([])
    const [order, setOrder] = useState([])
    const history = useHistory()
   
    const handleSubmit = () => {

        
        // const itemsList = allItems.map(i => {return{item_id: i.id, quantity: i.quantity}})
        // [{item_id: 5, quantity: 2}, {item_id: 7, quantity: 1}]
        fetch("/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // order: {
                //     order_name: orderName,
                //     order_items_attributes: itemsList
                // }
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.errors) {
                setErrors(data.errors)
            } else{
                setOrder(data)
                history.push("/order_complete")
            }
        })
        
    }


    return (
        <div>
            <p className="price">The total price will be:</p>
            <b>${props.totalPrice}</b>
            
            <form onSubmit={handleSubmit}>
                <p>Please type in what you would like to name this order</p>
                <label>Name:  </label>
                <input
                    className = "order_name"
                    type="text"
                    id="orderName"
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)} 
                />
                <p>Would you like to submit your order?</p>
                <button type="submit">Yes!</button>
            </form>
        </div>
    )
}

export default SubmitOrder