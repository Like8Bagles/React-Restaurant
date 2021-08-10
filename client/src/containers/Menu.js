import React, {useState, useEffect} from 'react'

import MenuItem from './MenuItem'

const Menu = (props) => {

    const [menu, setMenu] = useState([])
    const [errors, setErrors] = useState([])
    const [orderName, setOrderName] = useState("")
    const [order, setOrder] = useState({
        order_name: "",
        order_items_attributes: [{
            item_id: 1,
            quantity: 0
        }, {
            item_id: 2, 
            quantity: 0
        }]
    })
    const [quantity, setQuantity] = useState({})
    
    useEffect(() => {
        fetch('/items')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.errors){
                setErrors(data.errors)
            }else {
                setMenu(data)
            }
        })
    }, [])

    // const addToOrder = (order_item) => {
    //     fetch(`orders/${props.id}/order_items`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(order_item)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         if(data.errors) {
    //             setErrors(data.errors)
    //         } else {
    //             setOrder(data)
    //             setOrderItemId(data.id)
    //         }
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        setOrder({
            ...order, order_name: orderName
        })
        fetch("/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...order, order_name: orderName})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.errors) {
                setErrors(data.errors)
            }else {
                setOrder(data)
            }
        })
    }
    

    const changeQuantity = (item) => {
        //debugger
        setQuantity({item})
        const quantity = item.quantity
        if(quantity !== 0) {
            let newItems
            if (order.order_items_attributes.find(i => i.item_id = item.item_id)) {
                newItems = order.order_items_attributes.map(i => i.item_id == item.item_id ? {...i, quantity: quantity} : i)
            } else {
                newItems = order.order_items_attributes.push([{
                    item_id: item.item_id,
                    quantity: quantity
                }])
            }
            setOrder({
                order_items_attributes: newItems
            })
        } 
    }

    const menuItems = menu.map(i => <MenuItem changeTheQuantity={changeQuantity} name={i.name} price={i.price} image={i.image} loggedIn={props.loggedIn} item_id={i.id} />)
    const errorList = errors.map(e => <ul>{e}</ul>)

    if(props.loggedIn) {
        return (
            <form onSubmit={handleSubmit}>
                <h1>Menu</h1>
                {menuItems}
                {errorList}
                <label>What Would You Like To Name This Order?</label>
                <br/>
                <input 
                    type="text"
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                />
                <button type="submit">
                    Order
                </button>
            </form>
        )
    } else {
        return(
        <div>
            <h1>Menu</h1>
                {menuItems}
                {errorList}
        </div>
        )
        
    }
        
}

export default Menu