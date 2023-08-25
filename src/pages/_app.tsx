import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import logoImg from "../assets/logo.svg"
import { Container, Header } from "../styles/pages/app"
import Image from "next/future/image"
import React from 'react';
import CartShop from "../components/Cart"
import '../styles/components/cartshop.css'
import {CartContextProvider } from "../context/CartProvider"



globalStyles()
function App({ Component, pageProps }: AppProps) {

  return (
    <CartContextProvider>
    <Container>
        <Header>
           <Image src={logoImg} alt="" />
           <CartShop />
         </Header>
         <Component {...pageProps} />
    </Container>
    </CartContextProvider>
 
  )
}

export default App
