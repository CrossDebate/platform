import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { 
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Metric } from './MetricsDashboard';
import { Badge } from '@/components/ui/badge';

interface MetricsTableProps {
  metrics: Metric[];
}

export function MetricsTable({ metrics }: MetricsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<Metric>[] = [
    {
      accessorKey: 'name',
      header: 'Metric Name',
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        const category = row.getValue('category') as string;
        return (
          <Badge variant={category === 'cognitive_load' ? 'destructive' : 'default'}>
            {category === 'cognitive_load' ? 'Cognitive Load' : 'Comprehension'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'value',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Value
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-right font-medium">{row.getValue('value')}</div>
      ),
    },
    {
      accessorKey: 'trend',
      header: 'Trend',
      cell: ({ row }) => {
        const trend = row.getValue('trend') as number | undefined;
        if (trend === undefined) return null;
        
        return (
          <div className="flex items-center justify-end">
            <span className={trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
            {trend > 0 ? <ArrowUp className="ml-1 h-4 w-4 text-green-600" /> : 
             trend < 0 ? <ArrowDown className="ml-1 h-4 w-4 text-red-600" /> : null}
          </div>
        );
      },
    },
    {
      accessorKey: 'timestamp',
      header: 'Time',
    },
    {
      accessorKey: 'source',
      header: 'Source',
    },
  ];

  const table = useReactTable({
    data: metrics,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No metrics found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
