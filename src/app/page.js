import Cart from "@/components/Cart";
import Product from "@/components/Product";

const products = [
  {
    id: "1",
    name: "GoPro",
    price: 57,
    quantity: 0,
  },
  {
    id: "2",
    name: "Tripod",
    price: 7.99,
    quantity: 0,
  },
  {
    id: "3",
    name: "Bag",
    price: 4.99,
    quantity: 0,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-between p-24">
      <div className="flex gap-5">
        {products.map(i => <Product key={i.id} product={i}></Product>)}
      </div>
      <Cart></Cart>
    </main>
  );
}
