import React, {useState} from 'react'

const SubmitOrder = (props) => {

    const [orderName, setOrderName] = useState("")
    const [errors, setErrors] = useState([])
    const [order, setOrder] = useState([])
   
    const handleSubmit = () => {
        fetch("/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderName)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.errors) {
                setErrors(data.errors)
            } else{
                setOrder(data)
            }
        })
    }


    return (
        <div>
            <p>The total price will be</p>
            {props.totalPrice}
            
            <form classname="price"onSubmit={handleSubmit}>
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