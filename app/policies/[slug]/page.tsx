import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POLICIES } from "@/lib/policies";

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: POLICIES[slug]?.title ?? "Policy" };
}

export default async function Policy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = POLICIES[slug];
  if (!p) notFound();
  return (
    <div className="container">
      <div className="page-head">
        <span className="eyebrow">Rooh Gehna</span>
        <h1 className="display">{p.title}</h1>
      </div>
      <article className="prose">
        {p.body.map((b, i) => (
          <div key={i}>
            {b.h && <h2>{b.h}</h2>}
            <p>{b.p}</p>
          </div>
        ))}
      </article>
    </div>
  );
}
