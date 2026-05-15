export const CATEGORY_OPTIONS: Array<{ name: string; slug: string }> = [
  { name: "Business", slug: "business" },
  { name: "Health", slug: "health" },
  { name: "Technology", slug: "technology" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Home Improvement", slug: "home-improvement" },
  { name: "Automotive", slug: "automotive" },
  { name: "Travel", slug: "travel" },
  { name: "Blog", slug: "blog" },
  { name: "Shopping", slug: "shopping" },
  { name: "Service", slug: "service" },
  { name: "Lifestyle", slug: "lifestyle" },
  { name: "Beauty", slug: "beauty" },
  { name: "Pet & Animal", slug: "pet-animal" },
  { name: "Food", slug: "food" },
  { name: "Furniture", slug: "furniture" },
  { name: "Electric", slug: "electric" },
  { name: "Jobs & Payroll", slug: "jobs-payroll" },
  { name: "Finance", slug: "finance" },
  { name: "Crypto", slug: "crypto" },
];

const allowed = new Set(
  CATEGORY_OPTIONS.flatMap((item) => [item.slug.toLowerCase(), item.name.toLowerCase()])
);

export const isValidCategory = (value: string) =>
  allowed.has(value.trim().toLowerCase());

export const normalizeCategory = (value: string) => {
  const normalized = value.trim().toLowerCase();
  const match = CATEGORY_OPTIONS.find(
    (item) =>
      item.slug.toLowerCase() === normalized ||
      item.name.toLowerCase() === normalized
  );
  return match?.slug || normalized;
};
