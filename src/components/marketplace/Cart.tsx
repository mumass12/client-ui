import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useApp } from "../../context/MarketContext";

export function Cart() {
  const { state, dispatch } = useApp();

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { productId, quantity: newQuantity },
      });
    }
  };

  const total = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!state.isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => dispatch({ type: "TOGGLE_CART", payload: false })}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-strong animate-slide-in-right">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary-50 to-primary-100/50">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={() => dispatch({ type: "TOGGLE_CART", payload: false })}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {state.cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-gray-500 px-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-float">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-xl font-semibold mb-3 text-gray-700">
              Your cart is empty
            </p>
            <p className="text-gray-500 text-center leading-relaxed">
              Add some amazing products to get started on your shopping journey
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {state.cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex items-center space-x-4 bg-gradient-to-r from-gray-50 to-primary-50/30 p-5 rounded-xl hover:shadow-medium transition-all duration-300"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl shadow-soft"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-primary-600 font-bold text-lg">
                      ${item.product.price}
                    </p>
                    {item.selectedSize && (
                      <p className="text-gray-500 text-sm">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    {item.selectedColor && (
                      <p className="text-gray-500 text-sm">
                        Color: {item.selectedColor}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-300 hover:scale-110"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-10 text-center font-bold text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-300 hover:scale-110"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t bg-gradient-to-r from-gray-50 to-primary-50/30 p-6 space-y-6">
              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-primary-600">${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-green-glow">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
