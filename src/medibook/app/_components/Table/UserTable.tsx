"use client"

import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import * as React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserForm from "./UserForm"
import { useRouter } from "next/navigation"
import qs from 'query-string'
import Pagination from "./Pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  totalPages?: number
}

export function UserTable<TData, TValue>({
  columns,
  data,
  totalPages
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
      },
    })
  const [query, setQuery] = React.useState<string>('');
  const router = useRouter();
  React.useEffect(()=>{
      let newUrl = '';
      const debounce = setTimeout(()=>{
          if(query){
              newUrl = qs.stringifyUrl({
                  url: window.location.href,
                  query: {
                      query: query
                  },
              },{skipNull:true})
          }else{
              newUrl = qs.stringifyUrl({
                  url: window.location.href,
                  query:{
                    query:null
                  }
              },{skipNull:true})
          }
          router.push(newUrl, {scroll: false});
      },500)
      return () => clearTimeout(debounce)
  },[query, router])

  return (
    <div className="mt-4">
      <section className="flex justify-between items-center gap-2">
        {/* Search field */}
        <div className="flex items-center py-4">
          <Input
            placeholder="Search by name..."
            onChange={(e:any)=>setQuery(e.target.value)}
            className="border-none placeholder:text-neutral-300 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-neutral-200"
          />
        </div>
          <div>
            {/* <UserForm type="Create" /> */}
          </div>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto outline-none hover:bg-[#2F374B]">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    
                    {column.id==='_id'?"User Id":column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
      
      
      {/* This is the main table */}
      <div>
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="text-md font-semibold" key={headerGroup.id}>
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
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-neutral-200">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="odd:bg-[#171f33] border-0"
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination of the table */}
      <Pagination totalPages={totalPages} table={table} />
    </div>
  )
}
