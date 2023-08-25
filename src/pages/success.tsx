import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, ImagesLine, SuccessContainer } from "../styles/pages/success";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

interface Product {
  name: string;
  imageUrl: string;
}

interface SuccessProps {
  costumerName: string;
  products: Product[]
}

export default function Success({ costumerName, products }: SuccessProps) {

  const { cartItems } = useContext(CartContext)

  return (
    <>
      <Head >
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImagesLine>
          {products.map(product => (
            <ImageContainer>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}

        </ImagesLine>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua compra de <strong>{products.length}</strong> camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });
  const allProducts = await stripe.products.list();

  console.log("all prods", allProducts.data, session.line_items.data[0]);

  const costumerName = session.customer_details.name;
  const products = session.line_items.data.map((item) => {
    const prod = allProducts.data.find((prod) => prod.id === (item.price.product as any).id)
    console.log("PROD", prod);

    return {
      name: prod.name,
      imageUrl: prod.images[0]
    }
  })

  return {
    props: {
      costumerName,
      products: products
      //{
      //
      //imageUrl: product.images[0]
      //  }
    }
  }
}
