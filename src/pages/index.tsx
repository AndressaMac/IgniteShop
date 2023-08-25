import Image from "next/future/image"
import Head from 'next/head'
import { GetStaticProps } from "next"
import Link from "next/link"
import { Bag } from "@phosphor-icons/react"
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from "../lib/stripe"
import { BagContainer, HomeContainer, Product } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import { useContext } from "react"
import { CartContext, IProduct } from "../context/CartProvider"

interface HomeProps {
  products: IProduct[]
}



export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });


const {addToCart,checkIfItemAlreadyExists} = useContext(CartContext)

function handleAddToCart(
  e: MouseEvent<HTMLButtonElement, MouseEvent>,
  product: IProduct
) {
  e.preventDefault();
  addToCart(product);
}
  return (
    <>
      <Head >
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <div key={product.id}>
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                
                <footer>
                  <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                  </div>
                  <BagContainer  onClick={(e) => handleAddToCart(e, product)}
                   disabled={checkIfItemAlreadyExists(product.id)}
                  ><Bag size={24} color="#fbf4f4" weight="light" />
                  </BagContainer>
                </footer>
              </Product>
              </Link>
              </div>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  }
}
