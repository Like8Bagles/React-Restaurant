import React, {useState} from 'react'

const MenuItem = (props) => {

    const [quantity, setQuantity] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({order_name: "temp"})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        const id = props.item_id
        props.order({
            quantity: quantity,
            item_id: id
        })
    }

    return (
        <div>
            <ul className={"menu_items"} id={props.item_id}>
                <b>{props.name}    </b>
                <br/>
                <b>${props.price}  </b>
                <br/>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        id="quantity"
                        defaultValue="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button type="submit">
                        Order
                    </button>
                </form>
                
                <br/>
            </ul>
        </div>
    )
}

export default MenuItem