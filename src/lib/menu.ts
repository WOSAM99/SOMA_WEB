import { cache } from "react";

import { starterMenuItems } from "@/lib/starter-menu";
import type { MenuCategory, MenuItem, MenuState } from "@/lib/types";

const validCategories = new Set<MenuCategory>([
  "juices",
  "smoothies",
  "milkshakes",
  "iceCream",
  "addOns"
]);

const categoryAliases: Record<string, MenuCategory> = {
  juice: "juices",
  juices: "juices",
  smoothie: "smoothies",
  smoothies: "smoothies",
  milkshake: "milkshakes",
  milkshakes: "milkshakes",
  icecream: "iceCream",
  "ice cream": "iceCream",
  veganicecream: "iceCream",
  addon: "addOns",
  addons: "addOns",
  "add on": "addOns",
  "add ons": "addOns",
  "add-on": "addOns"
};

const parseBoolean = (value: string) => {
  const normalized = value.trim().toLowerCase();
  return ["true", "yes", "y", "1"].includes(normalized);
};

const parsePrice = (value: string) => {
  const numeric = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
};

const parseSortOrder = (value: string) => {
  const numeric = Number.parseInt(value, 10);
  return Number.isFinite(numeric) ? numeric : 999;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeHeader(header: string) {
  const compact = header.trim().toLowerCase().replace(/\s+/g, "");

  if (compact === "availabletoday") return "availableToday";
  if (compact === "sortorder") return "sortOrder";
  return compact;
}

function normalizeCategory(value: string) {
  const normalized = value.trim().toLowerCase().replace(/[_-]+/g, " ");
  const compact = normalized.replace(/\s+/g, "");
  return categoryAliases[normalized] ?? categoryAliases[compact] ?? null;
}

function buildGoogleSheetCsvUrl(rawUrl: string) {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);

    if (!url.hostname.includes("docs.google.com")) {
      return trimmed;
    }

    if (url.pathname.includes("/pub") && url.searchParams.get("output") === "csv") {
      return trimmed;
    }

    const gid = url.searchParams.get("gid") ?? "0";
    const editMatch = url.pathname.match(/\/spreadsheets\/d\/([^/]+)/);

    if (editMatch) {
      return `https://docs.google.com/spreadsheets/d/${editMatch[1]}/export?format=csv&gid=${gid}`;
    }

    return trimmed;
  } catch {
    return trimmed;
  }
}

function splitCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"' && inQuotes && nextCharacter === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (character === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (character === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current.trim());
  return values;
}

function parseCsv(csv: string) {
  const lines = csv
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => line.trim().length > 0);

  if (lines.length < 2) {
    return [];
  }

  const headers = splitCsvLine(lines[0]).map((header) => normalizeHeader(header));

  return lines.slice(1).map((line) => {
    const entries = splitCsvLine(line);
    return headers.reduce<Record<string, string>>((record, header, index) => {
      record[header] = entries[index] ?? "";
      return record;
    }, {});
  });
}

function normalizeItem(record: Record<string, string>) {
  const name = (record.name ?? "").trim();
  const category = normalizeCategory(record.category ?? "");

  if (!name) {
    return {
      item: null,
      error: "are missing an item name"
    };
  }

  if (!category || !validCategories.has(category)) {
    return {
      item: null,
      error: `are missing a valid category for "${name}"`
    };
  }

  const benefits = record.benefits?.trim() || undefined;
  const description = record.description?.trim() || undefined;

  return {
    item: {
      id: record.id?.trim() || slugify(`${category}-${name}`),
      category,
      name,
      ingredients: record.ingredients?.trim() ?? "",
      benefits:
        category === "iceCream"
          ? benefits
          : benefits ?? (!record.benefits ? description : undefined),
      description: category === "iceCream" ? description : undefined,
      price: parsePrice(record.price ?? ""),
      availableToday: parseBoolean(record.availableToday ?? ""),
      sortOrder: parseSortOrder(record.sortOrder ?? ""),
      featured: parseBoolean(record.featured ?? "")
    },
    error: null
  };
}

function summarizeErrors(errors: string[]) {
  if (errors.length === 0) return undefined;

  const counts = new Map<string, number>();

  for (const error of errors) {
    counts.set(error, (counts.get(error) ?? 0) + 1);
  }

  const message = Array.from(counts.entries())
    .map(([error, count]) => `${count} row${count > 1 ? "s" : ""} ${error}`)
    .join("; ");

  return `Google Sheets connected, but some rows were skipped: ${message}.`;
}

async function fetchGoogleSheetData(): Promise<MenuState> {
  const csvUrl = buildGoogleSheetCsvUrl(process.env.GOOGLE_SHEET_CSV_URL ?? "");

  if (!csvUrl) {
    return {
      items: starterMenuItems,
      source: "starter",
      error:
        "Google Sheet not connected yet. Add your published or shared Google Sheets link to GOOGLE_SHEET_CSV_URL in .env.local."
    };
  }

  try {
    const response = await fetch(csvUrl, {
      next: {
        revalidate: Number(process.env.MENU_REVALIDATE_SECONDS ?? 300)
      }
    });

    if (!response.ok) {
      throw new Error(`Google Sheet request failed with ${response.status}`);
    }

    const csv = await response.text();
    const records = parseCsv(csv);
    const errors: string[] = [];
    const items: MenuItem[] = [];

    for (const record of records) {
      const result = normalizeItem(record);
      if (result.item) {
        items.push(result.item);
      } else if (result.error) {
        errors.push(result.error);
      }
    }

    const rowWarnings = summarizeErrors(errors);

    if (items.length === 0) {
      return {
        items: [],
        source: "google-sheets",
        error:
          rowWarnings ??
          "The Google Sheet is connected, but there are no valid menu rows to display yet."
      };
    }

    return {
      items,
      source: "google-sheets",
      error: rowWarnings
    };
  } catch (error) {
    return {
      items: [],
      source: "google-sheets",
      error:
        error instanceof Error
          ? error.message
          : "The menu could not be loaded from Google Sheets."
    };
  }
}

export const getMenuState = cache(fetchGoogleSheetData);

export function getVisibleMenu(items: MenuItem[]) {
  const visibleItems = items.filter((item) => item.availableToday);
  const grouped = {
    juices: [] as MenuItem[],
    smoothies: [] as MenuItem[],
    milkshakes: [] as MenuItem[],
    iceCream: [] as MenuItem[],
    addOns: [] as MenuItem[]
  };

  for (const item of visibleItems) {
    grouped[item.category].push(item);
  }

  for (const category of Object.keys(grouped) as MenuCategory[]) {
    grouped[category].sort((left, right) => left.sortOrder - right.sortOrder);
  }

  return grouped;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value);
}
