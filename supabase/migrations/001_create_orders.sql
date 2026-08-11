-- ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
-- ┃ Money Records — Orders Database Migration                            ┃
-- ┃ File   : supabase/migrations/001_create_orders.sql                   ┃
-- ┃ Role   : Orders, campaign intake, line items, events, RLS, indexes   ┃
-- ┃ Status : Production Ready                                            ┃
-- ┃ License: Proprietary — Money Records LLC                             ┃
-- ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

begin;

/* --------------------------------------------------------------------- */
/* Required Extensions                                                   */
/* --------------------------------------------------------------------- */

create extension if not exists pgcrypto;

/* --------------------------------------------------------------------- */
/* Database Enums                                                        */
/* --------------------------------------------------------------------- */

create type public.order_status as enum (
  'draft',
  'pending-payment',
  'paid',
  'under-review',
  'intake-required',
  'approved',
  'in-progress',
  'completed',
  'cancelled',
  'refunded',
  'partially-refunded',
  'failed'
);

create type public.payment_status as enum (
  'unpaid',
  'pending',
  'processing',
  'paid',
  'failed',
  'cancelled',
  'refunded',
  'partially-refunded'
);

create type public.intake_status as enum (
  'not-started',
  'incomplete',
  'submitted',
  'under-review',
  'changes-requested',
  'approved'
);

create type public.fulfillment_status as enum (
  'not-started',
  'awaiting-intake',
  'awaiting-review',
  'scheduled',
  'in-progress',
  'paused',
  'completed',
  'cancelled'
);

create type public.order_event_type as enum (
  'checkout-created',
  'checkout-completed',
  'payment-processing',
  'payment-succeeded',
  'payment-failed',
  'checkout-expired',
  'order-refunded',
  'order-partially-refunded'
);

create type public.order_event_provider as enum (
  'stripe',
  'money-records'
);

create type public.stripe_price_source as enum (
  'stored-price',
  'inline-price'
);

/* --------------------------------------------------------------------- */
/* Orders Table                                                          */
/* --------------------------------------------------------------------- */

