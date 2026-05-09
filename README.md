# SOMA

QR-first digital menu website for SOMA, built with Next.js, Tailwind CSS, and Google Sheets as the content management system.

## Stack

- Next.js App Router
- Tailwind CSS
- Google Sheets integration for easy non-technical menu updates

## Features

- Mobile-first landing page designed for QR code traffic
- Full-screen green SOMA brand hero
- Sticky category navigation
- Reusable menu card components
- Google Sheets-driven menu content
- Automatic filtering:
  - only shows rows where `availableToday = yes`
  - groups rows by category
  - sorts items using `sortOrder`
  - hides empty categories
- Fallback behavior:
  - if `GOOGLE_SHEET_CSV_URL` is not set, starter content is shown
  - if the Google Sheet is unavailable, the site shows a graceful empty/error state
- Easy brand config for WhatsApp, Instagram, location, hours, and logo

## Project Structure

```text
src/
  app/
  components/
  config/
  lib/
public/
  brand/
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy the env template:

```powershell
Copy-Item .env.example .env.local
```

3. Start the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`

If you change `.env.local`, restart the dev server so Next.js reloads the environment values.

## Google Sheets Setup

The owner manages menu items entirely in Google Sheets.

### 1. Create the sheet

Create a Google Sheet with one tab. The first row must contain these exact column names:

```text
id | category | name | ingredients | benefits | description | price | availableToday | sortOrder | featured
```

### 2. Valid category values

Use one of these exact values in the `category` column:

- `juices`
- `smoothies`
- `milkshakes`
- `iceCream`
- `addOns`

### 3. Valid availability values

Use any of these values for `availableToday`:

- `yes`
- `true`
- `1`

Anything else is treated as unavailable and hidden from the site.

### 4. Connect the sheet

You can use either:

- a published CSV link
- a normal Google Sheets sharing link

The app will automatically convert a standard Google Sheets URL into a CSV export URL.

### 5. Publish the sheet as CSV

1. In Google Sheets, open `File > Share > Publish to web`
2. Select the menu tab
3. Choose `Comma-separated values (.csv)`
4. Click `Publish`
5. Copy the published CSV URL

Example shape:

```text
https://docs.google.com/spreadsheets/d/e/your-sheet-id/pub?gid=0&single=true&output=csv
```

### 6. Add the URL to the app

In `.env.local`:

```env
GOOGLE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/e/your-sheet-id/pub?gid=0&single=true&output=csv
```

Or use a normal share link:

```env
GOOGLE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/your-sheet-id/edit?usp=sharing
```

## How the Owner Updates the Menu

No code changes are required for normal menu updates.

### Add a new item

Add a new row in Google Sheets and fill in:

- `id`
- `category`
- `name`
- `ingredients`
- `price`
- `availableToday`
- `sortOrder`

Optional fields:

- `benefits`
- `description`
- `featured`

### Remove an item

Either:

- delete the row

Or:

- set `availableToday` to `no`

### Edit text or price

Update these columns directly in the sheet:

- `name`
- `ingredients`
- `benefits`
- `description`
- `price`

### Mark sold out

Set:

```text
availableToday = no
```

The item will disappear from the customer-facing menu.

### Reorder items

Update the `sortOrder` number.

Lower numbers appear first within each category.

### Important validation note

If `category` is blank or invalid, that row will be skipped.

Valid category values are:

- `juices`
- `smoothies`
- `milkshakes`
- `iceCream`
- `addOns`

## Suggested Row Examples

```text
juice-green-glow,juices,Green Glow,"Apple, cucumber, spinach, lemon, ginger","Refreshing, hydrating, rich in greens",,6.50,yes,1,yes
smoothie-banana-boost,smoothies,Banana Boost,"Banana, oat milk, dates, cinnamon","Creamy, filling, naturally energizing",,7.50,yes,1,yes
icecream-coconut-vanilla,iceCream,Coconut Vanilla,"Coconut milk, vanilla bean, maple syrup",,"Creamy, smooth, light tropical sweetness",5.50,yes,1,yes
addon-oat-milk,addOns,Oat Milk,"Plant-based add-on",,,0.50,yes,1,no
```

## Brand Configuration

Update these values in `.env.local` for contact details:

```env
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/911234567890
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/drinksoma
NEXT_PUBLIC_LOCATION_TEXT=Your location here
NEXT_PUBLIC_HOURS_TEXT=Daily, 8 AM - 8 PM
```

For brand copy and the logo asset path, edit:

- `src/config/site.ts`

The default logo image is:

- `public/brand/soma-logo.jpeg`

## Deployment

This app is ready to deploy on Vercel.

### Recommended deployment steps

1. Push the project to GitHub
2. Import the repo into Vercel
3. Add the environment variables from `.env.example`
4. Deploy

## Notes

- Menu data is fetched server-side and revalidated using `MENU_REVALIDATE_SECONDS`
- Default revalidation is 300 seconds
- If you want updates to appear faster, reduce `MENU_REVALIDATE_SECONDS`
