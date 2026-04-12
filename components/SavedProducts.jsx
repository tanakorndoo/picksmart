"use client";

import { useState } from "react";
import { getUser, removeSavedProduct } from "@/lib/store";

export default function SavedProducts({ user, onUpdate, onClose }) {
  const products = user.savedProducts || [];

  function handleRemove(index) {
    const updated = removeSavedProduct(index);
    onUpdate(updated);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] overflow-y-auto pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-4 pt-4 pb-3 border-b border-gray-100 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">🔖 สินค้าที่บันทึกไว้</h2>
            <button onClick={onClose} className="text-gray-400 text-xl leading-none">&times;</button>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">{products.length} รายการ</p>
        </div>

        {products.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <div className="text-4xl mb-3">🔖</div>
            <p className="text-sm text-gray-500 font-medium">ยังไม่มีสินค้าที่บันทึก</p>
            <p className="text-xs text-gray-400 mt-1">ทำ Quiz แล้วกดบันทึกสินค้าที่ชอบได้เลย</p>
          </div>
        ) : (
          <div className="px-4 mt-4 space-y-3">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-2xl border border-border p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-text flex-1">{product.name}</h4>
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-gray-300 text-xs active:text-red-400 shrink-0 px-1"
                  >
                    ลบ
                  </button>
                </div>

                <p className="text-base font-bold text-accent mb-2">{product.price}</p>

                {product.why_recommended && (
                  <div className="bg-gold-light rounded-xl p-2.5 mb-3">
                    <p className="text-xs text-gold">💡 {product.why_recommended}</p>
                  </div>
                )}

                <a
                  href={product.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 bg-accent text-white text-sm font-bold text-center rounded-xl active:scale-[0.97] transition-transform"
                >
                  ดูสินค้าใน Shopee 🛒
                </a>

                <p className="text-[10px] text-gray-300 mt-2 text-right">
                  บันทึกเมื่อ {new Date(product.savedAt).toLocaleDateString("th-TH")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
