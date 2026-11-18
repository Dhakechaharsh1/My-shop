"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartContext";
import { BagIcon, CloseIcon, MenuIcon, SearchIcon } from "./Icons";
import { CATEGORIES } from "@/lib/products";

export default function Header() {
  const { count, setOpen, ready } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const [bump, setBump] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const prev = useRef(count);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [pathname]);

  useEffect(() => {
    if (ready && count > prev.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 500);
      prev.current = count;
      return () => clearTimeout(t);
    }
    prev.current = count;
  }, [count, ready]);

  useEffect(() => {
    if (search) inputRef.current?.focus();
  }, [search]);

  const isHome = pathname === "/";

  return (
    <>
      <div className="announce">
        <span className="announce__long">Free shipping on orders above ₹999 &nbsp;·&nbsp; </span>Use <b>WELCOME10</b> for 10% off your first order
      </div>
      <header className={`nav ${scrolled || !isHome ? "nav--solid" : ""} ${menu ? "nav--open" : ""}`}>
        <div className="nav__inner">
          <button className="nav__icon nav__menu-btn" aria-label={menu ? "Close menu" : "Open menu"} onClick={() => setMenu((m) => !m)}>
            {menu ? <CloseIcon /> : <MenuIcon />}
          </button>

          <nav className="nav__links" aria-label="Primary">
            <Link href="/shop" className={pathname === "/shop" ? "is-active" : ""}>Shop</Link>
            <Link href="/shop?c=necklaces">Necklaces</Link>
            <Link href="/shop?c=earrings">Earrings</Link>
            <Link href="/about" className={pathname === "/about" ? "is-active" : ""}>Our Story</Link>
          </nav>

          <Link href="/" className="nav__brand" aria-label="Rooh Gehna — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/peacock.png" alt="" width={26} height={29} />
            <span>ROOH GEHNA</span>
          </Link>

          <div className="nav__actions">
            <Link href="/contact" className="nav__text-link">Contact</Link>
            <button className="nav__icon" aria-label="Search" onClick={() => setSearch((s) => !s)}>
              <SearchIcon />
            </button>
            <button className={`nav__icon nav__bag ${bump ? "bump" : ""}`} aria-label={`Bag, ${count} items`} onClick={() => setOpen(true)}>
              <BagIcon />
              {ready && count > 0 && <span className="nav__count">{count}</span>}
            </button>
          </div>
        </div>

        <div className={`nav__search ${search ? "is-open" : ""}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
              setSearch(false);
            }}
          >
            <SearchIcon size={18} />
            <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jhumkas, chokers, tikka…" aria-label="Search products" />
            <button type="button" className="nav__icon" aria-label="Close search" onClick={() => setSearch(false)}>
              <CloseIcon size={18} />
            </button>
          </form>
        </div>

        <div className={`nav__sheet ${menu ? "is-open" : ""}`}>
          <Link href="/shop">Shop all</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={`/shop?c=${c.id}`}>{c.label}</Link>
          ))}
          <Link href="/about">Our Story</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </header>
    </>
  );
}
