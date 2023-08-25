import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import {Cart} from '../../styles/pages/app'
import { Bag, X } from '@phosphor-icons/react';
import { CartContext } from '../../context/CartProvider';
import axios from 'axios';


export default function CartShop(){

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  
 const {removeCartItem,cartTotal,cartItems,setCartItems} = useContext(CartContext)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
       products:cartItems,
      })
     
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
      

    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!')
    }
  }


  return(
    <div>
    <Cart onClick={openModal}><Bag size={24} color="#fbf4f4" weight="light" /></Cart> 
    
<Modal
 isOpen={modalIsOpen}
 className="Modal"
 onRequestClose={closeModal}
 contentLabel="Example Modal"
>
 
 <div className="HeadModal">
   <button onClick={closeModal} className="Xbutton">
    <X size={24} color="#fbf4f4" weight="light" />
  </button>
    <h2 >Sacola de compras</h2>
 </div>
 {cartItems.map(product => (
    <div className="BoxContainer" key={product.id}>
    <img className="Image" src={product.imageUrl}/>
    <div className="BoxInfor">
    <strong className="strong" >{product.name}</strong>
    <span className="price">{product.price}</span>
    <div className="remove" onClick={()=>removeCartItem(product.id)} >Remover</div>
    </div>
    </div>
    ))
    }
 
 <div className="BoxTotal">
 <div className="Quantity">
   <p>Quantidade</p>
   <p>{cartItems.length} {cartItems.length > 1 ? "itens" : "item"}</p>
 </div>
 <div className="Total">
   <strong>Valor Total</strong>
   <strong>R$ {cartTotal}</strong>
 </div>
 <button className="ButtonBuy"
 onClick={handleBuyButton}
 disabled={isCreatingCheckoutSession || cartItems.length <= 0}
 >Finalizar compra </button>
 </div>
</Modal>
</div>
  )
}