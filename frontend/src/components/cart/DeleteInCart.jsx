/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../../context/cartContext";

export default function DeleteInCart({ productId, cartId }) {
  const { removeFromCart } = useCart();

  const handleDelete = () => {
    removeFromCart(productId, cartId);
  };
  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700"
      aria-label="Supprimer de la wishlist"
    >
      <span className="text-lg">
        <FaTrashAlt />
      </span>
    </button>
  );
}
