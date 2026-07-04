# Myraa's Haul — AI Virtual Wardrobe

Retro outfit try-on app powered by **Replicate IDM-VTON** (with optional fal.ai fallback).

## Quick setup

### 1. Get a Replicate API token (recommended)

1. Sign up at [replicate.com](https://replicate.com)
2. Go to [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
3. Create a token — new accounts get free credits (~$5)

### 2. Configure `.env`

```bash
cp .env.example .env
```

Edit `.env`:

```
REPLICATE_API_TOKEN=r8_your_token_here
```

### 3. Run

```bash
npm install
npm run dev
```

- App: http://localhost:5173
- API: http://localhost:3001

## Why Replicate instead of fal?

Your fal.ai account returns **403 Forbidden — exhausted balance**. Replicate IDM-VTON is more reliable and costs ~$0.02 per try-on.

You can still add `FAL_KEY` as a fallback once your fal balance is topped up.

## How to use

1. Upload her **full-body photo** (saved locally)
2. Pick a category → upload an **outfit photo**
3. Tap **TRY IT ON** — wait 20–60 seconds
4. **SAVE LOOK** to keep results in FAVS

## Supported categories

| Category | AI try-on |
|----------|-----------|
| DRESS | ✅ |
| HOOD / TOP | ✅ |
| JEAN | ✅ |
| SHOE / ACC. | ❌ |

## Troubleshooting

| Error | Fix |
|-------|-----|
| AI OFFLINE banner | Add `REPLICATE_API_TOKEN` to `.env`, restart `npm run dev` |
| Backend not running | Run `npm run dev` (starts both client + server) |
| fal exhausted balance | Use Replicate token instead |
| Try-on takes long | Normal — IDM-VTON needs 20–60 seconds |

## Photo tips

- **Person:** Full body, front-facing, plain background
- **Outfit:** Flat-lay or product photo on white/plain background
