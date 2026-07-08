import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  vendor?: string;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  remove: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  deliveryDate: string;
  deliveryTimeSlot: string;
  setDeliveryDate: (v: string) => void;
  setDeliveryTimeSlot: (v: string) => void;
};

const CartContext = createContext<CartCtx | null>(null);
const KEY = 'll_cart';
const PREFS_KEY = 'll_cart_prefs';

function defaultDeliveryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function loadPrefs() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') as {
      deliveryDate?: string;
      deliveryTimeSlot?: string;
    };
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const prefs = loadPrefs();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(prefs.deliveryDate || defaultDeliveryDate());
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(
    prefs.deliveryTimeSlot || '02:00 PM - 06:00 PM',
  );

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(PREFS_KEY, JSON.stringify({ deliveryDate, deliveryTimeSlot }));
  }, [deliveryDate, deliveryTimeSlot]);

  const add = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setDrawerOpen(true);
  };

  const remove = (productId: string) => setItems((prev) => prev.filter((i) => i.productId !== productId));
  const updateQty = (productId: string, quantity: number) => {
    if (quantity < 1) return remove(productId);
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  };
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        updateQty,
        clear,
        count,
        subtotal,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        deliveryDate,
        deliveryTimeSlot,
        setDeliveryDate,
        setDeliveryTimeSlot,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart outside provider');
  return ctx;
}
