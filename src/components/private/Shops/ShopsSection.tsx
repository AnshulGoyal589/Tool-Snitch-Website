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
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

import useWindowSize from "react-use/lib/useWindowSize";

export default function ShopsSection({shops}: {shops: Shop[]}) {
  return (
    <div className="mt-4">
      <ShopsTable shops={shops}/>
    </div>
  );
}

const columns = [
  { uid: "shopName", name: "Shop Name", sortable: true },
  { uid: "rating", name: "Rating", sortable: true },
  { uid: "picture", name: "Picture" },
  { uid: "location", name: "Location" },
  { uid: "aproximateDistance", name: "Distance", sortable: true },
  { uid: "yearOfService", name: "Year of Service", sortable: true },
];

// const shops = [
//     {
//         id: 1,
//         shopName: "A Very Very Very Very Very Very Very Long Shop Name Pvt. Ltd.",
//         rating: 4,
//         picture: "https://randomuser.me/api/port",
//         location: "A- 577, Street No. -12, Tyagi Rd, Bank Colony, Mandoli Extension, Delhi, 110093",
//         aproximateDistance: "1.5 km",
//         yearOfService: 2,
//       },
//   {
//     id: 1,
//     shopName: "A Very Very Very Very Very Very Very Long Shop Name Pvt. Ltd.",
//     rating: 4,
//     picture: "https://randomuser.me/api/port",
//     location: "A- 577, Street No. -12, Tyagi Rd, Bank Colony, Mandoli Extension, Delhi, 110093",
//     aproximateDistance: "1.5 km",
//     yearOfService: 2,
//   },
//   {
//     id: 1,
//     shopName: "A Very Very Very Very Very Very Very Long Shop Name Pvt. Ltd.",
//     rating: 4,
//     picture: "https://randomuser.me/api/port",
//     location: "A- 577, Street No. -12, Tyagi Rd, Bank Colony, Mandoli Extension, Delhi, 110093",
//     aproximateDistance: "1.5 km",
//     yearOfService: 2,
//   },
// ];

type Shop = {
  id: number;
  shopName: string;
  rating: number;
  picture: string;
  location: string;
  aproximateDistance: string;
  yearOfService: number;
};

const INITIAL_VISIBLE_COLUMNS = [
  "shopName",
  "rating",
  "picture",
  "location",
  "aproximateDistance",
    "yearOfService",
];

const MOBILE_COLUMNS = [
    "shopName",
    "rating",
    "picture",
    // "location",
    "aproximateDistance"
];

function ShopsTable({shops}: {shops: Shop[]}) {

    
    
    
    
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "rating",
        direction: "ascending",
    });
    
    const { width } = useWindowSize();

    useEffect(() => {
        if (width < 768) {
            setVisibleColumns(new Set(MOBILE_COLUMNS));
        } else {
            setVisibleColumns(new Set(INITIAL_VISIBLE_COLUMNS));
        }
    }, [width]);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const renderCell = useCallback((data: any, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof Shop];

    switch (columnKey) {
      case "rating":
        return (
          <>
            <span className="hidden items-center gap-1 lg:flex justify-center">
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
              {/* <span>{data.rating}</span> */}
            </span>
            <span className="flex items-center gap-1 lg:hidden">
              <FaStar className="text-yellow-500" size={18} />
              <span>{parseFloat(data.rating).toFixed(1)}</span>
            </span>
          </>
        );
      case "picture":
        return (
          <div className="relative aspect-video w-32 overflow-hidden rounded-md bg-gray-300 mb-2">
            <Image
                src={cellValue}
                alt="Shop Picture"
                layout="fill"
                objectFit="cover"
                unoptimized
            />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);





       

  return (
    <Table
      aria-label="Example table with custom cells"
      removeWrapper
      isCompact
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns} className="">
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
      <TableBody emptyContent={"Shops are loading... Please wait"} items={shops}>
        {(item) => (
          <TableRow key={item.id} className="hover:bg-gray-100 cursor-pointer" as={Link} href={`/shops/${item.id}`}>
            {(columnKey) => <TableCell
            className={cn(
                "mx-3",
                columnKey === "picture" ? "w-32" : "",
                columnKey === "rating" ? "" : ""
            )}
            >{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
