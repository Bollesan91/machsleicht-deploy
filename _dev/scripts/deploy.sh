#!/bin/bash
# Deploy machsleicht.de to Netlify
# Run from: machsleicht-site/machsleicht-site/ folder
# Usage: bash deploy.sh

SITE_ID="0bcebf19-10f8-42c3-b956-5693a040bef1"
TOKEN="nfp_yHqfJRXpZUUJTyZwBuDiMYMhyq9n9V1L995b"

echo "📦 Creating deployment zip..."
zip -r /tmp/machsleicht-deploy.zip . -x ".*"

echo "🚀 Deploying to Netlify..."
curl -s -X POST "https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys" \
  -H "Content-Type: application/zip" \
  -H "Authorization: Bearer ${TOKEN}" \
  --data-binary @/tmp/machsleicht-deploy.zip \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'✅ Deploy {d.get(\"state\",\"unknown\")} — {d.get(\"ssl_url\",\"\")}'); print(f'   ID: {d.get(\"id\",\"\")}')"

rm /tmp/machsleicht-deploy.zip
echo "Done!"
