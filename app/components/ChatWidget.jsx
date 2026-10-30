"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import settings from "/app/services/settings";

// Floating AI shopping assistant. Keeps the conversation in state, posts it to
// the backend agent (POST {API_URL}ai/chat — AI keys live in the Laravel .env,
// never in this app) and renders the reply plus product cards from the agent's
// tool calls. The provider toggle switches between Claude and ChatGPT.

const SUGGESTIONS = [
  "I need a laptop around 300k",
  "Best laptop for graphics design?",
  "iPhone under 400k",
  "Core i7, 16GB RAM laptop",
];

const formatNaira = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

function ProductCards({ products }) {
  if (!products?.length) return null;
  return (
    <div className="mt-2 grid grid-cols-2 gap-2">
      {products.map((p) => (
        <Link
          key={p.slug}
          href={`/products/${p.slug}`}
          className="group rounded-lg border border-gray-200 bg-white p-2 transition hover:border-primary hover:shadow-md"
        >
          {p.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.image}
              alt={p.name}
              className="mb-1 h-20 w-full rounded object-contain"
              loading="lazy"
            />
          )}
          <p className="line-clamp-2 text-[11px] font-medium text-gray-800 group-hover:text-primary">
            {p.name}
          </p>
          <p className="mt-0.5 text-xs font-bold text-gray-900">
            {formatNaira(p.price)}
            {p.old_price ? (
              <span className="ml-1 font-normal text-gray-400 line-through">
                {formatNaira(p.old_price)}
              </span>
            ) : null}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState("claude");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // { role, content, products? } — products only on assistant messages
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${settings.API_URL}ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        res.ok
          ? { role: "assistant", content: data.reply, products: data.products }
          : {
              role: "assistant",
              content: data.error || "Something went wrong. Please try again.",
            },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I couldn't reach the assistant — check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher — WhatsApp sits bottom-left (mobile) / bottom-right (desktop),
          so this stays bottom-right on mobile and stacks above it on desktop. */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with our AI shopping assistant"
        className="fixed bottom-20 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0E1B4D] text-white shadow-lg ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
      >
        {open ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-36 right-4 z-50 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 bg-[#0E1B4D] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold leading-tight">Shopping Assistant</p>
                <p className="text-[11px] leading-tight text-white/70">
                  Ask me for any gadget or budget
                </p>
              </div>
            </div>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              aria-label="AI model"
              className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-[11px] font-medium text-white outline-none [&>option]:text-gray-900"
            >
              <option value="claude">Claude</option>
              <option value="chatgpt">ChatGPT</option>
            </select>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-3">
            {messages.length === 0 && (
              <div className="space-y-2">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
                  Hi! 👋 Tell me what you need — a budget, a use case or exact
                  specs — and I&apos;ll find the best options in our store.
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-gray-300 bg-white px-3 py-1 text-[11px] text-gray-600 transition hover:border-primary hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0E1B4D] px-3 py-2 text-sm text-white shadow-sm">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="max-w-[95%]">
                  <div className="max-w-[90%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
                    {m.content}
                  </div>
                  <ProductCards products={m.products} />
                </div>
              )
            )}

            {loading && (
              <div className="flex items-center gap-1.5 px-2 text-gray-400">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-gray-200 bg-white p-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. laptop for graphics design, 500k"
              className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0E1B4D] text-white transition disabled:opacity-40"
            >
              <PaperAirplaneIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
