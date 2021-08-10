import React, {useState, useEffect} from 'react'

export const SavedOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch("/orders")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setOrders(data)
        })
    }, [])

    const noNull = orders.filter(o => o.order_name !== null)
    const filteredOrders = noNull.filter(o => o.order_name !== "temp")
    const mappedOrders = filteredOrders.map(o => <h2 key={o.id}>{o.order_name}</h2>)
    

    return (
        <div>
            {mappedOrders}
        </div>
    )
}

export default SavedOrders