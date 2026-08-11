"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Cart Provider                                         ┃
   ┃ File   : src/components/CartProvider.tsx                              ┃
   ┃ Role   : Global trusted cart state, storage, totals, and actions       ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  CART_STORAGE_KEY,
  addCartItem,
  calculateCartTotals,
  clearCartStorage,
  getCartItemBySku,
  isSkuInCart,
  loadCartFromStorage,
  parseCartStoragePayload,
  removeCartItem,
  saveCartToStorage,
} from "@/lib/cart";

import {
  type AddToCartInput,
  type AddToCartResult,
  type CartContextValue,
  type CartItem,
  type RemoveFromCartResult,
} from "@/types/cart";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type CartProviderProps = {
  children: ReactNode;
};

type CommitOptions = {
  /**
   * Saves the updated cart to localStorage.
   *
   * Storage-event updates use false to prevent unnecessary write loops
   * between browser tabs.
   */
  persist?: boolean;
};

/* --------------------------------------------------------------------- */
/* Context                                                                */
/* --------------------------------------------------------------------- */

const CartContext =
  createContext<CartContextValue | null>(
    null,
  );

CartContext.displayName =
  "MoneyRecordsCartContext";

/* --------------------------------------------------------------------- */
/* Provider                                                               */
/* --------------------------------------------------------------------- */

export default function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] = useState<
    CartItem[]
  >([]);

  const [isHydrated, setIsHydrated] =
    useState(false);

  /**
   * Ref mirrors the latest cart state.
   *
   * Cart actions use this ref so rapid clicks always work with the newest
   * cart instead of waiting for React state updates to finish.
   */
  const itemsRef = useRef<CartItem[]>([]);

  /**
   * Prevents the localStorage hydration logic from running more than once
   * in React development Strict Mode.
   */
  const didHydrateRef =
    useRef(false);

  /**
   * Allows cart actions to determine whether localStorage has loaded
   * without waiting for a state update.
   */
  const hydratedRef =
    useRef(false);

  /* ------------------------------------------------------------------- */
  /* Commit Cart Items                                                   */
  /* ------------------------------------------------------------------- */

  const commitItems = useCallback(
    (
      nextItems: CartItem[],
      options: CommitOptions = {},
    ): void => {
      const {
        persist = true,
      } = options;

      itemsRef.current =
        nextItems;

      setItems(nextItems);

      if (
        persist &&
        hydratedRef.current
      ) {
        saveCartToStorage(
          nextItems,
        );
      }
    },
    [],
  );

  /* ------------------------------------------------------------------- */
  /* Hydrate from Browser Storage                                        */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    if (didHydrateRef.current) {
      return;
    }

    didHydrateRef.current = true;

    const storedCart =
      loadCartFromStorage();

    itemsRef.current =
      storedCart.items;

    hydratedRef.current =
      true;

    setItems(storedCart.items);
    setIsHydrated(true);

    /**
     * Re-save the validated payload.
     *
     * This removes stale prices, invalid campaigns, duplicate SKUs, and
     * services that are no longer purchasable.
     */
    saveCartToStorage(
      storedCart.items,
    );
  }, []);

  /* ------------------------------------------------------------------- */
  /* Synchronize Cart Across Browser Tabs                                */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    function handleStorageChange(
      event: StorageEvent,
    ): void {
      if (
        event.key !==
        CART_STORAGE_KEY
      ) {
        return;
      }

      const payload =
        parseCartStoragePayload(
          event.newValue,
        );

      itemsRef.current =
        payload.items;

      setItems(payload.items);

      if (
        !hydratedRef.current
      ) {
        hydratedRef.current =
          true;

        setIsHydrated(true);
      }
    }

    window.addEventListener(
      "storage",
      handleStorageChange,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
    };
  }, []);

  /* ------------------------------------------------------------------- */
  /* Ensure Hydration for Cart Actions                                   */
  /* ------------------------------------------------------------------- */

  const ensureHydratedCart =
    useCallback((): CartItem[] => {
      if (
        hydratedRef.current
      ) {
        return itemsRef.current;
      }

      const storedCart =
        loadCartFromStorage();

      itemsRef.current =
        storedCart.items;

      hydratedRef.current =
        true;

      didHydrateRef.current =
        true;

      setItems(storedCart.items);
      setIsHydrated(true);

      return storedCart.items;
    }, []);

  /* ------------------------------------------------------------------- */
  /* Add Item                                                            */
  /* ------------------------------------------------------------------- */

  const addItem = useCallback(
    (
      input: AddToCartInput,
    ): AddToCartResult => {
      const currentItems =
        ensureHydratedCart();

      const outcome =
        addCartItem(
          currentItems,
          input,
        );

      commitItems(
        outcome.items,
      );

      return outcome.result;
    },
    [
      commitItems,
      ensureHydratedCart,
    ],
  );

  /* ------------------------------------------------------------------- */
  /* Remove Item                                                         */
  /* ------------------------------------------------------------------- */

  const removeItem = useCallback(
    (
      sku: string,
    ): RemoveFromCartResult => {
      const currentItems =
        ensureHydratedCart();

      const outcome =
        removeCartItem(
          currentItems,
          sku,
        );

      commitItems(
        outcome.items,
      );

      return outcome.result;
    },
    [
      commitItems,
      ensureHydratedCart,
    ],
  );

  /* ------------------------------------------------------------------- */
  /* Clear Cart                                                          */
  /* ------------------------------------------------------------------- */

  const clearCart =
    useCallback((): void => {
      itemsRef.current = [];

      hydratedRef.current =
        true;

      didHydrateRef.current =
        true;

      setItems([]);
      setIsHydrated(true);

      clearCartStorage();
    }, []);

  /* ------------------------------------------------------------------- */
  /* Cart Lookup Helpers                                                 */
  /* ------------------------------------------------------------------- */

  const isInCart = useCallback(
    (sku: string): boolean => {
      return isSkuInCart(
        itemsRef.current,
        sku,
      );
    },
    [],
  );

  const getItem = useCallback(
    (
      sku: string,
    ): CartItem | undefined => {
      return getCartItemBySku(
        itemsRef.current,
        sku,
      );
    },
    [],
  );

  /* ------------------------------------------------------------------- */
  /* Cart Totals                                                         */
  /* ------------------------------------------------------------------- */

  const totals = useMemo(
    () =>
      calculateCartTotals(
        items,
      ),
    [items],
  );

  /* ------------------------------------------------------------------- */
  /* Context Value                                                       */
  /* ------------------------------------------------------------------- */

  const contextValue =
    useMemo<CartContextValue>(
      () => ({
        items,

        itemCount:
          totals.itemCount,

        uniqueItemCount:
          totals.uniqueItemCount,

        subtotalCents:
          totals.subtotalCents,

        currency:
          totals.currency,

        isHydrated,

        isEmpty:
          items.length === 0,

        addItem,
        removeItem,
        clearCart,
        isInCart,
        getItem,
      }),
      [
        items,
        totals,
        isHydrated,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        getItem,
      ],
    );

  return (
    <CartContext.Provider
      value={contextValue}
    >
      {children}
    </CartContext.Provider>
  );
}

/* --------------------------------------------------------------------- */
/* Cart Hook                                                              */
/* --------------------------------------------------------------------- */

/**
 * Provides access to the global Money Records cart.
 *
 * This hook must be used inside CartProvider.
 */
export function useCart(): CartContextValue {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider.",
    );
  }

  return context;
}