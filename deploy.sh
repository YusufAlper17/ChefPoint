#!/bin/bash

# ChefPoint - GitHub Pages Deploy Script
# Tüm uygulamaları build edip tek bir dist klasörüne birleştirir

set -e

echo "🚀 ChefPoint - Building all applications..."

# Build tüm uygulamalar
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

# Deploy klasörünü oluştur ve temizle
echo "🗂️  Creating deploy directory..."
rm -rf deploy-dist
mkdir -p deploy-dist

# Chef Point (ana dashboard) - root'a kopyala
echo "📋 Copying Chef Point Dashboard to root..."
cp -r chef-point/dist/* deploy-dist/

# Diğer uygulamaları alt klasörlere kopyala
echo "📋 Copying Customer App..."
mkdir -p deploy-dist/customer-app
cp -r customer-app/dist/* deploy-dist/customer-app/

echo "📋 Copying Restaurant Dashboard..."
mkdir -p deploy-dist/restaurant-dashboard
cp -r restaurant-dashboard/dist/* deploy-dist/restaurant-dashboard/

echo "📋 Copying Advanced QR Menu..."
mkdir -p deploy-dist/advanced_qr_menu
cp -r advanced-qr-menu/dist/* deploy-dist/advanced_qr_menu/

# GitHub Pages için gerekli dosyaları oluştur
echo "📄 Creating 404.html and .nojekyll files..."

# Root için 404.html (Chef Point)
if [ -f "deploy-dist/index.html" ]; then
  cp deploy-dist/index.html deploy-dist/404.html
  echo "✅ Created deploy-dist/404.html"
fi

# Her alt klasör için 404.html oluştur
for dir in customer-app restaurant-dashboard advanced_qr_menu; do
  if [ -f "deploy-dist/$dir/index.html" ]; then
    cp deploy-dist/$dir/index.html deploy-dist/$dir/404.html
    echo "✅ Created deploy-dist/$dir/404.html"
  fi
done

# .nojekyll dosyası oluştur (root ve her alt klasör için)
touch deploy-dist/.nojekyll
echo "✅ Created deploy-dist/.nojekyll"

for dir in customer-app restaurant-dashboard advanced_qr_menu; do
  if [ -d "deploy-dist/$dir" ]; then
    touch deploy-dist/$dir/.nojekyll
    echo "✅ Created deploy-dist/$dir/.nojekyll"
  fi
done

echo "✅ Build completed! Deploy directory ready: deploy-dist/"
echo "📤 To deploy, run: gh-pages -d deploy-dist"

