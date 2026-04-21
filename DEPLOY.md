# Deploy Instructions

## ⚠️ CRITICAL: Do NOT use `wrangler login`

This project uses the **Promptmention@gmail.com** Cloudflare account via API token.
DO NOT use `wrangler login` as it will authenticate to the wrong account.

## Quick Deploy

```bash
# Source the credentials
source .env.cloudflare

# Verify correct account
wrangler whoami
# Should show: Promptmention@gmail.com's Account

# Deploy
wrangler deploy --config wrangler.jsonc
```

## Cloudflare Account Details

| Field | Value |
|-------|-------|
| **Email** | promptmention@gmail.com |
| **Account ID** | `3d9705678730f7e08dab4d4316799de6` |
| **API Token** | Stored in `.env.cloudflare` |

## Production URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://shopify.promptmention.com |
| **Workers.dev** | https://promptmention-shopify-v2.promptmention.workers.dev |

## Dashboard

https://dash.cloudflare.com/3d9705678730f7e08dab4d4316799de6/workers/services/view/promptmention-shopify-v2
