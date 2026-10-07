import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';

import {
    readStorage,
    writeStorage
} from '../utils/localStorage';

const C = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, set] = useState(() =>
        readStorage('shopsphere_cart', [])
    );

    useEffect(
        () => writeStorage('shopsphere_cart', cartItems),
        [cartItems]
    );

    const addToCart = (p, q = 1) =>
        set(a => {
            const x = a.find(i => i.id === p.id);

            return x
                ? a.map(i =>
                    i.id === p.id
                        ? { ...i, quantity: i.quantity + q }
                        : i
                )
                : [...a, { ...p, quantity: q }];
        });

    const removeFromCart = id =>
        set(a => a.filter(i => i.id !== id));

    const increaseQuantity = id =>
        set(a =>
            a.map(i =>
                i.id === id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            )
        );

    const decreaseQuantity = id =>
        set(a =>
            a
                .map(i =>
                    i.id === id
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                )
                .filter(i => i.quantity > 0)
        );

    const clearCart = () => set([]);

    const value = useMemo(
        () => ({
            cartItems,
            cartCount: cartItems.reduce(
                (s, i) => s + i.quantity,
                0
            ),
            cartTotal: cartItems.reduce(
                (s, i) => s + i.price * i.quantity,
                0
            ),
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart
        }),
        [cartItems]
    );

    return (
        <C.Provider value={value}>
            {children}
        </C.Provider>
    );
}

export function useCart() {
    const c = useContext(C);

    if (!c)
        throw Error(
            'useCart must be used inside CartProvider'
        );

    return c;
}