"use client";

import { useState } from "react";
import { STORE, orderMessage } from "@/lib/store-config";
import { InstagramIcon } from "./Icons";

/**
 * Opens Rooh Gehna's Instagram in a new tab and copies a ready-made
 * DM so the customer only has to paste it.
 */
export default function OrderButton({
  name,
  subtitle,
  price,
  label = "DM to order on Instagram",
  className = "btn btn--primary",
  showHint = false,
}: {
  name?: string;
  subtitle?: string;
  price?: string;
  label?: string;
  className?: string;
  showHint?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <a
        href={STORE.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={() => {
          try {
            navigator.clipboard?.writeText(orderMessage(name, subtitle, price)).then(
              () => setCopied(true),
              () => {},
            );
          } catch {}
        }}
      >
        <InstagramIcon size={18} />
        {label}
      </a>
      {showHint && (
        <p className="order-hint" aria-live="polite">
          {copied
            ? "Message copied. Paste it in your DM to @rooh.gehna and we’ll confirm your order."
            : "Opens our Instagram. Send us a DM with the piece’s name and we’ll confirm availability and delivery."}
        </p>
      )}
    </>
  );
}