create table public.orders (
  id text primary key,

  order_number text not null unique,

  schema_version integer not null default 1,

  request_hash text not null,

  idempotency_key text not null unique,

  source text not null default 'money-records-web',

  livemode boolean not null default false,

  status public.order_status
    not null
    default 'pending-payment',

  payment_status public.payment_status
    not null
    default 'unpaid',

  intake_status public.intake_status
    not null
    default 'submitted',

  fulfillment_status public.fulfillment_status
    not null
    default 'awaiting-review',

  currency text not null default 'USD',

  item_count integer not null default 0,

  subtotal_cents integer not null default 0,

  discount_cents integer not null default 0,

  tax_cents integer not null default 0,

  processing_fee_cents integer not null default 0,

  total_cents integer not null default 0,

  customer_first_name text not null,

  customer_last_name text not null,

  customer_email text not null,

  customer_phone text not null,

  customer_company_name text,

  customer_country text not null,

  customer_region text,

  artist_name text not null,

  release_title text not null,

  stripe_checkout_session_id text,

  stripe_payment_intent_id text,

  stripe_customer_id text,

  receipt_url text,

  checkout_expires_at timestamptz,

  internal_notes text,

  customer_message text,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  paid_at timestamptz,

  approved_at timestamptz,

  started_at timestamptz,

  completed_at timestamptz,

  cancelled_at timestamptz,

  refunded_at timestamptz,

  constraint orders_id_format_check
    check (
      id ~ '^ord_[a-f0-9]{28}$'
    ),

  constraint orders_order_number_format_check
    check (
      order_number ~ '^MR-[0-9]{8}-[A-Z0-9]{8}$'
    ),

  constraint orders_schema_version_check
    check (
      schema_version > 0
    ),

  constraint orders_request_hash_format_check
    check (
      request_hash ~ '^[a-f0-9]{64}$'
    ),

  constraint orders_source_not_blank_check
    check (
      length(trim(source)) > 0
    ),

  constraint orders_currency_format_check
    check (
      currency ~ '^[A-Z]{3}$'
    ),

  constraint orders_item_count_check
    check (
      item_count >= 0
    ),

  constraint orders_subtotal_cents_check
    check (
      subtotal_cents >= 0
    ),

  constraint orders_discount_cents_check
    check (
      discount_cents >= 0
      and discount_cents <= subtotal_cents
    ),

  constraint orders_tax_cents_check
    check (
      tax_cents >= 0
    ),

  constraint orders_processing_fee_cents_check
    check (
      processing_fee_cents >= 0
    ),

  constraint orders_total_cents_check
    check (
      total_cents >= 0
      and total_cents = (
        subtotal_cents
        - discount_cents
        + tax_cents
        + processing_fee_cents
      )
    ),

  constraint orders_customer_first_name_check
    check (
      length(trim(customer_first_name)) between 1 and 100
    ),

  constraint orders_customer_last_name_check
    check (
      length(trim(customer_last_name)) between 1 and 100
    ),

  constraint orders_customer_email_length_check
    check (
      length(customer_email) between 3 and 254
    ),

  constraint orders_customer_email_lowercase_check
    check (
      customer_email = lower(customer_email)
    ),

  constraint orders_customer_email_format_check
    check (
      customer_email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    ),

  constraint orders_customer_phone_length_check
    check (
      length(trim(customer_phone)) between 7 and 40
    ),

  constraint orders_customer_company_name_check
    check (
      customer_company_name is null
      or length(trim(customer_company_name)) between 1 and 160
    ),

  constraint orders_customer_country_check
    check (
      length(trim(customer_country)) between 1 and 120
    ),

  constraint orders_customer_region_check
    check (
      customer_region is null
      or length(trim(customer_region)) between 1 and 120
    ),

  constraint orders_artist_name_check
    check (
      length(trim(artist_name)) between 1 and 160
    ),

  constraint orders_release_title_check
    check (
      length(trim(release_title)) between 1 and 200
    ),

  constraint orders_checkout_session_format_check
    check (
      stripe_checkout_session_id is null
      or stripe_checkout_session_id ~ '^cs_'
    ),

  constraint orders_payment_intent_format_check
    check (
      stripe_payment_intent_id is null
      or stripe_payment_intent_id ~ '^pi_'
    ),

  constraint orders_stripe_customer_format_check
    check (
      stripe_customer_id is null
      or stripe_customer_id ~ '^cus_'
    ),

  constraint orders_receipt_url_check
    check (
      receipt_url is null
      or receipt_url ~ '^https://'
    ),

  constraint orders_paid_at_check
    check (
      paid_at is null
      or paid_at >= created_at
    ),

  constraint orders_approved_at_check
    check (
      approved_at is null
      or approved_at >= created_at
    ),

  constraint orders_started_at_check
    check (
      started_at is null
      or started_at >= created_at
    ),

  constraint orders_completed_at_check
    check (
      completed_at is null
      or completed_at >= created_at
    ),

  constraint orders_cancelled_at_check
    check (
      cancelled_at is null
      or cancelled_at >= created_at
    ),

  constraint orders_refunded_at_check
    check (
      refunded_at is null
      or refunded_at >= created_at
    ),

  constraint orders_id_order_number_unique
    unique (
      id,
      order_number
    )
);

/* --------------------------------------------------------------------- */
/* Order Items Table                                                     */
/* --------------------------------------------------------------------- */

