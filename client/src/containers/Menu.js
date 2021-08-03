import React, {useState, useEffect} from 'react'
import MenuItem from './MenuItem'

const Menu = (props) => {

    const [menu, setMenu] = useState([])
    const [errors, setErrors] = useState([])
    const [order, setOrder] = useState([])
    
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

    const addToOrder = (order_item) => {
        fetch(`orders/${props.id}/order_items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order_item)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.errors) {
                setErrors(data.errors)
            } else {
                setOrder(data)
            }
        })
    }

    const menuItems = menu.map(i => <MenuItem name={i.name} price={i.price} image={i.image} item_id={i.id} order={addToOrder} />)
    const errorList = errors.map(e => <ul>{e}</ul>)

    return (
        <div>
            <h1>Menu</h1>
            {menuItems}
            {errorList}
        </div>
    )
}

export default Menu