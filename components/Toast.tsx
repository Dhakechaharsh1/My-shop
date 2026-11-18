"use client";
import { useCart } from "./CartContext";
import { CheckIcon } from "./Icons";

export default function Toast() {
  const { toast, setOpen } = useCart();
  return (
    <div className={`toast ${toast ? "is-on" : ""}`} role="status" aria-live="polite">
      {toast && (
        <>
          <CheckIcon size={16} />
          <span>{toast}</span>
          <button onClick={() => setOpen(true)}>View bag</button>
        </>
      )}
    </div>
  );
}