create table public.order_items (
  id uuid primary key default gen_random_uuid(),

  order_id text not null,

  sku text not null,

  campaign_id text not null,

  campaign_slug text not null,

  campaign_href text not null,

  campaign_name text not null,

  campaign_short_name text not null,

  campaign_target_label text not null,

  platform_slug text not null,

  platform_name text not null,

  platform_short_name text not null,

  unit_amount_cents integer not null,

  quantity integer not null default 1,

  total_amount_cents integer not null,

  currency text not null default 'USD',

  stripe_price_id text,

  stripe_product_id text,

  price_source public.stripe_price_source not null,

  campaign_url text,

  instructions text,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  constraint order_items_order_id_fkey
    foreign key (
      order_id
    )
    references public.orders (
      id
    )
    on update cascade
    on delete cascade,

  constraint order_items_order_id_sku_unique
    unique (
      order_id,
      sku
    ),

  constraint order_items_sku_format_check
    check (
      sku ~ '^[A-Z0-9][A-Z0-9_-]{2,119}$'
    ),

  constraint order_items_campaign_id_check
    check (
      length(trim(campaign_id)) between 1 and 160
    ),

  constraint order_items_campaign_slug_check
    check (
      length(trim(campaign_slug)) between 1 and 200
    ),

  constraint order_items_campaign_href_check
    check (
      length(trim(campaign_href)) between 1 and 500
    ),

  constraint order_items_campaign_name_check
    check (
      length(trim(campaign_name)) between 1 and 250
    ),

  constraint order_items_campaign_short_name_check
    check (
      length(trim(campaign_short_name)) between 1 and 250
    ),

  constraint order_items_campaign_target_label_check
    check (
      length(trim(campaign_target_label)) between 1 and 250
    ),

  constraint order_items_platform_slug_check
    check (
      length(trim(platform_slug)) between 1 and 160
    ),

  constraint order_items_platform_name_check
    check (
      length(trim(platform_name)) between 1 and 160
    ),

  constraint order_items_platform_short_name_check
    check (
      length(trim(platform_short_name)) between 1 and 160
    ),

  constraint order_items_unit_amount_check
    check (
      unit_amount_cents > 0
    ),

  constraint order_items_quantity_check
    check (
      quantity > 0
      and quantity <= 100
    ),

  constraint order_items_total_amount_check
    check (
      total_amount_cents > 0
      and total_amount_cents = unit_amount_cents * quantity
    ),

  constraint order_items_currency_format_check
    check (
      currency ~ '^[A-Z]{3}$'
    ),

  constraint order_items_stripe_price_format_check
    check (
      stripe_price_id is null
      or stripe_price_id ~ '^price_'
    ),

  constraint order_items_stripe_product_format_check
    check (
      stripe_product_id is null
      or stripe_product_id ~ '^prod_'
    ),

  constraint order_items_campaign_url_check
    check (
      campaign_url is null
      or (
        length(campaign_url) <= 2048
        and campaign_url ~ '^https?://'
      )
    ),

  constraint order_items_instructions_check
    check (
      instructions is null
      or length(instructions) <= 4000
    )
);

/* --------------------------------------------------------------------- */
/* Campaign Intakes Table                                                */
/* --------------------------------------------------------------------- */

create table public.campaign_intakes (
  id uuid primary key default gen_random_uuid(),

  order_id text not null unique,

  status public.intake_status
    not null
    default 'submitted',

  customer jsonb not null,

  artist jsonb not null,

  release jsonb not null,

  preferences jsonb not null,

  assets jsonb not null default '{}'::jsonb,

  campaign_items jsonb not null,

  agreements jsonb not null,

  review_notes text,

  changes_requested_message text,

  submitted_at timestamptz not null default now(),

  reviewed_at timestamptz,

  changes_requested_at timestamptz,

  approved_at timestamptz,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  constraint campaign_intakes_order_id_fkey
    foreign key (
      order_id
    )
    references public.orders (
      id
    )
    on update cascade
    on delete cascade,

  constraint campaign_intakes_customer_object_check
    check (
      jsonb_typeof(customer) = 'object'
    ),

  constraint campaign_intakes_artist_object_check
    check (
      jsonb_typeof(artist) = 'object'
    ),

  constraint campaign_intakes_release_object_check
    check (
      jsonb_typeof(release) = 'object'
    ),

  constraint campaign_intakes_preferences_object_check
    check (
      jsonb_typeof(preferences) = 'object'
    ),

  constraint campaign_intakes_assets_object_check
    check (
      jsonb_typeof(assets) = 'object'
    ),

  constraint campaign_intakes_campaign_items_array_check
    check (
      jsonb_typeof(campaign_items) = 'array'
    ),

  constraint campaign_intakes_agreements_object_check
    check (
      jsonb_typeof(agreements) = 'object'
    ),

  constraint campaign_intakes_review_notes_check
    check (
      review_notes is null
      or length(review_notes) <= 20000
    ),

  constraint campaign_intakes_changes_message_check
    check (
      changes_requested_message is null
      or length(changes_requested_message) <= 10000
    ),

  constraint campaign_intakes_reviewed_at_check
    check (
      reviewed_at is null
      or reviewed_at >= submitted_at
    ),

  constraint campaign_intakes_changes_requested_at_check
    check (
      changes_requested_at is null
      or changes_requested_at >= submitted_at
    ),

  constraint campaign_intakes_approved_at_check
    check (
      approved_at is null
      or approved_at >= submitted_at
    )
);

