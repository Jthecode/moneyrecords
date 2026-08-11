"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Global Client Providers                              ┃
   ┃ File   : src/app/providers.tsx                                       ┃
   ┃ Role   : Cart state, navigation state, drawers, and global overlays  ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

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

import CartProvider from "@/components/CartProvider";

/* --------------------------------------------------------------------- */
/* Dynamically Loaded Global Overlays                                     */
/* --------------------------------------------------------------------- */

/**
 * CartDrawer imports useUI() from this provider file.
 *
 * Loading it dynamically prevents a static circular dependency while also
 * keeping the global drawer out of the initial server-rendered bundle.
 */
const CartDrawer = dynamic(
  () => import("@/components/CartDrawer"),
  {
    ssr: false,
    loading: () => null,
  },
);

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type UIContextValue = {
  /**
   * True while the mobile navigation drawer is open.
   */
  isMobileMenuOpen: boolean;

  /**
   * True while the campaign cart drawer is open.
   */
  isCartOpen: boolean;

  /**
   * True whenever any global drawer or overlay is open.
   */
  isOverlayOpen: boolean;

  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  closeAllOverlays: () => void;
};

type UIProviderProps = {
  children: ReactNode;
};

export type ProvidersProps = {
  children: ReactNode;
};

/* --------------------------------------------------------------------- */
/* Context                                                                */
/* --------------------------------------------------------------------- */

const UIContext =
  createContext<UIContextValue | null>(null);

UIContext.displayName =
  "MoneyRecordsUIContext";

/* --------------------------------------------------------------------- */
/* UI Provider                                                            */
/* --------------------------------------------------------------------- */

