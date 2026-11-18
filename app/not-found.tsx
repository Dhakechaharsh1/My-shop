import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container">
      <div className="empty" style={{ padding: "140px 0 180px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/peacock.png" alt="" width={80} height={88} />
        <h1 className="h2">This page has flown away.</h1>
        <Link href="/shop" className="btn btn--primary">Back to the collection</Link>
      </div>
    </div>
  );
}
