import Header from "./componets/Header";
import Guitar from "./componets/Guitar";
import Footer from "./componets/Footer";
import useCart from "./hooks/useCart.js";

function App() {
    const { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, totalPrice } = useCart();

    return (
        <>
            <Header
                cart={cart}
                isEmpty={isEmpty}
                totalPrice={totalPrice}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Our Collections</h2>
                <div className="row mt-5">
                    <div className="row mt-5">
                        {data.map((guitar) => (
                            <Guitar
                                key={guitar.id}
                                guitar={guitar}
                                addToCart={addToCart}
                            />
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </>
    )
}

export default App;