/* --------------------------------------------------------------------- */
/* Order Events Table                                                    */
/* --------------------------------------------------------------------- */

create table public.order_events (
  id uuid primary key default gen_random_uuid(),

  order_id text not null,

  order_number text not null,

  type public.order_event_type not null,

  provider public.order_event_provider
    not null
    default 'stripe',

  provider_event_id text,

  provider_event_type text,

  checkout_session_id text,

  payment_intent_id text,

  customer_id text,

  payment_status text,

  checkout_status text,

  amount_total_cents integer,

  refunded_amount_cents integer,

  currency text,

  campaign_count integer,

  campaign_skus text[] not null default '{}'::text[],

  livemode boolean not null default false,

  message text not null,

  payload jsonb,

  processed boolean not null default false,

  processed_at timestamptz,

  created_at timestamptz not null default now(),

  constraint order_events_order_reference_fkey
    foreign key (
      order_id,
      order_number
    )
    references public.orders (
      id,
      order_number
    )
    on update cascade
    on delete cascade,

  constraint order_events_provider_event_id_check
    check (
      provider_event_id is null
      or length(trim(provider_event_id)) between 1 and 255
    ),

  constraint order_events_provider_event_type_check
    check (
      provider_event_type is null
      or length(trim(provider_event_type)) between 1 and 255
    ),

  constraint order_events_checkout_session_format_check
    check (
      checkout_session_id is null
      or checkout_session_id ~ '^cs_'
    ),

  constraint order_events_payment_intent_format_check
    check (
      payment_intent_id is null
      or payment_intent_id ~ '^pi_'
    ),

  constraint order_events_customer_format_check
    check (
      customer_id is null
      or customer_id ~ '^cus_'
    ),

  constraint order_events_amount_total_check
    check (
      amount_total_cents is null
      or amount_total_cents >= 0
    ),

  constraint order_events_refunded_amount_check
    check (
      refunded_amount_cents is null
      or refunded_amount_cents >= 0
    ),

  constraint order_events_refund_not_above_total_check
    check (
      refunded_amount_cents is null
      or amount_total_cents is null
      or refunded_amount_cents <= amount_total_cents
    ),

  constraint order_events_currency_format_check
    check (
      currency is null
      or currency ~ '^[A-Z]{3}$'
    ),

  constraint order_events_campaign_count_check
    check (
      campaign_count is null
      or campaign_count >= 0
    ),

  constraint order_events_message_check
    check (
      length(trim(message)) between 1 and 2000
    ),

  constraint order_events_processed_at_check
    check (
      (
        processed = false
        and processed_at is null
      )
      or (
        processed = true
        and processed_at is not null
      )
    )
);

/* --------------------------------------------------------------------- */
/* Unique Stripe Reference Indexes                                       */
/* --------------------------------------------------------------------- */

create unique index orders_stripe_checkout_session_id_unique
  on public.orders (
    stripe_checkout_session_id
  )
  where stripe_checkout_session_id is not null;

create unique index orders_stripe_payment_intent_id_unique
  on public.orders (
    stripe_payment_intent_id
  )
  where stripe_payment_intent_id is not null;

create unique index order_events_provider_event_id_unique
  on public.order_events (
    provider_event_id
  )
  where provider_event_id is not null;

/* --------------------------------------------------------------------- */
/* Query Performance Indexes                                             */
/* --------------------------------------------------------------------- */

create index orders_created_at_idx
  on public.orders (
    created_at desc
  );

create index orders_customer_email_idx
  on public.orders (
    customer_email
  );

create index orders_status_created_at_idx
  on public.orders (
    status,
    created_at desc
  );

create index orders_payment_status_created_at_idx
  on public.orders (
    payment_status,
    created_at desc
  );

