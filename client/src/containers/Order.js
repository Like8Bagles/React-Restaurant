import React, {useEffect, useState} from 'react'
import SubmitOrder from '../components/SubmitOrder'

const Order = (props) => {

    const [order, setOrder] = useState([])
    const [orderId, setOrderId] = useState("")
    const [itemId, setItemId] = useState([])
    const [items, setItems] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch(`orders/${props.id}/order_items`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.errors){
                setErrors(data.errors)
            }else {
                setOrder([...data])
                console.log(order)
                setItemId(data.map(o => {return{
                    id: o.item_id,
                    quantity: o.quantity
                }}))
                setOrderId(data.map(o => o.order_id))
            }
        })
        fetch(`/items/${itemId.id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setItems(data)
        })
    }, [])
    
    const total_price = items.map(i => parseFloat(i.price)).reduce((x, y) => x + y, 0)
    console.log(total_price)

    const errorList = errors.map(e => <ul>{e}</ul>)
    const orderList = items.map(i => <li><b>{i.name}</b> <br/> <b>${i.price} (each)</b> </li>)

    return (
        <div>
            <h2>Your order</h2>
            <div className={"order_items"}>
                {orderList}
                {errorList}
                <SubmitOrder order={order} items={items} totalPrice={total_price} />
            </div>
        </div>
    )
}

export default Order