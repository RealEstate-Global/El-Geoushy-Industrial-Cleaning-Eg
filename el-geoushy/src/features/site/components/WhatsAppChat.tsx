"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { getWhatsAppChatUrl } from "@/lib/whatsapp";
import type { Locale } from "@/types/site";

interface WhatsAppChatProps {
  number?: string;
  locale?: Locale;
}

export function WhatsAppChat({
  number = "+0201016264326",
  locale = "ar",
}: WhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isAr = locale === "ar";

  const defaultMessage = isAr
    ? "مرحباً، أود الاستفسار عن منتج نيو سيترس وطلب العبوة."
    : "Hello, I would like to inquire about NEW CETRiS and place an order.";

  const chatUrl = getWhatsAppChatUrl(number, defaultMessage);

  return (
    <div className="whatsapp-widget-container fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* WhatsApp Chat Popup Box */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={isAr ? "محادثة واتساب" : "WhatsApp Chat"}
          className="whatsapp-popup w-[310px] sm:w-[340px] bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden animate-[toast-in_0.25s_var(--ease-spring)_both]"
          dir={isAr ? "rtl" : "ltr"}
        >
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold text-lg border border-white/20">
                  C
                </span>
                <span className="w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#075E54] absolute -bottom-0.5 -right-0.5 animate-pulse" />
              </div>
              <div className="leading-tight">
                <h4 className="font-bold text-sm text-white">NEW CETRiS</h4>
                <p className="text-[11px] text-white/80">
                  {isAr ? "الجيوشي للمنظفات · متصل الآن" : "El-Gioushy · Online"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label={isAr ? "إغلاق نافذة المحادثة" : "Close chat"}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Bubble Body */}
          <div className="p-4 bg-surface-soft/60 flex flex-col gap-3 min-h-[140px] justify-center">
            <div className="bg-surface p-3.5 rounded-2xl rounded-tr-none border border-border shadow-2xs space-y-1.5 self-start max-w-[90%]">
              <p className="text-xs text-ink leading-relaxed">
                {isAr
                  ? "أهلاً بك! 👋 يسعدنا تواصلك معنا مباشرة عبر واتساب لطلب نيو سيترس أو الاستفسار عن الأسعار والعروض."
                  : "Welcome! 👋 Feel free to chat with us directly on WhatsApp for NEW CETRiS orders and inquiries."}
              </p>
              <div className="flex items-center justify-between text-[10px] text-muted pt-1">
                <span className="font-mono text-primary font-bold dir-ltr">
                  +0201016264326
                </span>
                <span>{isAr ? "الآن" : "Just now"}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-3 bg-surface border-t border-border">
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <Send size={16} />
              <span>{isAr ? "بدء المحادثة على واتساب" : "Start WhatsApp Chat"}</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isAr ? "محادثة عبر واتساب" : "Chat on WhatsApp"}
        className="whatsapp-fab group relative flex items-center gap-2.5 rounded-full px-5 py-3 text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-[0_8px_25px_rgb(37,211,102,0.35)] hover:shadow-[0_12px_32px_rgb(37,211,102,0.45)] transition-all duration-200 hover:scale-105 cursor-pointer"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle size={22} className="group-hover:rotate-6 transition-transform" />
          <span className="w-2.5 h-2.5 rounded-full bg-white absolute -top-1 -right-1 animate-ping opacity-75" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-100 absolute -top-1 -right-1" />
        </span>
        <span className="font-bold text-xs">
          {isOpen
            ? isAr
              ? "إغلاق"
              : "Close"
            : isAr
              ? "راسلنا على واتساب"
              : "Chat on WhatsApp"}
        </span>
      </button>
    </div>
  );
}
