/**
 * TableDemo — single file, all table demos swappable via a side-drawer menu.
 *
 * Demos:
 *   1. Products      — thumbnail, badges, star rating, status pill
 *   2. Orders        — customer avatar, payment icon, status
 *   3. Users         — role badges, joined date, selectable
 *   4. API Paginated — simulated REST, server-side sort + filter
 *   5. Realm         — synchronous local query pattern
 *   6. Variants      — striped, dark theme, empty state
 */

import React, { useState, useCallback } from "react";
import { useWindowDimensions, ScrollView } from "react-native";
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledHeader,
  StyledBadge,
  StyledImage,
  StyledText,
  StyledPressable,
  StyledCard,
  StyledDivider,
  Stack,
  theme,
  palettes,
  StyledTable, type TableColumn,
  usePaginatedQuery,
  StyledPage
} from "fluent-styles";


// ─────────────────────────────────────────────────────────────────────────────
// SHARED HELPERS
// ─────────────────────────────────────────────────────────────────────────────

type BadgeStyle = { bg: string; color: string };

const fmt      = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
const currency = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

function Pill({ label, style }: { label: string; style: BadgeStyle }) {
  return (
    <StyledBadge
      backgroundColor={style.bg} color={style.color}
      paddingHorizontal={10} paddingVertical={4}
      borderRadius={999} fontSize={11} fontWeight="700"
    >
      {label}
    </StyledBadge>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA & COLUMNS — PRODUCTS
// ─────────────────────────────────────────────────────────────────────────────

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";
type Category    = "Electronics" | "Clothing" | "Books" | "Home" | "Sports";

interface ProductRow {
  id: number; image: string; name: string; sku: string;
  category: Category; price: number; cost: number;
  stock: number; stockStatus: StockStatus; sales: number; rating: number;
}

const STOCK_STYLE: Record<StockStatus, BadgeStyle> = {
  "In Stock":     { bg: "#dcfce7", color: "#16a34a" },
  "Low Stock":    { bg: "#fef9c3", color: "#ca8a04" },
  "Out of Stock": { bg: "#fee2e2", color: "#dc2626" },
};

const CAT_STYLE: Record<Category, BadgeStyle> = {
  Electronics: { bg: palettes.indigo[50],  color: palettes.indigo[600] },
  Clothing:    { bg: palettes.rose[50],    color: palettes.rose[600] },
  Books:       { bg: palettes.amber[50],   color: palettes.amber[600] },
  Home:        { bg: palettes.teal[50],    color: palettes.teal[600] },
  Sports:      { bg: "#f0fdf4",            color: "#16a34a" },
};

const PRODUCTS: ProductRow[] = [
  { id: 1,  image: "https://picsum.photos/seed/pl1/80/80",  name: "Wireless Noise-Cancelling Headphones", sku: "ELEC-001", category: "Electronics", price: 299, cost: 120, stock: 142, stockStatus: "In Stock",     sales: 2840, rating: 4.7 },
  { id: 2,  image: "https://picsum.photos/seed/pl2/80/80",  name: "Slim Fit Merino Wool Jumper",          sku: "CLO-044",  category: "Clothing",    price: 89,  cost: 28,  stock: 67,  stockStatus: "In Stock",     sales: 1120, rating: 4.4 },
  { id: 3,  image: "https://picsum.photos/seed/pl3/80/80",  name: "The Pragmatic Programmer",             sku: "BOOK-112", category: "Books",       price: 49,  cost: 12,  stock: 8,   stockStatus: "Low Stock",    sales: 3400, rating: 4.9 },
  { id: 4,  image: "https://picsum.photos/seed/pl4/80/80",  name: "Smart LED Desk Lamp",                  sku: "HOME-078", category: "Home",        price: 59,  cost: 18,  stock: 0,   stockStatus: "Out of Stock", sales: 740,  rating: 4.2 },
  { id: 5,  image: "https://picsum.photos/seed/pl5/80/80",  name: "Yoga Mat Pro 6mm",                     sku: "SPRT-019", category: "Sports",      price: 45,  cost: 14,  stock: 230, stockStatus: "In Stock",     sales: 1870, rating: 4.6 },
  { id: 6,  image: "https://picsum.photos/seed/pl6/80/80",  name: "Mechanical Keyboard TKL",              sku: "ELEC-088", category: "Electronics", price: 149, cost: 58,  stock: 34,  stockStatus: "Low Stock",    sales: 980,  rating: 4.5 },
  { id: 7,  image: "https://picsum.photos/seed/pl7/80/80",  name: "Linen Shirt – Relaxed Fit",            sku: "CLO-091",  category: "Clothing",    price: 65,  cost: 20,  stock: 188, stockStatus: "In Stock",     sales: 560,  rating: 4.1 },
  { id: 8,  image: "https://picsum.photos/seed/pl8/80/80",  name: "Atomic Habits",                        sku: "BOOK-008", category: "Books",       price: 18,  cost: 5,   stock: 0,   stockStatus: "Out of Stock", sales: 6200, rating: 4.8 },
];

const PRODUCT_COLS: TableColumn<ProductRow>[] = [
  {
    key: "name", title: "Product",
    render: (_, row) => (
      <Stack horizontal alignItems="center" gap={12} flex={1}>
        <StyledImage source={{ uri: row.image }} width={40} height={40} borderRadius={8} />
        <Stack gap={2} flex={1}>
          <StyledText fontSize={13} fontWeight="700" color={theme.colors.gray[900]} numberOfLines={1}>{row.name}</StyledText>
          <StyledText fontSize={11} color={theme.colors.gray[400]}>{row.sku}</StyledText>
        </Stack>
      </Stack>
    ),
  },
  { key: "category", title: "Category", width: 110, align: "center",
    render: (v) => <Pill label={v} style={CAT_STYLE[v as Category]} /> },
  { key: "price", title: "Price", width: 80, align: "right", sortable: true,
    render: (v) => <StyledText fontSize={13} fontWeight="700" color={theme.colors.gray[900]}>${v}</StyledText> },
  { key: "stock", title: "Stock", width: 80, align: "center", sortable: true,
    render: (v, row) => (
      <Stack alignItems="center" gap={3}>
        <StyledText fontSize={13} fontWeight="700" color={row.stock === 0 ? "#dc2626" : theme.colors.gray[900]}>{v}</StyledText>
        <Pill label={row.stockStatus} style={STOCK_STYLE[row.stockStatus]} />
      </Stack>
    ),
  },
  { key: "sales", title: "Sales", width: 70, align: "center", sortable: true,
    render: (v) => <StyledText fontSize={13} fontWeight="600" color={theme.colors.gray[700]}>{fmt(v)}</StyledText> },
  { key: "rating", title: "Rating", width: 80, align: "center", sortable: true,
    render: (v) => (
      <Stack horizontal alignItems="center" gap={3}>
        <StyledText fontSize={13} color="#f59e0b">★</StyledText>
        <StyledText fontSize={13} fontWeight="700" color="#f59e0b">{v}</StyledText>
      </Stack>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATA & COLUMNS — ORDERS
// ─────────────────────────────────────────────────────────────────────────────

type OrderStatus  = "Delivered" | "Shipped" | "Processing" | "Cancelled" | "Refunded";
type PaymentMethod = "Card" | "PayPal" | "Apple Pay" | "Crypto";

interface OrderRow {
  id: number; orderId: string; customer: string; avatar: string;
  items: number; total: number; date: string;
  status: OrderStatus; payment: PaymentMethod;
}

const ORDER_STATUS: Record<OrderStatus, BadgeStyle> = {
  Delivered:  { bg: "#dcfce7", color: "#16a34a" },
  Shipped:    { bg: "#dbeafe", color: "#2563eb" },
  Processing: { bg: "#fef9c3", color: "#ca8a04" },
  Cancelled:  { bg: "#fee2e2", color: "#dc2626" },
  Refunded:   { bg: "#f3e8ff", color: "#9333ea" },
};

const PAY_ICON: Record<PaymentMethod, string> = {
  Card: "💳", PayPal: "🅿️", "Apple Pay": "🍎", Crypto: "₿",
};

const ORDERS: OrderRow[] = [
  { id: 1,  orderId: "#ORD-4821", customer: "Alex Morgan",    avatar: "AM", items: 3, total: 247.00, date: "Apr 5, 2026",  status: "Delivered",  payment: "Card" },
  { id: 2,  orderId: "#ORD-4820", customer: "Priya Kapoor",   avatar: "PK", items: 1, total: 99.00,  date: "Apr 5, 2026",  status: "Shipped",    payment: "PayPal" },
  { id: 3,  orderId: "#ORD-4819", customer: "James Li",       avatar: "JL", items: 5, total: 512.50, date: "Apr 4, 2026",  status: "Processing", payment: "Apple Pay" },
  { id: 4,  orderId: "#ORD-4818", customer: "Sara Okonkwo",   avatar: "SO", items: 2, total: 188.00, date: "Apr 4, 2026",  status: "Delivered",  payment: "Card" },
  { id: 5,  orderId: "#ORD-4817", customer: "Tom Müller",     avatar: "TM", items: 1, total: 39.00,  date: "Apr 3, 2026",  status: "Cancelled",  payment: "Card" },
  { id: 6,  orderId: "#ORD-4816", customer: "Yuki Tanaka",    avatar: "YT", items: 4, total: 376.00, date: "Apr 3, 2026",  status: "Shipped",    payment: "Crypto" },
  { id: 7,  orderId: "#ORD-4815", customer: "Maria Santos",   avatar: "MS", items: 2, total: 158.00, date: "Apr 2, 2026",  status: "Delivered",  payment: "PayPal" },
  { id: 8,  orderId: "#ORD-4814", customer: "Chris Blake",    avatar: "CB", items: 1, total: 119.00, date: "Apr 2, 2026",  status: "Refunded",   payment: "Card" },
  { id: 9,  orderId: "#ORD-4813", customer: "Fatima Al-Amin", avatar: "FA", items: 6, total: 634.00, date: "Apr 1, 2026",  status: "Delivered",  payment: "Apple Pay" },
  { id: 10, orderId: "#ORD-4812", customer: "Leo Andersen",   avatar: "LA", items: 2, total: 228.00, date: "Apr 1, 2026",  status: "Processing", payment: "Card" },
  { id: 11, orderId: "#ORD-4811", customer: "Nina Patel",     avatar: "NP", items: 3, total: 307.50, date: "Mar 31, 2026", status: "Shipped",    payment: "PayPal" },
  { id: 12, orderId: "#ORD-4810", customer: "David Osei",     avatar: "DO", items: 1, total: 49.00,  date: "Mar 31, 2026", status: "Cancelled",  payment: "Card" },
];

const ORDER_COLS: TableColumn<OrderRow>[] = [
  { key: "orderId",  title: "Order",   width: 110,
    render: (v) => <StyledText fontSize={13} fontWeight="700" color={palettes.indigo[600]}>{v}</StyledText> },
  { key: "customer", title: "Customer",
    render: (v, row) => (
      <Stack horizontal alignItems="center" gap={10}>
        <Stack width={32} height={32} borderRadius={16} backgroundColor={palettes.indigo[100]} alignItems="center" justifyContent="center">
          <StyledText fontSize={11} fontWeight="700" color={palettes.indigo[600]}>{row.avatar}</StyledText>
        </Stack>
        <StyledText fontSize={13} fontWeight="600" color={theme.colors.gray[900]} numberOfLines={1}>{v}</StyledText>
      </Stack>
    ),
  },
  { key: "items",   title: "Items",   width: 60,  align: "center", sortable: true,
    render: (v) => <StyledText fontSize={13} color={theme.colors.gray[600]}>{v}</StyledText> },
  { key: "total",   title: "Total",   width: 110, align: "right",  sortable: true,
    render: (v) => <StyledText fontSize={13} fontWeight="700" color={theme.colors.gray[900]}>{currency(v)}</StyledText> },
  { key: "payment", title: "Payment", width: 110, align: "center",
    render: (v) => (
      <Stack horizontal alignItems="center" gap={6}>
        <StyledText fontSize={14}>{PAY_ICON[v as PaymentMethod]}</StyledText>
        <StyledText fontSize={12} color={theme.colors.gray[500]}>{v}</StyledText>
      </Stack>
    ),
  },
  { key: "date",    title: "Date",    width: 110, align: "center",
    render: (v) => <StyledText fontSize={12} color={theme.colors.gray[400]}>{v}</StyledText> },
  { key: "status",  title: "Status",  width: 110, align: "center",
    render: (v) => <Pill label={v} style={ORDER_STATUS[v as OrderStatus]} /> },
];

// Card renderers (phone portrait)
function OrderCard({ row, isSelected, onToggle }: { row: OrderRow; isSelected: boolean; onToggle?: () => void }) {
  return (
    <StyledCard padding={0} borderRadius={14} shadow="light" overflow="hidden"
      borderWidth={isSelected ? 2 : 1} borderColor={isSelected ? palettes.indigo[400] : theme.colors.gray[100]}>
      <Stack horizontal alignItems="center" justifyContent="space-between"
        paddingHorizontal={14} paddingVertical={12}
        backgroundColor={isSelected ? palettes.indigo[50] : theme.colors.gray[50]}
        borderBottomWidth={1} borderBottomColor={theme.colors.gray[100]}>
        <Stack horizontal alignItems="center" gap={10}>
          {onToggle && (
            <StyledPressable onPress={onToggle}>
              <Stack width={20} height={20} borderRadius={4} borderWidth={2}
                borderColor={isSelected ? palettes.indigo[600] : theme.colors.gray[300]}
                backgroundColor={isSelected ? palettes.indigo[600] : "transparent"}
                alignItems="center" justifyContent="center">
                {isSelected && <StyledText fontSize={11} color={palettes.white} fontWeight="800">✓</StyledText>}
              </Stack>
            </StyledPressable>
          )}
          <StyledText fontSize={14} fontWeight="800" color={palettes.indigo[600]}>{row.orderId}</StyledText>
        </Stack>
        <Pill label={row.status} style={ORDER_STATUS[row.status]} />
      </Stack>
      <Stack paddingHorizontal={14} paddingVertical={12} gap={10}>
        <Stack horizontal alignItems="center" gap={10}>
          <Stack width={36} height={36} borderRadius={18} backgroundColor={palettes.indigo[100]}
            alignItems="center" justifyContent="center">
            <StyledText fontSize={12} fontWeight="700" color={palettes.indigo[600]}>{row.avatar}</StyledText>
          </Stack>
          <Stack gap={1}>
            <StyledText fontSize={14} fontWeight="700" color={theme.colors.gray[900]}>{row.customer}</StyledText>
            <StyledText fontSize={11} color={theme.colors.gray[400]}>{row.date}</StyledText>
          </Stack>
        </Stack>
        <StyledDivider borderBottomColor={theme.colors.gray[100]} />
        <Stack horizontal justifyContent="space-between">
          <Stack alignItems="center" gap={2}>
            <StyledText fontSize={11} color={theme.colors.gray[400]}>Items</StyledText>
            <StyledText fontSize={14} fontWeight="700" color={theme.colors.gray[900]}>{row.items}</StyledText>
          </Stack>
          <Stack alignItems="center" gap={2}>
            <StyledText fontSize={11} color={theme.colors.gray[400]}>Total</StyledText>
            <StyledText fontSize={14} fontWeight="800" color={theme.colors.gray[900]}>{currency(row.total)}</StyledText>
          </Stack>
          <Stack alignItems="center" gap={2}>
            <StyledText fontSize={11} color={theme.colors.gray[400]}>Payment</StyledText>
            <Stack horizontal alignItems="center" gap={4}>
              <StyledText fontSize={13}>{PAY_ICON[row.payment]}</StyledText>
              <StyledText fontSize={12} color={theme.colors.gray[600]}>{row.payment}</StyledText>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </StyledCard>
  );
}

function ProductCard({ row, isSelected, onToggle }: { row: ProductRow; isSelected: boolean; onToggle?: () => void }) {
  const margin = Math.round(((row.price - row.cost) / row.price) * 100);
  const mColor = margin >= 60 ? "#16a34a" : margin >= 40 ? "#ca8a04" : "#dc2626";
  return (
    <StyledCard padding={0} borderRadius={14} shadow="light" overflow="hidden"
      borderWidth={isSelected ? 2 : 1} borderColor={isSelected ? palettes.indigo[400] : theme.colors.gray[100]}>
      <Stack horizontal alignItems="center" gap={12} paddingHorizontal={14} paddingVertical={12}
        borderBottomWidth={1} borderBottomColor={theme.colors.gray[100]}
        backgroundColor={isSelected ? palettes.indigo[50] : palettes.white}>
        {onToggle && (
          <StyledPressable onPress={onToggle}>
            <Stack width={20} height={20} borderRadius={4} borderWidth={2}
              borderColor={isSelected ? palettes.indigo[600] : theme.colors.gray[300]}
              backgroundColor={isSelected ? palettes.indigo[600] : "transparent"}
              alignItems="center" justifyContent="center">
              {isSelected && <StyledText fontSize={11} color={palettes.white} fontWeight="800">✓</StyledText>}
            </Stack>
          </StyledPressable>
        )}
        <StyledImage source={{ uri: row.image }} width={44} height={44} borderRadius={10} />
        <Stack flex={1} gap={2}>
          <StyledText fontSize={13} fontWeight="700" color={theme.colors.gray[900]} numberOfLines={2}>{row.name}</StyledText>
          <StyledText fontSize={11} color={theme.colors.gray[400]}>{row.sku}</StyledText>
        </Stack>
        <Pill label={row.stockStatus} style={STOCK_STYLE[row.stockStatus]} />
      </Stack>
      <Stack paddingHorizontal={14} paddingVertical={12} gap={8}>
        <Stack horizontal alignItems="center" justifyContent="space-between">
          <StyledText fontSize={12} color={theme.colors.gray[400]}>Category</StyledText>
          <Pill label={row.category} style={CAT_STYLE[row.category]} />
        </Stack>
        <StyledDivider borderBottomColor={theme.colors.gray[100]} />
        <Stack horizontal justifyContent="space-between">
          {[
            { label: "Price",  value: `$${row.price}`,  color: theme.colors.gray[900] },
            { label: "Margin", value: `${margin}%`,     color: mColor },
            { label: "Stock",  value: String(row.stock), color: row.stock === 0 ? "#dc2626" : theme.colors.gray[900] },
            { label: "Rating", value: `★ ${row.rating}`, color: "#f59e0b" },
          ].map(({ label, value, color }) => (
            <Stack key={label} alignItems="center" gap={2}>
              <StyledText fontSize={11} color={theme.colors.gray[400]}>{label}</StyledText>
              <StyledText fontSize={13} fontWeight="700" color={color}>{value}</StyledText>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </StyledCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA & COLUMNS — USERS
// ─────────────────────────────────────────────────────────────────────────────

interface UserRow { id: number; name: string; email: string; role: string; joined: string; }

const ROLE_STYLE: Record<string, BadgeStyle> = {
  Admin:  { bg: palettes.indigo[50],    color: palettes.indigo[600] },
  Editor: { bg: palettes.teal[50],      color: palettes.teal[600] },
  Viewer: { bg: theme.colors.gray[100], color: theme.colors.gray[600] },
};

const USERS: UserRow[] = [
  { id: 1, name: "Alex Morgan",  email: "alex@example.com",  role: "Admin",  joined: "Jan 2024" },
  { id: 2, name: "Priya Kapoor", email: "priya@example.com", role: "Editor", joined: "Mar 2024" },
  { id: 3, name: "James Li",     email: "james@example.com", role: "Viewer", joined: "Jun 2024" },
  { id: 4, name: "Sara Okonkwo", email: "sara@example.com",  role: "Editor", joined: "Aug 2024" },
  { id: 5, name: "Tom Müller",   email: "tom@example.com",   role: "Admin",  joined: "Oct 2024" },
];

const USER_COLS: TableColumn<UserRow>[] = [
  { key: "name", title: "Name",
    render: (v) => (
      <Stack horizontal alignItems="center" gap={10}>
        <Stack width={32} height={32} borderRadius={16} backgroundColor={palettes.indigo[100]}
          alignItems="center" justifyContent="center">
          <StyledText fontSize={13}>{(v as string)[0]}</StyledText>
        </Stack>
        <StyledText fontSize={13} fontWeight="600" color={theme.colors.gray[900]}>{v}</StyledText>
      </Stack>
    ),
  },
  { key: "email",  title: "Email",
    render: (v) => <StyledText fontSize={13} color={theme.colors.gray[500]}>{v}</StyledText> },
  { key: "role",   title: "Role", width: 90, align: "center",
    render: (v) => <Pill label={v} style={ROLE_STYLE[v] ?? ROLE_STYLE["Viewer"]} /> },
  { key: "joined", title: "Joined", width: 90, align: "right", sortable: true,
    render: (v) => <StyledText fontSize={12} color={theme.colors.gray[400]}>{v}</StyledText> },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATA — EMPLOYEES (for paginated demos)
// ─────────────────────────────────────────────────────────────────────────────

interface Employee {
  id: number; name: string; department: string; role: string;
  salary: number; status: "Active" | "On Leave" | "Terminated"; joined: string;
}

const DEPTS   = ["Engineering","Design","Marketing","Sales","HR","Finance"];
const ROLES_E = ["Senior","Mid","Junior","Lead","Manager","Director"];
const NAMES   = ["Alex Morgan","Priya Kapoor","James Li","Sara Okonkwo","Tom Müller",
                 "Yuki Tanaka","Maria Santos","Chris Blake","Fatima Al-Amin","Leo Andersen",
                 "Nina Patel","David Osei","Rachel Kim","Omar Hassan","Julia Chen",
                 "Marco Rossi","Aisha Diallo","Ben Carter","Mei Wong","Ivan Petrov"];

const ALL_EMPLOYEES: Employee[] = Array.from({ length: 47 }, (_, i) => ({
  id:         i + 1,
  name:       NAMES[i % 20] + ` #${i + 1}`,
  department: DEPTS[i % DEPTS.length],
  role:       ROLES_E[i % ROLES_E.length],
  salary:     40000 + (i * 1847) % 80000,
  status:     (["Active","Active","Active","On Leave","Terminated"] as const)[i % 5],
  joined:     `${2019 + (i % 5)}-${String((i % 12) + 1).padStart(2,"0")}-01`,
}));

const EMP_STATUS_STYLE: Record<string, BadgeStyle> = {
  "Active":     { bg: "#dcfce7", color: "#16a34a" },
  "On Leave":   { bg: "#fef9c3", color: "#ca8a04" },
  "Terminated": { bg: "#fee2e2", color: "#dc2626" },
};

const DEPT_COLOR: Record<string, string> = {
  Engineering: palettes.indigo[600], Design: palettes.rose[500],
  Marketing: palettes.amber[600],    Sales: palettes.teal[600],
  HR: "#9333ea",                     Finance: "#16a34a",
};

const EMP_COLS: TableColumn<Employee>[] = [
  { key: "name", title: "Employee",
    render: (v, row) => (
      <Stack horizontal alignItems="center" gap={10}>
        <Stack width={32} height={32} borderRadius={16} backgroundColor={palettes.indigo[100]}
          alignItems="center" justifyContent="center">
          <StyledText fontSize={10} fontWeight="800" color={palettes.indigo[600]}>
            {(v as string).split(" ").slice(0, 2).map((w: string) => w[0]).join("")}
          </StyledText>
        </Stack>
        <Stack gap={1} flex={1}>
          <StyledText fontSize={13} fontWeight="700" color={theme.colors.gray[900]} numberOfLines={1}>{v}</StyledText>
          <StyledText fontSize={11} color={theme.colors.gray[400]}>{row.role}</StyledText>
        </Stack>
      </Stack>
    ),
  },
  { key: "department", title: "Dept", width: 110, align: "center", sortable: true,
    render: (v) => <StyledText fontSize={12} fontWeight="700" color={DEPT_COLOR[v] ?? theme.colors.gray[600]}>{v}</StyledText> },
  { key: "salary", title: "Salary", width: 100, align: "right", sortable: true,
    render: (v) => <StyledText fontSize={13} fontWeight="700" color={theme.colors.gray[900]}>${(v as number).toLocaleString()}</StyledText> },
  { key: "joined", title: "Joined", width: 90, align: "center", sortable: true,
    render: (v) => <StyledText fontSize={11} color={theme.colors.gray[400]}>{v}</StyledText> },
  { key: "status", title: "Status", width: 100, align: "center",
    render: (v) => <Pill label={v} style={EMP_STATUS_STYLE[v] ?? EMP_STATUS_STYLE["Active"]} /> },
];

async function fetchEmployees({ page, pageSize, sortKey, sortDir, search, filters }: any) {
  await new Promise((r) => setTimeout(r, 300));
  let r = [...ALL_EMPLOYEES];
  if (search) { const q = search.toLowerCase(); r = r.filter((e) => e.name.toLowerCase().includes(q) || e.department.toLowerCase().includes(q)); }
  if (filters?.department) r = r.filter((e) => e.department === filters.department);
  if (sortKey && sortDir) r.sort((a: any, b: any) => { const c = typeof a[sortKey] === "number" ? a[sortKey] - b[sortKey] : String(a[sortKey]).localeCompare(String(b[sortKey])); return sortDir === "asc" ? c : -c; });
  return { data: r.slice(page * pageSize, (page + 1) * pageSize), totalCount: r.length };
}

function realmQuery({ page, pageSize, sortKey, sortDir, search }: any) {
  let r = [...ALL_EMPLOYEES];
  if (search) { const q = search.toLowerCase(); r = r.filter((e) => e.name.toLowerCase().includes(q)); }
  if (sortKey && sortDir) r.sort((a: any, b: any) => { const c = typeof a[sortKey] === "number" ? a[sortKey] - b[sortKey] : String(a[sortKey]).localeCompare(String(b[sortKey])); return sortDir === "asc" ? c : -c; });
  return { data: r.slice(page * pageSize, (page + 1) * pageSize), totalCount: r.length };
}

// ─────────────────────────────────────────────────────────────────────────────
// DEMO VIEWS
// ─────────────────────────────────────────────────────────────────────────────

type DemoId = "products" | "orders" | "users" | "api" | "realm" | "variants";

const DEMOS: { id: DemoId; label: string; icon: string; tag?: string; tagColor?: string }[] = [
  { id: "products", label: "Products",    icon: "📦" },
  { id: "orders",   label: "Orders",      icon: "🧾" },
  { id: "users",    label: "Users",       icon: "👥" },
  { id: "api",      label: "REST API",    icon: "🌐", tag: "ASYNC",  tagColor: palettes.indigo[600] },
  { id: "realm",    label: "Realm / DB",  icon: "🗄️", tag: "SYNC",   tagColor: "#7c3aed" },
  { id: "variants", label: "Variants",    icon: "🎨" },
];

// ── Products demo ─────────────────────────────────────────────────────────────
function ProductsDemo() {
  const { width } = useWindowDimensions();
  const isTable   = width >= 768;
  const [sel, setSel] = useState<(string | number)[]>([]);
  return (
    <Stack gap={12}>
      {sel.length > 0 && (
        <Stack horizontal alignItems="center" justifyContent="space-between"
          paddingHorizontal={14} paddingVertical={10} borderRadius={10} backgroundColor={palettes.indigo[50]}>
          <StyledText fontSize={13} fontWeight="600" color={palettes.indigo[700]}>{sel.length} selected</StyledText>
          <Stack horizontal gap={14}>
            <StyledPressable onPress={() => {}}><StyledText fontSize={13} fontWeight="600" color={palettes.indigo[600]}>Edit</StyledText></StyledPressable>
            <StyledPressable onPress={() => setSel([])}><StyledText fontSize={13} fontWeight="600" color={palettes.rose[500]}>Archive</StyledText></StyledPressable>
          </Stack>
        </Stack>
      )}
      {isTable ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Stack width={760}>
            <StyledTable columns={PRODUCT_COLS} data={PRODUCTS} selectable
              selectedIds={sel} onSelectionChange={setSel}
              showDivider pagination pageSize={6} forceTable />
          </Stack>
        </ScrollView>
      ) : (
        <StyledTable columns={PRODUCT_COLS} data={PRODUCTS} selectable
          selectedIds={sel} onSelectionChange={setSel}
          showDivider pagination pageSize={5} forceCards bordered={false}
          cardRender={(row, _, isSelected, onToggle) => (
            <ProductCard row={row as ProductRow} isSelected={isSelected} onToggle={onToggle} />
          )} />
      )}
    </Stack>
  );
}

// ── Orders demo ───────────────────────────────────────────────────────────────
function OrdersDemo() {
  const { width } = useWindowDimensions();
  const isTable   = width >= 768;
  const [sel, setSel] = useState<(string | number)[]>([]);
  const totalRevenue = ORDERS.reduce((s, o) => s + o.total, 0);
  return (
    <Stack gap={12}>
      <Stack horizontal gap={10}>
        {[
          { label: "Revenue",   value: `$${(totalRevenue/1000).toFixed(1)}K`, color: palettes.indigo[600] },
          { label: "Delivered", value: String(ORDERS.filter(o=>o.status==="Delivered").length), color: "#16a34a" },
          { label: "Processing",value: String(ORDERS.filter(o=>o.status==="Processing").length), color: "#ca8a04" },
          { label: "Cancelled", value: String(ORDERS.filter(o=>o.status==="Cancelled").length), color: "#dc2626" },
        ].map(({ label, value, color }) => (
          <StyledCard key={label} flex={1} padding={12} borderRadius={12} shadow="light">
            <Stack gap={3}>
              <StyledText fontSize={10} fontWeight="600" color={theme.colors.gray[400]}>{label}</StyledText>
              <StyledText fontSize={16} fontWeight="800" color={color} adjustsFontSizeToFit numberOfLines={1}>{value}</StyledText>
            </Stack>
          </StyledCard>
        ))}
      </Stack>
      {sel.length > 0 && (
        <Stack horizontal alignItems="center" justifyContent="space-between"
          paddingHorizontal={14} paddingVertical={10} borderRadius={10} backgroundColor={palettes.indigo[50]}>
          <StyledText fontSize={13} fontWeight="600" color={palettes.indigo[700]}>{sel.length} selected</StyledText>
          <Stack horizontal gap={14}>
            <StyledPressable onPress={() => {}}><StyledText fontSize={13} fontWeight="600" color={palettes.indigo[600]}>Export</StyledText></StyledPressable>
            <StyledPressable onPress={() => setSel([])}><StyledText fontSize={13} fontWeight="600" color={palettes.rose[500]}>Cancel</StyledText></StyledPressable>
          </Stack>
        </Stack>
      )}
      {isTable ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Stack width={820}>
            <StyledTable columns={ORDER_COLS} data={ORDERS} selectable
              selectedIds={sel} onSelectionChange={setSel}
              showDivider pagination pageSize={8} forceTable />
          </Stack>
        </ScrollView>
      ) : (
        <StyledTable columns={ORDER_COLS} data={ORDERS} selectable
          selectedIds={sel} onSelectionChange={setSel}
          showDivider pagination pageSize={6} forceCards bordered={false}
          cardRender={(row, _, isSelected, onToggle) => (
            <OrderCard row={row as OrderRow} isSelected={isSelected} onToggle={onToggle} />
          )} />
      )}
    </Stack>
  );
}

// ── Users demo ────────────────────────────────────────────────────────────────
function UsersDemo() {
  const [sel, setSel] = useState<(string | number)[]>([]);
  return (
    <StyledTable columns={USER_COLS} data={USERS} selectable
      selectedIds={sel} onSelectionChange={setSel} showDivider />
  );
}

// ── API paginated demo ────────────────────────────────────────────────────────
function ApiDemo() {
  const table = usePaginatedQuery<Employee>({ pageSize: 6, fetcher: fetchEmployees, initialSortKey: "name", initialSortDir: "asc" });
  const [activeDept, setActiveDept] = useState<string | null>(null);

  return (
    <Stack gap={12}>
      <StyledCard padding={12} borderRadius={12} backgroundColor={palettes.indigo[50]} borderWidth={1} borderColor={palettes.indigo[100]}>
        <StyledText fontSize={12} color={palettes.indigo[700]} fontWeight="600">
          🌐 Simulated REST API · 300ms latency · {table.totalCount} records · server-side sort & filter
        </StyledText>
      </StyledCard>

      {/* Dept filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Stack horizontal gap={8} paddingVertical={2}>
          {[null, ...DEPTS].map((d) => (
            <StyledPressable key={d ?? "all"} onPress={() => { setActiveDept(d); table.setFilters(d ? { department: d } : {}); }}
              paddingHorizontal={12} paddingVertical={6} borderRadius={20}
              backgroundColor={activeDept === d ? theme.colors.gray[900] : theme.colors.gray[100]}>
              <StyledText fontSize={12} fontWeight="600"
                color={activeDept === d ? palettes.white : theme.colors.gray[600]}>{d ?? "All"}</StyledText>
            </StyledPressable>
          ))}
        </Stack>
      </ScrollView>

      {table.error && (
        <Stack padding={12} borderRadius={10} backgroundColor="#fee2e2" horizontal gap={8} alignItems="center">
          <StyledText fontSize={13} color="#dc2626">⚠️ {table.error.message}</StyledText>
          <StyledPressable onPress={table.refresh}><StyledText fontSize={12} fontWeight="700" color="#dc2626">Retry</StyledText></StyledPressable>
        </Stack>
      )}

      <StyledTable columns={EMP_COLS} {...table.tableProps} showDivider bordered />

      <StyledPressable alignSelf="flex-end" onPress={table.refresh} flexDirection="row" gap={6} alignItems="center"
        paddingHorizontal={14} paddingVertical={8} borderRadius={8} backgroundColor={theme.colors.gray[100]}>
        <StyledText fontSize={13} color={theme.colors.gray[600]}>↺</StyledText>
        <StyledText fontSize={12} fontWeight="600" color={theme.colors.gray[600]}>Refresh</StyledText>
      </StyledPressable>
    </Stack>
  );
}

// ── Realm demo ────────────────────────────────────────────────────────────────
function RealmDemo() {
  const table = usePaginatedQuery<Employee>({ pageSize: 7, realmQuery: realmQuery });
  return (
    <Stack gap={12}>
      <StyledCard padding={12} borderRadius={12} backgroundColor="#faf5ff" borderWidth={1} borderColor="#e9d5ff">
        <StyledText fontSize={12} color="#7c3aed" fontWeight="600">
          🗄️ Synchronous Realm pattern · {table.totalCount} records · swap <StyledText fontWeight="800">realmQuery</StyledText> with real realm.objects(…)
        </StyledText>
      </StyledCard>
      <StyledTable columns={EMP_COLS} {...table.tableProps} showDivider bordered />
    </Stack>
  );
}

// ── Variants demo ─────────────────────────────────────────────────────────────
function VariantsDemo() {
  return (
    <Stack gap={20}>
      <Stack gap={8}>
        <StyledText fontSize={11} fontWeight="700" color={theme.colors.gray[400]} letterSpacing={0.8}>STRIPED · NO SELECTION</StyledText>
        <StyledTable columns={USER_COLS} data={USERS} striped showDivider={false} />
      </Stack>

      <Stack gap={8}>
        <StyledText fontSize={11} fontWeight="700" color={theme.colors.gray[400]} letterSpacing={0.8}>DARK THEME</StyledText>
        <StyledTable
          columns={USER_COLS} data={USERS.slice(0, 3)} showDivider
          colors={{
            background: theme.colors.gray[900], headerBg: theme.colors.gray[800],
            headerText: theme.colors.gray[400], rowBg: theme.colors.gray[900],
            border: theme.colors.gray[700], divider: theme.colors.gray[700],
            text: theme.colors.gray[100], subText: theme.colors.gray[500],
            sortActive: theme.colors.gray[100], sortInactive: theme.colors.gray[600],
            checkboxChecked: palettes.indigo[400], emptyText: theme.colors.gray[500],
            selectedBg: palettes.indigo[900], selectedBorder: palettes.indigo[500],
            rowAltBg: theme.colors.gray[900], rowHoverBg: theme.colors.gray[800],
          }}
        />
      </Stack>

      <Stack gap={8}>
        <StyledText fontSize={11} fontWeight="700" color={theme.colors.gray[400]} letterSpacing={0.8}>EMPTY STATE</StyledText>
        <StyledTable
          columns={USER_COLS} data={[]}
          emptyNode={
            <Stack alignItems="center" gap={8}>
              <StyledText fontSize={32}>🗂️</StyledText>
              <StyledText fontSize={15} fontWeight="700" color={theme.colors.gray[700]}>No users yet</StyledText>
              <StyledText fontSize={13} color={theme.colors.gray[400]}>Invite someone to get started.</StyledText>
            </Stack>
          }
        />
      </Stack>
    </Stack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN
// ─────────────────────────────────────────────────────────────────────────────

export const TableDemo: React.FC = () => {
  const [active,       setActive]       = useState<DemoId>("products");
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [forceTable,   setForceTable]   = useState(false);
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const current = DEMOS.find((d) => d.id === active)!;

  const renderDemo = () => {
    switch (active) {
      case "products": return <ProductsDemo />;
      case "orders":   return <OrdersDemo />;
      case "users":    return <UsersDemo />;
      case "api":      return <ApiDemo />;
      case "realm":    return <RealmDemo />;
      case "variants": return <VariantsDemo />;
    }
  };

  return (
   <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledHeader
        title={`${current.icon}  ${current.label}`}
        titleAlignment="center"
        showBackArrow={false}
        showStatusBar={false}
        backgroundColor={theme.colors.gray[50]}
        borderBottomWidth={1}
        borderBottomColor={theme.colors.gray[100]}
        rightIcon={
          <StyledPressable
            onPress={() => setMenuOpen((v) => !v)}
            paddingHorizontal={12} paddingVertical={6}
            borderRadius={8}
            backgroundColor={menuOpen ? theme.colors.gray[900] : theme.colors.gray[100]}
          >
            <StyledText fontSize={13} fontWeight="700"
              color={menuOpen ? palettes.white : theme.colors.gray[700]}>
              ☰ Demos
            </StyledText>
          </StyledPressable>
        }
      />

      {/* Demo switcher menu */}
      {menuOpen && (
        <Stack
          backgroundColor={palettes.white}
          borderBottomWidth={1}
          borderBottomColor={theme.colors.gray[100]}
          paddingHorizontal={16}
          paddingVertical={10}
          gap={6}
        >
          <Stack horizontal flexWrap="wrap" gap={8}>
            {DEMOS.map((demo) => (
              <StyledPressable
                key={demo.id}
                onPress={() => { setActive(demo.id); setMenuOpen(false); }}
                flexDirection="row" alignItems="center" gap={6}
                paddingHorizontal={12} paddingVertical={8}
                borderRadius={10}
                backgroundColor={active === demo.id ? theme.colors.gray[900] : theme.colors.gray[100]}
                borderWidth={1}
                borderColor={active === demo.id ? theme.colors.gray[900] : theme.colors.gray[200]}
              >
                <StyledText fontSize={14}>{demo.icon}</StyledText>
                <StyledText fontSize={12} fontWeight="700"
                  color={active === demo.id ? palettes.white : theme.colors.gray[700]}>
                  {demo.label}
                </StyledText>
                {demo.tag && (
                  <Stack
                    paddingHorizontal={6} paddingVertical={2} borderRadius={4}
                    backgroundColor={(demo.tagColor ?? palettes.indigo[600]) + "20"}
                  >
                    <StyledText fontSize={9} fontWeight="800" color={demo.tagColor ?? palettes.indigo[600]}>
                      {demo.tag}
                    </StyledText>
                  </Stack>
                )}
              </StyledPressable>
            ))}
          </Stack>
        </Stack>
      )}

      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        {renderDemo()}
      </StyledScrollView>
    </Stack>
  );
};

export default TableDemo;