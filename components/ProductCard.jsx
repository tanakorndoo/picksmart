"use client";

import { useState } from "react";
import { saveProduct, isProductSaved, isLoggedIn } from "@/lib/store";

export default function ProductCard({ product, showMatchScore }) {
  const [saved, setSaved] = useState(() => isProductSaved(product));

  function handleSave() {
    if (!isLoggedIn()) return;
    const result = saveProduct(product);
    if (result.saved) setSaved(true);
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-4 animate-fade-in-up">
      {/* Header: Match Score + Badge */}
      <div className="flex items-center justify-between mb-2">
        {showMatchScore && (
          <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full">
            เหมาะ {product.match_score}%
          </span>
        )}
        {product.badge && (
          <span className="text-xs font-medium text-accent bg-accent-light px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Name */}
      <h4 className="text-sm font-bold text-text mb-1">{product.name}</h4>

      {/* Price */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base font-bold text-accent">{product.price}</span>
        {product.original_price && (
          <span className="text-xs text-muted line-through">
            {product.original_price}
          </span>
        )}
        {product.discount_badge && (
          <span className="text-xs font-semibold text-accent">
            {product.discount_badge}
          </span>
        )}
      </div>

      {/* Social Proof */}
      {product.social_proof && (
        <p className="text-xs text-muted mb-2">{product.social_proof}</p>
      )}

      {/* Why Recommended */}
      {product.why_recommended && (
        <div className="bg-gold-light rounded-xl p-3 mb-3">
          <p className="text-xs text-gold">
            💡 {product.why_recommended}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2">
        <a
          href={product.affiliate_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 bg-accent text-white text-sm font-bold text-center rounded-xl active:scale-[0.97] transition-transform"
        >
          ดูสินค้าใน Shopee 🛒
        </a>
        {isLoggedIn() && (
          <button
            onClick={handleSave}
            disabled={saved}
            className={`px-3 py-3 rounded-xl text-sm font-bold active:scale-95 transition-transform shrink-0 ${
              saved
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-gray-50 text-gray-500 border border-gray-200"
            }`}
          >
            {saved ? "✅" : "🔖"}
          </button>
        )}
      </div>
    </div>
  );
}
