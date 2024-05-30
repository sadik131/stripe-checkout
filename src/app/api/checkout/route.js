import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.stripeSK);

const getActiveProducts = async () => {
    const checkProducts = await stripe.products.list();
    const availableProducts = checkProducts.data.filter(
        (product) => product.active === true
    );
    return availableProducts;
};

export const POST = async (request) => {
    const { products } = await request.json();
    const data = products;

    let activeProducts = await getActiveProducts();

    try {
        for (const product of data) {
            const stripeProduct = activeProducts?.find(
                (stripeProduct) =>
                    stripeProduct?.name?.toLowerCase() == product?.name?.toLowerCase()
            );

            if (stripeProduct == undefined) {
                const prod = await stripe.products.create({
                    name: product.name,
                    default_price_data: {
                        unit_amount: product.price * 100,
                        currency: "usd",
                    },
                });
            }
        }
    } catch (error) {
        console.error("Error in creating a new product", error);
        throw error;
    }

    activeProducts = await getActiveProducts();
    let stripeItems = [];

    for (const product of data) {
        const stripeProduct = activeProducts?.find(
            (prod) => prod?.name?.toLowerCase() == product?.name?.toLowerCase()
        );

        if (stripeProduct) {
            stripeItems.push({
                price: stripeProduct?.default_price,
                quantity: product?.quantity,
            });
        }
    }

    const session = await stripe.checkout.sessions.create({
        line_items: stripeItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });

    return NextResponse.json({ url: session.url });
};
