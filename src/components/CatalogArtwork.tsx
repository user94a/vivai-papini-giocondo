import Image from "next/image";
import { Product, familyFor } from '@/lib/catalog';
import { sitePath } from '@/lib/site-path';
export function CatalogArtwork({ product }: { product: Product }) {
 const family = familyFor(product);
 if (family.image) return <Image src={sitePath(`/images/optimized/${family.image}`)} alt={`Illustrazione di famiglia: ${family.name}`} width={600} height={600} sizes="(max-width: 760px) 90vw, 45vw" />;
 return <svg viewBox="0 0 400 400" role="img" aria-label="Illustrazione stilizzata di un ramo ornamentale"><g fill="none" stroke="#496449" strokeWidth="4" strokeLinecap="round"><path d="M195 350 Q225 220 180 64 M207 266L135 208 M210 215L274 154 M202 159L143 111"/></g><g fill="#73856b"><ellipse cx="128" cy="196" rx="20" ry="47" transform="rotate(-48 128 196)"/><ellipse cx="279" cy="140" rx="20" ry="48" transform="rotate(38 279 140)"/><ellipse cx="133" cy="99" rx="18" ry="41" transform="rotate(-42 133 99)"/><ellipse cx="182" cy="77" rx="19" ry="43" transform="rotate(-12 182 77)"/><ellipse cx="230" cy="235" rx="17" ry="40" transform="rotate(40 230 235)"/></g></svg>;
}
