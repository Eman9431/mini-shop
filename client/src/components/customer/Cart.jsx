import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeItem,
  syncCartToDB,
} from "../../features/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  const { items, isLoading, error } = useSelector((state) => state.cart);

  const handleIncrease = (id) => dispatch(increaseQty(id));
  const handleDecrease = (id) => dispatch(decreaseQty(id));
  const handleRemove = (id) => dispatch(removeItem(id));

  const handleCheckout = () => {
    dispatch(syncCartToDB({ userId, items }));
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container py-5">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <table className="table">
            <tbody>
              {items.map((item) => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => handleDecrease(item.productId)}>
                      -
                    </button>
                    {item.quantity}
                    <button onClick={() => handleIncrease(item.productId)}>
                      +
                    </button>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleRemove(item.productId)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total: ${total}</h4>

          <button onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
