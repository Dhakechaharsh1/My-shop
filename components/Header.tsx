"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, InstagramIcon, MenuIcon } from "./Icons";
import { STORE } from "@/lib/store-config";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  const isHome = pathname === "/";
  const active = (p: string) => (pathname === p || pathname.startsWith(p + "/") ? "is-active" : "");

  return (
    <>
      <div className="announce">
        New: the Mor Ghungroo earrings <span className="announce__long">&nbsp;·&nbsp; Order with a DM on Instagram</span>
      </div>
      <header className={`nav ${scrolled || !isHome ? "nav--solid" : ""} ${menu ? "nav--open" : ""}`}>
        <div className="nav__inner">
          <button className="nav__icon nav__menu-btn" aria-label={menu ? "Close menu" : "Open menu"} onClick={() => setMenu((m) => !m)}>
            {menu ? <CloseIcon /> : <MenuIcon />}
          </button>

          <nav className="nav__links" aria-label="Primary">
            <Link href="/shop" className={active("/shop")}>Shop</Link>
            <Link href="/about" className={active("/about")}>Our Story</Link>
            <Link href="/contact" className={active("/contact")}>Contact</Link>
          </nav>

          <Link href="/" className="nav__brand" aria-label="Rooh Gehna — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/peacock.png" alt="" width={26} height={29} />
            <span>ROOH GEHNA</span>
          </Link>

          <div className="nav__actions">
            <a href={STORE.instagramUrl} target="_blank" rel="noopener noreferrer" className="nav__ig">
              <InstagramIcon size={17} />
              <span>Order on Instagram</span>
            </a>
          </div>
        </div>

        <div className={`nav__sheet ${menu ? "is-open" : ""}`}>
          <Link href="/shop">Shop</Link>
          <Link href="/about">Our Story</Link>
          <Link href="/contact">Contact</Link>
          <a href={STORE.instagramUrl} target="_blank" rel="noopener noreferrer">Order on Instagram</a>
        </div>
      </header>
    </>
  );
}
