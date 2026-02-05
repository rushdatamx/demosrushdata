"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopProductsTableProps {
  products: Array<{
    upc: number;
    producto: string;
    monto: number;
    unidades: number;
  }>;
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  const formatProductName = (fullName: string) => {
    const parts = fullName.split(" ");
    if (/^\d+$/.test(parts[0])) {
      return parts.slice(1).join(" ");
    }
    return fullName;
  };

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead className="text-right">Ventas</TableHead>
            <TableHead className="text-right">Unidades</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.slice(0, 5).map((product, index) => (
            <TableRow key={product.upc}>
              <TableCell className="font-medium text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium text-sm">
                {formatProductName(product.producto)}
              </TableCell>
              <TableCell className="text-right">
                ${product.monto.toLocaleString("es-MX")}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {product.unidades.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
