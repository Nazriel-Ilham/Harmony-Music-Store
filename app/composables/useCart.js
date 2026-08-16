import { computed, onMounted } from "vue";

export const useCart = () => {
  const cart = useState("cart", () => []);

  // 1. Ambil data dari localStorage saat halaman pertama kali dimuat
  onMounted(() => {
    if (process.client) {
      const savedCart = localStorage.getItem("harmony_cart");
      if (savedCart) {
        try {
          cart.value = JSON.parse(savedCart);
        } catch (e) {
          console.error("Gagal membaca cart dari localStorage:", e);
        }
      }
    }
  });

  // 2. Fungsi pembantu untuk menyimpan perubahan ke localStorage
  const saveCart = () => {
    if (process.client) {
      localStorage.setItem("harmony_cart", JSON.stringify(cart.value));
    }
  };

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
    saveCart(); // Simpan perubahan
  };

  const removeFromCart = (id) => {
    cart.value = cart.value.filter((item) => item.id !== id);
    saveCart(); // Simpan perubahan
  };

  const increaseQuantity = (id) => {
    const item = cart.value.find((item) => item.id === id);

    if (item) {
      item.quantity++;
      saveCart(); // Simpan perubahan
    }
  };

  const decreaseQuantity = (id) => {
    const item = cart.value.find((item) => item.id === id);

    if (item && item.quantity > 1) {
      item.quantity--;
      saveCart(); // Simpan perubahan
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
    if (process.client) {
      localStorage.removeItem("harmony_cart"); // Hapus dari storage saat dikosongkan
    }
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
