"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  SortDescriptor,
  Selection,
} from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useWindowSize from "react-use/lib/useWindowSize";

type Shop = {
  id: string;
  shopName: string;
  rating: number;
  price: number;
  picture?: string;
  location: string;
  aproximateDistance?: string;
  yearOfService: number;
};

export default function ShopsSection({ shops }: { shops: Shop[] }) {
  return (
    <div className="mt-4">
      <ShopsTable shops={shops} />
    </div>
  );
}

const columns = [
  { uid: "shopName", name: "Shop Name", sortable: true },
  { uid: "rating", name: "Rating", sortable: true },
  { uid: "price", name: "Price", sortable: true },
  { uid: "picture", name: "Picture" },
  { uid: "location", name: "Location" },
  { uid: "aproximateDistance", name: "Distance", sortable: true },
  { uid: "yearOfService", name: "Year of Service", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = [
  "shopName",
  "rating",
  "price",
  "picture",
  "location",
  "aproximateDistance",
  "yearOfService",
];

const MOBILE_COLUMNS = [
  "shopName",
  "rating",
  "price",
  "picture",
  "aproximateDistance",
];

function ShopsTable({ shops }: { shops: Shop[] }) {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "rating",
    direction: "descending",
  });
  const [priceSortDirection, setPriceSortDirection] = useState<"ascending" | "descending" | null>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 768) {
      setVisibleColumns(new Set(MOBILE_COLUMNS));
    } else {
      setVisibleColumns(new Set(INITIAL_VISIBLE_COLUMNS));
    }
  }, [width]);

  const headerColumns = useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const sortedShops = useMemo(() => {
    return [...shops].sort((a, b) => {
      if (priceSortDirection) {
        const aValue = a.price ?? 0;
        const bValue = b.price ?? 0;
        return priceSortDirection === "ascending" ? aValue - bValue : bValue - aValue;
      } else {
        const aValue = a[sortDescriptor.column as keyof Shop];
        const bValue = b[sortDescriptor.column as keyof Shop];
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return bValue - aValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        }
        return 0;
      }
    });
  }, [shops, sortDescriptor, priceSortDirection]);

  const renderCell = useCallback((data: any, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof Shop];
    switch (columnKey) {
      case "rating":
        return (
          <>
            <span className="hidden items-center justify-center gap-1 lg:flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={cn(
                    "text-yellow-500",
                    index + 1 <= data.rating
                      ? "text-yellow-500"
                      : "text-gray-300"
                  )}
                  size={18}
                />
              ))}
            </span>
            <span className="flex items-center gap-1 lg:hidden">
              <FaStar className="text-yellow-500" size={18} />
              <span>{parseFloat(data.rating).toFixed(1)}</span>
            </span>
          </>
        );
      case "price":
        // return cellValue !== undefined ? `₹${cellValue.toFixed(2)}` : "N/A";
        return typeof cellValue === 'number' ? `₹${cellValue.toFixed(2)}` : "N/A";
      case "picture":
        return (
          <div className="relative mb-2 aspect-video w-32 overflow-hidden rounded-md bg-gray-300">
            <Image
              src={cellValue || "/default-image.jpg"}
              alt="Shop Picture"
              layout="fill"
              objectFit="cover"
              unoptimized
            />
          </div>
        );
      case "yearOfService":
        return `${new Date().getFullYear() - data.yearOfService} years`;
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="mt-4 flex gap-4 mb-5">
        <button
          onClick={() => {
            setPriceSortDirection(null);
            setSortDescriptor({ column: "rating", direction: "descending" });
          }}
          className={`rounded-full border-gray-300 border-solid text-[13px] border-[2px] px-3 py-1 flex gap-x-2 items-center 
            ${sortDescriptor.column === "rating" && !priceSortDirection ? "bg-gray-300 text-white" : ""}`}
        >
          <FaStar className="text-yellow-500" />
          <span>Top Rated</span>
        </button>
        <button
          onClick={() => {
            setPriceSortDirection("ascending");
            setSortDescriptor({ column: "price", direction: "ascending" });
          }}
          className={`rounded-full border-gray-300 border-solid text-[13px] border-[2px] px-3 py-1 
            ${priceSortDirection === "ascending" ? "bg-gray-300 text-white" : ""}`}
        >
          Price: Low to High
        </button>
        <button
          onClick={() => {
            setPriceSortDirection("descending");
            setSortDescriptor({ column: "price", direction: "descending" });
          }}
          className={`rounded-full border-gray-300 border-solid text-[13px] border-[2px] px-3 py-1 
            ${priceSortDirection === "descending" ? "bg-gray-300 text-white" : ""}`}
        >
          Price: High to Low
        </button>
      </div>

      <Table
        aria-label="Example table with custom cells"
        removeWrapper
        isCompact
        sortDescriptor={sortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              className={cn(
                "px-3 py-2",
                column.sortable ? "cursor-pointer" : "",
                sortDescriptor.column === column.uid ? "text-[#D8BA74]" : ""
              )}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"Shops are loading... Please wait"}
          items={sortedShops}
        >
          {(item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer hover:bg-gray-100"
              as={Link}
              href={`/shops/${item.id}`}
            >
              {(columnKey) => (
                <TableCell
                  className={cn(
                    "mx-3",
                    columnKey === "picture" ? "w-32" : ""
                  )}
                >
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
