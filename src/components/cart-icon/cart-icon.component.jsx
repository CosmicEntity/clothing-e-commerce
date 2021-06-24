import React from 'react'
import {connect} from 'react-redux'
import {toggleCartHidden} from '../../redux/cart/cart.actions'
import './cart-icon.styles.scss'
import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg'

function CartIcon({toggleCartHidden}) {
    return (
        <div className="cart-icon" oncClick={toggleCartHidden}>
            <ShoppingBagIcon className="shopping-bag-icon"/>
            <span className="item-count"> 0 </span>
        </div>
    )
}

const mapDispatchToProps = dispatch =>({
    toggleCartHidden: ()=> dispatch(toggleCartHidden())
})

export default connect(null,mapDispatchToProps)(CartIcon);
