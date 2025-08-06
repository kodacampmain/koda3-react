import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authContext } from "../contexts/auth/authContext";
import { addToCart, removeFromCart } from "../redux/slices/shoppingSlice";
/**
 * @typedef {Keranjang}
 * @property {Object} product
 * @property {string} product.name
 * @property {number} product.price
 */
function ShoppingApp() {
  // const [keranjang, setKeranjang] = useState([]);
  /**
   * @param {Object} product
   * @param {string} product.name
   * @param {number} product.price
   */
  // const addToKeranjang = (product) => {
  //   setKeranjang((keranjang) => {
  //     for (let belanja of keranjang) {
  //       if (belanja.name === product.name) {
  //         return keranjang;
  //       }
  //     }
  //     return [...keranjang, product];
  //   });
  // };
  // const removeFromKeranjang = (productName) => {
  //   setKeranjang((keranjang) =>
  //     keranjang.filter((product) => {
  //       return product.name !== productName;
  //     }),
  //   );
  // };
  return (
    <>
      <Header />
      <div className="grid grid-cols-[1fr_300px]">
        <Product
        // addToKeranjang={addToKeranjang}
        />
        <CartSummary
        // keranjang={keranjang}
        // removeFromKeranjang={removeFromKeranjang}
        />
      </div>
    </>
  );
}

function Product() {
  //   const [products, _] = useState([
  //     { name: "a", price: 1000 },
  //     { name: "b", price: 2000 },
  //     { name: "c", price: 4000 },
  //     { name: "d", price: 3000 },
  //     { name: "e", price: 1500 },
  //   ]);
  const products = [
    { name: "a", price: 1000 },
    { name: "b", price: 2000 },
    { name: "c", price: 4000 },
    { name: "d", price: 3000 },
    { name: "e", price: 1500 },
  ];
  const dispatch = useDispatch();
  return (
    <section className="grid grid-cols-3 gap-2.5 p-5">
      {products.length > 0 &&
        products.map((product, idx) => {
          return (
            <div
              className="cursor-pointer border-2 border-solid border-black p-1.25"
              key={idx}
              onClick={() => {
                // addToKeranjang(product);
                dispatch(
                  addToCart({
                    product,
                  }),
                );
              }}
            >
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          );
        })}
    </section>
  );
}

function CartSummary() {
  const shoppingState = useSelector((state) => state.shopping);
  const dispatch = useDispatch();
  return (
    <section className="p-5">
      {shoppingState.cart.length === 0 && (
        <p>
          Keranjang sedang kosong, masukkan produk disamping terlebih dahulu
        </p>
      )}
      {shoppingState.cart.length > 0 &&
        shoppingState.cart.map((product, idx) => {
          return (
            <div
              className="relative border-2 border-solid border-black p-1.25"
              key={idx}
            >
              <div>
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
              <div
                className="absolute top-0 right-0 cursor-pointer rounded-full bg-gray-300 p-1.25 select-none"
                onClick={() =>
                  // removeFromKeranjang(product.name)
                  dispatch(
                    removeFromCart({
                      productName: product.name,
                    }),
                  )
                }
              >
                X
              </div>
            </div>
          );
        })}
    </section>
  );
}

function Header() {
  const { isLoggedIn, username, login, logout } = useContext(authContext);
  return (
    <header>
      {isLoggedIn || (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(e.target.username.value);
          }}
          className="px-5 py-2.5"
        >
          <input
            type="text"
            name="username"
            className="mr-1.25 border-2 border-solid border-black p-1.25"
          />
          <button className="cursor-pointer border-2 border-solid border-black p-1.25 select-none">
            Login
          </button>
        </form>
      )}
      {isLoggedIn && (
        <div className="flex gap-1.25 px-5 py-2.5">
          <p className="p-1.25">Welcome, {username}</p>
          <button
            onClick={logout}
            className="cursor-pointer border-2 border-solid border-black p-1.25 select-none"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default ShoppingApp;
