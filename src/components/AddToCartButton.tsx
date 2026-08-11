"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Add to Cart Button                                   ┃
   ┃ File   : src/components/AddToCartButton.tsx                          ┃
   ┃ Role   : Trusted SKU cart action with feedback and cart navigation   ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useUI } from "@/app/providers";
import Button, {
  type ButtonVariant,
} from "@/components/Button";
import { useCart } from "@/components/CartProvider";

import type {
  AddToCartResult,
} from "@/types/cart";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type AddToCartButtonSize =
  | "sm"
  | "md"
  | "lg";

export type AddToCartButtonStatus =
  | "idle"
  | "added"
  | "already-in-cart"
  | "error";

export type AddToCartButtonProps = {
  /**
   * Trusted campaign SKU from src/data/campaigns.ts.
   *
   * Example:
   * MR-SPOTIFY-100K
   */
  sku: string;

  /**
   * Default button label.
   *
   * @default "Add to Cart"
   */
  label?: string;

  /**
   * Label shown immediately after a successful add.
   *
   * @default "Added to Cart"
   */
  addedLabel?: string;

  /**
   * Label shown when the campaign is already selected.
   *
   * @default "View Cart"
   */
  inCartLabel?: string;

  /**
   * Label shown when the cart action fails.
   *
   * @default "Try Again"
   */
  errorLabel?: string;

  /**
   * Button visual variant.
   *
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Platform color used by the platform button variant.
   *
   * Example:
   * #1ed760
   */
  platformAccent?: string;

  /**
   * Button size.
   *
   * @default "md"
   */
  size?: AddToCartButtonSize;

  /**
   * Makes the button fill its parent width.
   *
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Opens the future cart drawer after a successful add.
   *
   * @default true
   */
  openCartOnAdd?: boolean;

  /**
   * Sends the customer to /cart when clicking a campaign that is already
   * selected.
   *
   * @default true
   */
  navigateToCartWhenSelected?: boolean;

  /**
   * Cart destination.
   *
   * @default "/cart"
   */
  cartHref?: string;

  /**
   * Displays the selected-service count inside the button.
   *
   * @default false
   */
  showItemCount?: boolean;

  /**
   * Displays a visible feedback message beneath the button.
   *
   * An accessible screen-reader message is always rendered.
   *
   * @default false
   */
  showMessage?: boolean;

  /**
   * Automatically resets success or error feedback after this duration.
   *
   * Set to zero to disable automatic reset.
   *
   * @default 3000
   */
  resetAfterMs?: number;

  /**
   * Optional left icon override.
   */
  leftIcon?: ReactNode;

  /**
   * Optional right icon override.
   */
  rightIcon?: ReactNode;

  disabled?: boolean;
  className?: string;
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
    >
      <path
        d="M4 5H6L8.1 14.2H17.7L20 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="9"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="17"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
    >
      <path
        d="M5.5 12.5L9.5 16.5L18.5 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M5 12H19M14 7L19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
    >
      <path
        d="M12 4L21 20H3L12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M12 9V14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="17.2"
        r="0.9"
        fill="currentColor"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Helpers                                                                */
/* --------------------------------------------------------------------- */

function getFeedbackStatus(
  result: AddToCartResult,
): AddToCartButtonStatus {
  switch (result.status) {
    case "added":
      return "added";

    case "already-in-cart":
      return "already-in-cart";

    case "invalid-sku":
    case "not-purchasable":
    case "error":
    default:
      return "error";
  }
}

/* --------------------------------------------------------------------- */
/* Component                                                              */
/* --------------------------------------------------------------------- */

export default function AddToCartButton({
  sku,
  label = "Add to Cart",
  addedLabel = "Added to Cart",
  inCartLabel = "View Cart",
  errorLabel = "Try Again",
  variant = "primary",
  platformAccent,
  size = "md",
  fullWidth = false,
  openCartOnAdd = true,
  navigateToCartWhenSelected = true,
  cartHref = "/cart",
  showItemCount = false,
  showMessage = false,
  resetAfterMs = 3000,
  leftIcon,
  rightIcon,
  disabled = false,
  className,
}: AddToCartButtonProps) {
  const router = useRouter();

  const {
    addItem,
    isInCart,
    itemCount,
    isHydrated,
  } = useCart();

  const {
    openCart,
  } = useUI();

  const [
    status,
    setStatus,
  ] = useState<AddToCartButtonStatus>(
    "idle",
  );

  const [
    feedbackMessage,
    setFeedbackMessage,
  ] = useState("");

  const [
    isProcessing,
    setIsProcessing,
  ] = useState(false);

  const resetTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const normalizedSku =
    sku.trim().toUpperCase();

  const alreadyInCart =
    isHydrated &&
    isInCart(normalizedSku);

  const isSelected =
    alreadyInCart ||
    status === "already-in-cart";

  /* ------------------------------------------------------------------- */
  /* Feedback Reset                                                      */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(
          resetTimerRef.current,
        );
      }
    };
  }, []);

  function scheduleFeedbackReset(): void {
    if (resetTimerRef.current) {
      clearTimeout(
        resetTimerRef.current,
      );
    }

    if (resetAfterMs <= 0) {
      return;
    }

    resetTimerRef.current =
      setTimeout(() => {
        setStatus("idle");
        setFeedbackMessage("");
        resetTimerRef.current = null;
      }, resetAfterMs);
  }

  /* ------------------------------------------------------------------- */
  /* Display State                                                       */
  /* ------------------------------------------------------------------- */

  const buttonLabel = useMemo(() => {
    if (isSelected) {
      return inCartLabel;
    }

    switch (status) {
      case "added":
        return addedLabel;

      case "error":
        return errorLabel;

      case "idle":
      default:
        return label;
    }
  }, [
    addedLabel,
    errorLabel,
    inCartLabel,
    isSelected,
    label,
    status,
  ]);

  const resolvedLeftIcon = useMemo(() => {
    if (leftIcon) {
      return leftIcon;
    }

    if (isSelected) {
      return <CheckIcon />;
    }

    switch (status) {
      case "added":
        return <CheckIcon />;

      case "error":
        return <AlertIcon />;

      case "idle":
      default:
        return <CartIcon />;
    }
  }, [
    isSelected,
    leftIcon,
    status,
  ]);

  const resolvedRightIcon = useMemo(() => {
    if (rightIcon) {
      return rightIcon;
    }

    if (isSelected) {
      return <ArrowIcon />;
    }

    return undefined;
  }, [
    isSelected,
    rightIcon,
  ]);

  const countLabel =
    showItemCount &&
    itemCount > 0
      ? ` (${itemCount})`
      : "";

  /* ------------------------------------------------------------------- */
  /* Cart Action                                                         */
  /* ------------------------------------------------------------------- */

  function handleClick(): void {
    if (
      disabled ||
      isProcessing ||
      !normalizedSku
    ) {
      return;
    }

    if (alreadyInCart) {
      setStatus(
        "already-in-cart",
      );

      setFeedbackMessage(
        "This campaign is already in your cart.",
      );

      if (
        navigateToCartWhenSelected
      ) {
        router.push(cartHref);
      } else if (openCartOnAdd) {
        openCart();
      }

      return;
    }

    setIsProcessing(true);

    try {
      const result = addItem({
        sku: normalizedSku,
      });

      const nextStatus =
        getFeedbackStatus(result);

      setStatus(nextStatus);
      setFeedbackMessage(
        result.message,
      );

      if (result.status === "added") {
        if (openCartOnAdd) {
          openCart();
        }

        scheduleFeedbackReset();
        return;
      }

      if (
        result.status ===
        "already-in-cart"
      ) {
        if (
          navigateToCartWhenSelected
        ) {
          router.push(cartHref);
        } else if (openCartOnAdd) {
          openCart();
        }

        return;
      }

      scheduleFeedbackReset();
    } catch {
      setStatus("error");

      setFeedbackMessage(
        "The campaign could not be added. Please try again.",
      );

      scheduleFeedbackReset();
    } finally {
      setIsProcessing(false);
    }
  }

  /* ------------------------------------------------------------------- */
  /* Render                                                              */
  /* ------------------------------------------------------------------- */

  return (
    <div
      className={
        fullWidth
          ? "w-full"
          : "inline-flex flex-col"
      }
    >
      <Button
        type="button"
        variant={
          status === "error"
            ? "dark"
            : variant
        }
        platformAccent={
          platformAccent
        }
        size={size}
        leftIcon={
          resolvedLeftIcon
        }
        rightIcon={
          resolvedRightIcon
        }
        fullWidth={fullWidth}
        disabled={
          disabled ||
          isProcessing ||
          !normalizedSku
        }
        aria-busy={
          isProcessing
        }
        aria-label={`${buttonLabel}${countLabel}`}
        onClick={handleClick}
        className={className}
      >
        {isProcessing
          ? "Adding..."
          : `${buttonLabel}${countLabel}`}
      </Button>

      <p
        aria-live="polite"
        aria-atomic="true"
        className={
          showMessage
            ? [
                "mt-2 text-xs leading-5",
                status === "error"
                  ? "text-red-300/80"
                  : "text-white/45",
              ].join(" ")
            : "sr-only"
        }
      >
        {feedbackMessage}
      </p>
    </div>
  );
}