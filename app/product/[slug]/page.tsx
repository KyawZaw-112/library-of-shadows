import { products } from "@/lib/catalog";
import ProductView from "./view";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductView slug={params.slug} />;
}