function UIProvider({
  children,
}: UIProviderProps) {
  const pathname = usePathname();

  const previousPathnameRef =
    useRef(pathname);

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  const [
    isCartOpen,
    setIsCartOpen,
  ] = useState(false);

  const isOverlayOpen =
    isMobileMenuOpen ||
    isCartOpen;

  /* ------------------------------------------------------------------- */
  /* Mobile Navigation Actions                                           */
  /* ------------------------------------------------------------------- */

  const openMobileMenu =
    useCallback((): void => {
      setIsCartOpen(false);
      setIsMobileMenuOpen(true);
    }, []);

  const closeMobileMenu =
    useCallback((): void => {
      setIsMobileMenuOpen(false);
    }, []);

  const toggleMobileMenu =
    useCallback((): void => {
      setIsCartOpen(false);

      setIsMobileMenuOpen(
        (currentState) =>
          !currentState,
      );
    }, []);

  /* ------------------------------------------------------------------- */
  /* Cart Drawer Actions                                                 */
  /* ------------------------------------------------------------------- */

  const openCart =
    useCallback((): void => {
      setIsMobileMenuOpen(false);
      setIsCartOpen(true);
    }, []);

  const closeCart =
    useCallback((): void => {
      setIsCartOpen(false);
    }, []);

  const toggleCart =
    useCallback((): void => {
      setIsMobileMenuOpen(false);

      setIsCartOpen(
        (currentState) =>
          !currentState,
      );
    }, []);

  /* ------------------------------------------------------------------- */
  /* Global Overlay Actions                                              */
  /* ------------------------------------------------------------------- */

  const closeAllOverlays =
    useCallback((): void => {
      setIsMobileMenuOpen(false);
      setIsCartOpen(false);
    }, []);

  /* ------------------------------------------------------------------- */
  /* Close Overlays After Route Navigation                               */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    if (
      previousPathnameRef.current ===
      pathname
    ) {
      return;
    }

    previousPathnameRef.current =
      pathname;

    closeAllOverlays();
  }, [
    pathname,
    closeAllOverlays,
  ]);

  /* ------------------------------------------------------------------- */
  /* Escape-Key Dismissal                                                */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    if (!isOverlayOpen) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ): void {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      closeAllOverlays();
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    closeAllOverlays,
    isOverlayOpen,
  ]);

  /* ------------------------------------------------------------------- */
  /* Close Mobile Navigation at Desktop Width                            */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    const desktopQuery =
      window.matchMedia(
        "(min-width: 768px)",
      );

    function handleDesktopChange(
      event: MediaQueryListEvent,
    ): void {
      if (event.matches) {
        closeMobileMenu();
      }
    }

    if (desktopQuery.matches) {
      closeMobileMenu();
    }

    desktopQuery.addEventListener(
      "change",
      handleDesktopChange,
    );

    return () => {
      desktopQuery.removeEventListener(
        "change",
        handleDesktopChange,
      );
    };
  }, [closeMobileMenu]);

  /* ------------------------------------------------------------------- */
  /* Background Scroll Lock                                              */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    if (!isOverlayOpen) {
      return;
    }

    const body =
      document.body;

    const documentElement =
      document.documentElement;

    const previousBodyOverflow =
      body.style.overflow;

    const previousBodyPaddingRight =
      body.style.paddingRight;

    const previousBodyTouchAction =
      body.style.touchAction;

    const previousHtmlOverflow =
      documentElement.style.overflow;

    const previousHtmlOverscrollBehavior =
      documentElement.style
        .overscrollBehavior;

    const scrollbarWidth =
      window.innerWidth -
      documentElement.clientWidth;

    const computedBodyPaddingRight =
      Number.parseFloat(
        window
          .getComputedStyle(body)
          .paddingRight,
      ) || 0;

    body.style.overflow =
      "hidden";

    body.style.touchAction =
      "none";

    documentElement.style.overflow =
      "hidden";

    documentElement.style.overscrollBehavior =
      "none";

    if (scrollbarWidth > 0) {
      body.style.paddingRight =
        `${
          computedBodyPaddingRight +
          scrollbarWidth
        }px`;
    }

    return () => {
      body.style.overflow =
        previousBodyOverflow;

      body.style.paddingRight =
        previousBodyPaddingRight;

      body.style.touchAction =
        previousBodyTouchAction;

      documentElement.style.overflow =
        previousHtmlOverflow;

      documentElement.style.overscrollBehavior =
        previousHtmlOverscrollBehavior;
    };
  }, [isOverlayOpen]);

  /* ------------------------------------------------------------------- */
  /* Context Value                                                       */
  /* ------------------------------------------------------------------- */

  const value =
    useMemo<UIContextValue>(
      () => ({
        isMobileMenuOpen,
        isCartOpen,
        isOverlayOpen,

        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu,

        openCart,
        closeCart,
        toggleCart,

        closeAllOverlays,
      }),
      [
        isMobileMenuOpen,
        isCartOpen,
        isOverlayOpen,

        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu,

        openCart,
        closeCart,
        toggleCart,

        closeAllOverlays,
      ],
    );

  return (
    <UIContext.Provider
      value={value}
    >
      {children}

      {/* Global campaign cart overlay */}
      <CartDrawer />
    </UIContext.Provider>
  );
}

/* --------------------------------------------------------------------- */
/* Main Provider Composition                                              */
/* --------------------------------------------------------------------- */

/**
 * Main client-provider wrapper used by src/app/layout.tsx.
 *
 * CartProvider manages:
 * - Trusted campaign SKUs
 * - Selected campaign services
 * - Cart totals
 * - Local-storage persistence
 * - Cross-tab cart synchronization
 *
 * UIProvider manages:
 * - Mobile navigation visibility
 * - Campaign cart-drawer visibility
 * - Mutual exclusion between drawers
 * - Escape-key dismissal
 * - Route-change dismissal
 * - Desktop mobile-menu cleanup
 * - Background scroll locking
 * - Global CartDrawer rendering
 */
export default function Providers({
  children,
}: ProvidersProps) {
  return (
    <CartProvider>
      <UIProvider>
        {children}
      </UIProvider>
    </CartProvider>
  );
}

/* --------------------------------------------------------------------- */
/* UI Hook                                                                */
/* --------------------------------------------------------------------- */

/**
 * Access global Money Records navigation and overlay controls.
 *
 * Example:
 *
 * const {
 *   openCart,
 *   closeCart,
 *   toggleCart,
 *   openMobileMenu,
 *   closeMobileMenu,
 * } = useUI();
 */
export function useUI(): UIContextValue {
  const context =
    useContext(UIContext);

  if (!context) {
    throw new Error(
      "useUI must be used within the Money Records Providers component.",
    );
  }

  return context;
}