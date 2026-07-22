import { computed } from "vue";

export const useCart = () => {
  const cart = useState("cart", () => []);

  const addToCart = (product, quantity = 1) => {
    const existing = cart.value.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.value.push({
        ...product,
        quantity,
      });
    }
  };

  const removeFromCart = (id) => {
    cart.value = cart.value.filter((item) => item.id !== id);
  };

  const increaseQuantity = (id) => {
    const item = cart.value.find((item) => item.id === id);

    if (item) item.quantity++;
  };

  const decreaseQuantity = (id) => {
    const item = cart.value.find((item) => item.id === id);

    if (item && item.quantity > 1) {
      item.quantity--;
    }
  };

  const subtotal = computed(() =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0),
  );

  const totalItems = computed(() =>
    cart.value.reduce((total, item) => total + item.quantity, 0),
  );
  const clearCart = () => {
    cart.value = [];
  };

  return {
    cart,
    subtotal,
    totalItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
};
