import Link from "next/link";

const LINKS = [
  { href: "/", label: "路径" },
  { href: "/glossary", label: "手法词表" },
  { href: "/rubric", label: "评估速查" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-header__brand" href="/">
        文径
      </Link>
      <nav className="site-header__nav" aria-label="主导航">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
