#!/bin/bash

# ChefPoint - Vercel Deploy Build Script
# Tüm uygulamaları build edip /ChefPoint/ path yapısına uygun deploy-dist oluşturur

set -e

echo "🚀 ChefPoint - Vercel build başlıyor..."

echo "📦 Building Customer App..."
cd customer-app
npm ci
npm run build
cd ..

echo "📦 Building Restaurant Dashboard..."
cd restaurant-dashboard
npm ci
npm run build
cd ..

echo "📦 Building Advanced QR Menu..."
cd advanced-qr-menu
npm ci
npm run build
cd ..

echo "📦 Building Chef Point Dashboard..."
cd chef-point
npm ci
npm run build
cd ..

echo "🗂️  Creating deploy directory..."
rm -rf deploy-dist
mkdir -p deploy-dist/ChefPoint/customer-app
mkdir -p deploy-dist/ChefPoint/restaurant-dashboard
mkdir -p deploy-dist/ChefPoint/advanced_qr_menu

cp -r chef-point/dist/* deploy-dist/ChefPoint/
cp -r customer-app/dist/* deploy-dist/ChefPoint/customer-app/
cp -r restaurant-dashboard/dist/* deploy-dist/ChefPoint/restaurant-dashboard/
cp -r advanced-qr-menu/dist/* deploy-dist/ChefPoint/advanced_qr_menu/

# SPA fallback için 404.html
cp deploy-dist/ChefPoint/index.html deploy-dist/ChefPoint/404.html
for dir in customer-app restaurant-dashboard advanced_qr_menu; do
  cp deploy-dist/ChefPoint/$dir/index.html deploy-dist/ChefPoint/$dir/404.html
done

echo "✅ Vercel build tamamlandı: deploy-dist/"