create index orders_intake_status_created_at_idx
  on public.orders (
    intake_status,
    created_at desc
  );

create index orders_fulfillment_status_created_at_idx
  on public.orders (
    fulfillment_status,
    created_at desc
  );

create index orders_artist_name_idx
  on public.orders (
    artist_name
  );

create index order_items_order_id_idx
  on public.order_items (
    order_id
  );

create index order_items_sku_idx
  on public.order_items (
    sku
  );

create index order_items_platform_slug_idx
  on public.order_items (
    platform_slug
  );

create index campaign_intakes_status_idx
  on public.campaign_intakes (
    status,
    submitted_at desc
  );

create index order_events_order_id_created_at_idx
  on public.order_events (
    order_id,
    created_at desc
  );

create index order_events_order_number_created_at_idx
  on public.order_events (
    order_number,
    created_at desc
  );

create index order_events_type_created_at_idx
  on public.order_events (
    type,
    created_at desc
  );

create index order_events_processed_created_at_idx
  on public.order_events (
    processed,
    created_at
  );

create index order_events_checkout_session_id_idx
  on public.order_events (
    checkout_session_id
  )
  where checkout_session_id is not null;

create index order_events_payment_intent_id_idx
  on public.order_events (
    payment_intent_id
  )
  where payment_intent_id is not null;

/* --------------------------------------------------------------------- */
/* Automatic Updated-At Function                                         */
/* --------------------------------------------------------------------- */

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

/* --------------------------------------------------------------------- */
/* Automatic Updated-At Triggers                                         */
/* --------------------------------------------------------------------- */

create trigger set_orders_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();

create trigger set_order_items_updated_at
before update on public.order_items
for each row
execute function public.set_updated_at();

create trigger set_campaign_intakes_updated_at
before update on public.campaign_intakes
for each row
execute function public.set_updated_at();

/* --------------------------------------------------------------------- */
/* Row-Level Security                                                    */
/* --------------------------------------------------------------------- */

/*
 * These tables contain private customer, artist, order, and payment data.
 *
 * No anon or authenticated policies are created. All application access
 * must come through trusted server routes using the Supabase secret or
 * service-role key.
 */

alter table public.orders
  enable row level security;

alter table public.order_items
  enable row level security;

alter table public.campaign_intakes
  enable row level security;

alter table public.order_events
  enable row level security;

/* --------------------------------------------------------------------- */
/* Browser Role Restrictions                                             */
/* --------------------------------------------------------------------- */

revoke all
  on table public.orders
  from anon, authenticated;

revoke all
  on table public.order_items
  from anon, authenticated;

revoke all
  on table public.campaign_intakes
  from anon, authenticated;

revoke all
  on table public.order_events
  from anon, authenticated;

/* --------------------------------------------------------------------- */
/* Server Role Permissions                                               */
/* --------------------------------------------------------------------- */

grant usage
  on schema public
  to service_role;

grant select, insert, update, delete
  on table public.orders
  to service_role;

grant select, insert, update, delete
  on table public.order_items
  to service_role;

grant select, insert, update, delete
  on table public.campaign_intakes
  to service_role;

grant select, insert, update, delete
  on table public.order_events
  to service_role;

/* --------------------------------------------------------------------- */
/* Table Documentation                                                   */
/* --------------------------------------------------------------------- */

comment on table public.orders is
  'Money Records customer orders, totals, Stripe references, and workflow statuses.';

comment on table public.order_items is
  'Trusted campaign services and server-verified prices belonging to an order.';

comment on table public.campaign_intakes is
  'Private artist, release, campaign, asset, and agreement information submitted at checkout.';

comment on table public.order_events is
  'Idempotent Stripe and Money Records order-history events.';

comment on column public.orders.request_hash is
  'SHA-256 hash of the normalized trusted checkout request.';

comment on column public.orders.idempotency_key is
  'Stable key used to prevent duplicate Stripe Checkout Session creation.';

comment on column public.order_events.provider_event_id is
  'Unique provider event identifier used to prevent duplicate webhook processing.';

comment on column public.order_events.payload is
  'Safe operational event data only; never store card data, API secrets, or unrestricted webhook payloads.';

commit;