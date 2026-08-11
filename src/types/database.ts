// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Database Types                                       ┃
   ┃ File   : src/types/database.ts                                       ┃
   ┃ Role   : Supabase orders, intake, items, events, and status contracts┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

/**
 * JSON-compatible values accepted by Supabase JSON and JSONB columns.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | {
      [key: string]: Json | undefined;
    }
  | Json[];

/* --------------------------------------------------------------------- */
/* Database Schema                                                        */
/* --------------------------------------------------------------------- */

export type Database = {
  public: {
    Tables: {
      /* ---------------------------------------------------------------- */
      /* Orders                                                           */
      /* ---------------------------------------------------------------- */

      orders: {
        Row: {
          /**
           * Internal Money Records order ID.
           *
           * Example:
           * ord_4d314c9914df0ecce3514de7
           */
          id: string;

          /**
           * Customer-facing order number.
           *
           * Example:
           * MR-20260804-A42C17F3
           */
          order_number: string;

          /**
           * Checkout and order schema version.
           */
          schema_version: number;

          /**
           * Hash of the validated checkout request.
           */
          request_hash: string;

          /**
           * Stable key used to prevent duplicate Stripe Checkout Sessions.
           */
          idempotency_key: string;

          /**
           * Identifies which website or integration created the order.
           */
          source: string;

          /**
           * True when the connected Stripe session was created in live mode.
           */
          livemode: boolean;

          status:
            Database["public"]["Enums"]["order_status"];

          payment_status:
            Database["public"]["Enums"]["payment_status"];

          intake_status:
            Database["public"]["Enums"]["intake_status"];

          fulfillment_status:
            Database["public"]["Enums"]["fulfillment_status"];

          currency: string;

          item_count: number;

          subtotal_cents: number;

          discount_cents: number;

          tax_cents: number;

          processing_fee_cents: number;

          total_cents: number;

          customer_first_name: string;

          customer_last_name: string;

          customer_email: string;

          customer_phone: string;

          customer_company_name: string | null;

          customer_country: string;

          customer_region: string | null;

          /**
           * Denormalized artist name for dashboards, email, and lookup.
           */
          artist_name: string;

          /**
           * Denormalized release title for dashboards and lookup.
           */
          release_title: string;

          stripe_checkout_session_id: string | null;

          stripe_payment_intent_id: string | null;

          stripe_customer_id: string | null;

          receipt_url: string | null;

          /**
           * Current Stripe Checkout Session expiration time.
           */
          checkout_expires_at: string | null;

          /**
           * Internal Money Records operations notes.
           *
           * Never display this directly to customers.
           */
          internal_notes: string | null;

          /**
           * Optional customer-facing order or campaign message.
           */
          customer_message: string | null;

          created_at: string;

          updated_at: string;

          paid_at: string | null;

          approved_at: string | null;

          started_at: string | null;

          completed_at: string | null;

          cancelled_at: string | null;

          refunded_at: string | null;
        };

        Insert: {
          id: string;

          order_number: string;

          schema_version?: number;

          request_hash: string;

          idempotency_key: string;

          source?: string;

          livemode?: boolean;

          status?:
            Database["public"]["Enums"]["order_status"];

          payment_status?:
            Database["public"]["Enums"]["payment_status"];

          intake_status?:
            Database["public"]["Enums"]["intake_status"];

          fulfillment_status?:
            Database["public"]["Enums"]["fulfillment_status"];

          currency?: string;

          item_count?: number;

          subtotal_cents?: number;

          discount_cents?: number;

          tax_cents?: number;

          processing_fee_cents?: number;

          total_cents?: number;

          customer_first_name: string;

          customer_last_name: string;

          customer_email: string;

          customer_phone: string;

          customer_company_name?: string | null;

          customer_country: string;

          customer_region?: string | null;

          artist_name: string;

          release_title: string;

          stripe_checkout_session_id?: string | null;

          stripe_payment_intent_id?: string | null;

          stripe_customer_id?: string | null;

          receipt_url?: string | null;

          checkout_expires_at?: string | null;

          internal_notes?: string | null;

          customer_message?: string | null;

          created_at?: string;

          updated_at?: string;

          paid_at?: string | null;

          approved_at?: string | null;

          started_at?: string | null;

          completed_at?: string | null;

          cancelled_at?: string | null;

          refunded_at?: string | null;
        };

        Update: {
          id?: string;

          order_number?: string;

          schema_version?: number;

          request_hash?: string;

          idempotency_key?: string;

          source?: string;

          livemode?: boolean;

          status?:
            Database["public"]["Enums"]["order_status"];

          payment_status?:
            Database["public"]["Enums"]["payment_status"];

          intake_status?:
            Database["public"]["Enums"]["intake_status"];

          fulfillment_status?:
            Database["public"]["Enums"]["fulfillment_status"];

          currency?: string;

          item_count?: number;

          subtotal_cents?: number;

          discount_cents?: number;

          tax_cents?: number;

          processing_fee_cents?: number;

          total_cents?: number;

          customer_first_name?: string;

          customer_last_name?: string;

          customer_email?: string;

          customer_phone?: string;

          customer_company_name?: string | null;

          customer_country?: string;

          customer_region?: string | null;

          artist_name?: string;

          release_title?: string;

          stripe_checkout_session_id?: string | null;

          stripe_payment_intent_id?: string | null;

          stripe_customer_id?: string | null;

          receipt_url?: string | null;

          checkout_expires_at?: string | null;

          internal_notes?: string | null;

          customer_message?: string | null;

          created_at?: string;

          updated_at?: string;

          paid_at?: string | null;

          approved_at?: string | null;

          started_at?: string | null;

          completed_at?: string | null;

          cancelled_at?: string | null;

          refunded_at?: string | null;
        };

        Relationships: [];
      };

      /* ---------------------------------------------------------------- */
      /* Order Items                                                      */
      /* ---------------------------------------------------------------- */

      order_items: {
        Row: {
          /**
           * UUID generated by the database.
           */
          id: string;

          order_id: string;

          sku: string;

          campaign_id: string;

          campaign_slug: string;

          campaign_href: string;

          campaign_name: string;

          campaign_short_name: string;

          campaign_target_label: string;

          platform_slug: string;

          platform_name: string;

          platform_short_name: string;

          unit_amount_cents: number;

          quantity: number;

          total_amount_cents: number;

          currency: string;

          stripe_price_id: string | null;

          stripe_product_id: string | null;

          price_source:
            Database["public"]["Enums"]["stripe_price_source"];

          /**
           * Platform-specific URL submitted for this campaign.
           */
          campaign_url: string | null;

          /**
           * Instructions that apply only to this campaign item.
           */
          instructions: string | null;

          created_at: string;

          updated_at: string;
        };

        Insert: {
          id?: string;

          order_id: string;

          sku: string;

          campaign_id: string;

          campaign_slug: string;

          campaign_href: string;

          campaign_name: string;

          campaign_short_name: string;

          campaign_target_label: string;

          platform_slug: string;

          platform_name: string;

          platform_short_name: string;

          unit_amount_cents: number;

          quantity?: number;

          total_amount_cents: number;

          currency?: string;

          stripe_price_id?: string | null;

          stripe_product_id?: string | null;

          price_source:
            Database["public"]["Enums"]["stripe_price_source"];

          campaign_url?: string | null;

          instructions?: string | null;

          created_at?: string;

          updated_at?: string;
        };

        Update: {
          id?: string;

          order_id?: string;

          sku?: string;

          campaign_id?: string;

          campaign_slug?: string;

          campaign_href?: string;

          campaign_name?: string;

          campaign_short_name?: string;

          campaign_target_label?: string;

          platform_slug?: string;

          platform_name?: string;

          platform_short_name?: string;

          unit_amount_cents?: number;

          quantity?: number;

          total_amount_cents?: number;

          currency?: string;

          stripe_price_id?: string | null;

          stripe_product_id?: string | null;

          price_source?:
            Database["public"]["Enums"]["stripe_price_source"];

          campaign_url?: string | null;

          instructions?: string | null;

          created_at?: string;

          updated_at?: string;
        };

        Relationships: [
          {
            foreignKeyName:
              "order_items_order_id_fkey";

            columns: [
              "order_id",
            ];

            isOneToOne: false;

            referencedRelation:
              "orders";

            referencedColumns: [
              "id",
            ];
          },
        ];
      };

      /* ---------------------------------------------------------------- */
      /* Campaign Intakes                                                 */
      /* ---------------------------------------------------------------- */

      campaign_intakes: {
        Row: {
          /**
           * UUID generated by the database.
           */
          id: string;

          /**
           * Each order should have one primary intake record.
           */
          order_id: string;

          status:
            Database["public"]["Enums"]["intake_status"];

          /**
           * Complete purchaser contact object.
           */
          customer: Json;

          /**
           * Complete artist profile object.
           */
          artist: Json;

          /**
           * Complete release-details object.
           */
          release: Json;

          /**
           * Campaign goals, markets, audience, dates, and notes.
           */
          preferences: Json;

          /**
           * Submitted creative and promotional asset links.
           */
          assets: Json;

          /**
           * Campaign-specific URLs and instructions by SKU.
           */
          campaign_items: Json;

          /**
           * Required checkout agreements and optional marketing consent.
           */
          agreements: Json;

          /**
           * Optional internal review notes.
           *
           * Never display directly to customers.
           */
          review_notes: string | null;

          /**
           * Optional customer-facing request for corrections.
           */
          changes_requested_message: string | null;

          submitted_at: string;

          reviewed_at: string | null;

          changes_requested_at: string | null;

          approved_at: string | null;

          created_at: string;

          updated_at: string;
        };

        Insert: {
          id?: string;

          order_id: string;

          status?:
            Database["public"]["Enums"]["intake_status"];

          customer: Json;

          artist: Json;

          release: Json;

          preferences: Json;

          assets: Json;

          campaign_items: Json;

          agreements: Json;

          review_notes?: string | null;

          changes_requested_message?: string | null;

          submitted_at?: string;

          reviewed_at?: string | null;

          changes_requested_at?: string | null;

          approved_at?: string | null;

          created_at?: string;

          updated_at?: string;
        };

        Update: {
          id?: string;

          order_id?: string;

          status?:
            Database["public"]["Enums"]["intake_status"];

          customer?: Json;

          artist?: Json;

          release?: Json;

          preferences?: Json;

          assets?: Json;

          campaign_items?: Json;

          agreements?: Json;

          review_notes?: string | null;

          changes_requested_message?: string | null;

          submitted_at?: string;

          reviewed_at?: string | null;

          changes_requested_at?: string | null;

          approved_at?: string | null;

          created_at?: string;

          updated_at?: string;
        };

        Relationships: [
          {
            foreignKeyName:
              "campaign_intakes_order_id_fkey";

            columns: [
              "order_id",
            ];

            isOneToOne: true;

            referencedRelation:
              "orders";

            referencedColumns: [
              "id",
            ];
          },
        ];
      };

      /* ---------------------------------------------------------------- */
      /* Order Events                                                     */
      /* ---------------------------------------------------------------- */

      order_events: {
        Row: {
          /**
           * UUID generated by the database.
           */
          id: string;

          order_id: string;

          order_number: string;

          type:
            Database["public"]["Enums"]["order_event_type"];

          /**
           * Event provider.
           *
           * Currently Stripe.
           */
          provider:
            Database["public"]["Enums"]["order_event_provider"];

          /**
           * Unique Stripe event ID used for webhook idempotency.
           *
           * Example:
           * evt_123
           */
          provider_event_id: string | null;

          /**
           * Exact Stripe event name.
           *
           * Example:
           * checkout.session.completed
           */
          provider_event_type: string | null;

          checkout_session_id: string | null;

          payment_intent_id: string | null;

          customer_id: string | null;

          payment_status: string | null;

          checkout_status: string | null;

          amount_total_cents: number | null;

          refunded_amount_cents: number | null;

          currency: string | null;

          campaign_count: number | null;

          campaign_skus: string[];

          livemode: boolean;

          /**
           * Safe event description for order history.
           */
          message: string;

          /**
           * Safe event details or provider snapshot.
           *
           * Do not save card details, secrets, or unrestricted raw payloads.
           */
          payload: Json | null;

          /**
           * True after the event has been successfully applied to the order.
           */
          processed: boolean;

          processed_at: string | null;

          created_at: string;
        };

        Insert: {
          id?: string;

          order_id: string;

          order_number: string;

          type:
            Database["public"]["Enums"]["order_event_type"];

          provider?:
            Database["public"]["Enums"]["order_event_provider"];

          provider_event_id?: string | null;

          provider_event_type?: string | null;

          checkout_session_id?: string | null;

          payment_intent_id?: string | null;

          customer_id?: string | null;

          payment_status?: string | null;

          checkout_status?: string | null;

          amount_total_cents?: number | null;

          refunded_amount_cents?: number | null;

          currency?: string | null;

          campaign_count?: number | null;

          campaign_skus?: string[];

          livemode?: boolean;

          message: string;

          payload?: Json | null;

          processed?: boolean;

          processed_at?: string | null;

          created_at?: string;
        };

        Update: {
          id?: string;

          order_id?: string;

          order_number?: string;

          type?:
            Database["public"]["Enums"]["order_event_type"];

          provider?:
            Database["public"]["Enums"]["order_event_provider"];

          provider_event_id?: string | null;

          provider_event_type?: string | null;

          checkout_session_id?: string | null;

          payment_intent_id?: string | null;

          customer_id?: string | null;

          payment_status?: string | null;

          checkout_status?: string | null;

          amount_total_cents?: number | null;

          refunded_amount_cents?: number | null;

          currency?: string | null;

          campaign_count?: number | null;

          campaign_skus?: string[];

          livemode?: boolean;

          message?: string;

          payload?: Json | null;

          processed?: boolean;

          processed_at?: string | null;

          created_at?: string;
        };

        Relationships: [
          {
            foreignKeyName:
              "order_events_order_id_fkey";

            columns: [
              "order_id",
            ];

            isOneToOne: false;

            referencedRelation:
              "orders";

            referencedColumns: [
              "id",
            ];
          },
        ];
      };
    };

    /* ------------------------------------------------------------------ */
    /* Views                                                              */
    /* ------------------------------------------------------------------ */

    Views: {
      [_ in never]: never;
    };

    /* ------------------------------------------------------------------ */
    /* Functions                                                          */
    /* ------------------------------------------------------------------ */

    Functions: {
      [_ in never]: never;
    };

    /* ------------------------------------------------------------------ */
    /* Enums                                                              */
    /* ------------------------------------------------------------------ */

    Enums: {
      order_status:
        | "draft"
        | "pending-payment"
        | "paid"
        | "under-review"
        | "intake-required"
        | "approved"
        | "in-progress"
        | "completed"
        | "cancelled"
        | "refunded"
        | "partially-refunded"
        | "failed";

      payment_status:
        | "unpaid"
        | "pending"
        | "processing"
        | "paid"
        | "failed"
        | "cancelled"
        | "refunded"
        | "partially-refunded";

      intake_status:
        | "not-started"
        | "incomplete"
        | "submitted"
        | "under-review"
        | "changes-requested"
        | "approved";

      fulfillment_status:
        | "not-started"
        | "awaiting-intake"
        | "awaiting-review"
        | "scheduled"
        | "in-progress"
        | "paused"
        | "completed"
        | "cancelled";

      order_event_type:
        | "checkout-created"
        | "checkout-completed"
        | "payment-processing"
        | "payment-succeeded"
        | "payment-failed"
        | "checkout-expired"
        | "order-refunded"
        | "order-partially-refunded";

      order_event_provider:
        | "stripe"
        | "money-records";

      stripe_price_source:
        | "stored-price"
        | "inline-price";
    };

    /* ------------------------------------------------------------------ */
    /* Composite Types                                                    */
    /* ------------------------------------------------------------------ */

    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

/* --------------------------------------------------------------------- */
/* Schema Helpers                                                         */
/* --------------------------------------------------------------------- */

type PublicSchema =
  Database["public"];

export type PublicTableName =
  keyof PublicSchema["Tables"];

export type PublicEnumName =
  keyof PublicSchema["Enums"];

/**
 * Returns the Row type for a public database table.
 *
 * Example:
 *
 * type Order = Tables<"orders">;
 */
export type Tables<
  TableName extends PublicTableName,
> =
  PublicSchema["Tables"][TableName]["Row"];

/**
 * Returns the Insert type for a public database table.
 *
 * Example:
 *
 * type NewOrder = TablesInsert<"orders">;
 */
export type TablesInsert<
  TableName extends PublicTableName,
> =
  PublicSchema["Tables"][TableName]["Insert"];

/**
 * Returns the Update type for a public database table.
 *
 * Example:
 *
 * type OrderUpdate = TablesUpdate<"orders">;
 */
export type TablesUpdate<
  TableName extends PublicTableName,
> =
  PublicSchema["Tables"][TableName]["Update"];

/**
 * Returns a database enum union.
 *
 * Example:
 *
 * type OrderStatus = Enums<"order_status">;
 */
export type Enums<
  EnumName extends PublicEnumName,
> =
  PublicSchema["Enums"][EnumName];

/* --------------------------------------------------------------------- */
/* Named Table Types                                                      */
/* --------------------------------------------------------------------- */

export type OrderRow =
  Tables<"orders">;

export type OrderInsert =
  TablesInsert<"orders">;

export type OrderUpdate =
  TablesUpdate<"orders">;

export type OrderItemRow =
  Tables<"order_items">;

export type OrderItemInsert =
  TablesInsert<"order_items">;

export type OrderItemUpdate =
  TablesUpdate<"order_items">;

export type CampaignIntakeRow =
  Tables<"campaign_intakes">;

export type CampaignIntakeInsert =
  TablesInsert<"campaign_intakes">;

export type CampaignIntakeUpdate =
  TablesUpdate<"campaign_intakes">;

export type OrderEventRow =
  Tables<"order_events">;

export type OrderEventInsert =
  TablesInsert<"order_events">;

export type OrderEventUpdate =
  TablesUpdate<"order_events">;

/* --------------------------------------------------------------------- */
/* Named Enum Types                                                       */
/* --------------------------------------------------------------------- */

export type DatabaseOrderStatus =
  Enums<"order_status">;

export type DatabasePaymentStatus =
  Enums<"payment_status">;

export type DatabaseIntakeStatus =
  Enums<"intake_status">;

export type DatabaseFulfillmentStatus =
  Enums<"fulfillment_status">;

export type DatabaseOrderEventType =
  Enums<"order_event_type">;

export type DatabaseOrderEventProvider =
  Enums<"order_event_provider">;

export type DatabaseStripePriceSource =
  Enums<"stripe_price_source">;

/* --------------------------------------------------------------------- */
/* Query Result Types                                                     */
/* --------------------------------------------------------------------- */

/**
 * Complete order query shape used by order dashboards, lookup pages, and
 * the checkout confirmation page.
 */
export type OrderWithRelations =
  OrderRow & {
    order_items: OrderItemRow[];
    campaign_intakes:
      | CampaignIntakeRow
      | null;
    order_events: OrderEventRow[];
  };

/**
 * Customer-safe order shape.
 *
 * Internal notes and private event payloads should be removed before
 * returning an order to a browser.
 */
export type PublicOrderRecord = Omit<
  OrderRow,
  | "internal_notes"
  | "request_hash"
  | "idempotency_key"
> & {
  order_items: OrderItemRow[];

  campaign_intake: Pick<
    CampaignIntakeRow,
    | "status"
    | "submitted_at"
    | "reviewed_at"
    | "changes_requested_message"
    | "changes_requested_at"
    | "approved_at"
  > | null;

  order_events: Array<
    Pick<
      OrderEventRow,
      | "id"
      | "type"
      | "message"
      | "created_at"
      | "processed_at"
    >
  >;
};

/* --------------------------------------------------------------------- */
/* Database Constants                                                     */
/* --------------------------------------------------------------------- */

export const DATABASE_TABLES = {
  orders:
    "orders",

  orderItems:
    "order_items",

  campaignIntakes:
    "campaign_intakes",

  orderEvents:
    "order_events",
} as const;

export const DEFAULT_DATABASE_ORDER_STATUS:
  DatabaseOrderStatus =
    "pending-payment";

export const DEFAULT_DATABASE_PAYMENT_STATUS:
  DatabasePaymentStatus =
    "unpaid";

export const DEFAULT_DATABASE_INTAKE_STATUS:
  DatabaseIntakeStatus =
    "submitted";

export const DEFAULT_DATABASE_FULFILLMENT_STATUS:
  DatabaseFulfillmentStatus =
    "awaiting-review";

export const DEFAULT_ORDER_EVENT_PROVIDER:
  DatabaseOrderEventProvider =
    "stripe";