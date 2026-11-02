import { Product } from '@/lib/catalog';

export function ProductTable({ product }: { product: Product }) {
  const columns = [...new Set(product.variants.flatMap(variant => Object.keys(variant.attributes)))];
  return <div className="product-table-scroll" role="region" aria-label={`Dimensioni e varianti di ${product.name}`} tabIndex={0}>
    <table className="product-table">
      <caption>Dimensioni e varianti</caption>
      <thead><tr>{columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead>
      <tbody>{product.variants.map((variant, index) => <tr key={index}>{columns.map(column => <td key={column}>{variant.attributes[column] || '–'}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
