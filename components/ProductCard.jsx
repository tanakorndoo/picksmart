"use client";

export default function ProductCard({ product, showMatchScore }) {
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

      {/* CTA Button */}
      <a
        href={product.affiliate_link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-3 bg-accent text-white text-sm font-bold text-center rounded-xl active:scale-[0.97] transition-transform"
      >
        ดูสินค้าใน Shopee 🛒
      </a>
    </div>
  );
}
