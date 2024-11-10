// "use client";

// import { ShopType } from "@/app/(admin)/admin/page";
// import { cn } from "@/lib/utils";
// import { X } from "lucide-react";
// import React, { ReactNode, useState } from "react";
// import { Badge } from "../ui/badge";
// import { ModalBoxShopDataStruct } from "@/config/constant";

// interface ModalBoxPropTypes {
//   openModal: boolean;
//   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
//   data: ShopType | undefined;
// }

// // Define a type for all possible data values that could come from ShopType
// type ShopDataValue = string | number | string[] | 
//   { startDate: string; endDate: string }[] | // ClosingDateRange[]
//   { id: string; items: any[] }[] | // Order[]
//   { date: string; amount: number }[] | // SalesData[]
//   { rating: number; comment: string }[]; // ReviewType[]

// interface ModalItemProps {
//   label: string;
//   data: ShopDataValue;
//   children?: ReactNode;
// }

// const ModalItem = ({ label, data, children }: ModalItemProps) => {
//   // Helper function to format complex data types into displayable strings
//   const formatData = (data: ShopDataValue): string => {
//     if (Array.isArray(data)) {
//       if (data.length === 0) return "-";
//       // Check if it's a simple string array
//       if (typeof data[0] === "string") return data.join(", ");
//       // For complex objects, return the length
//       return `${data.length} items`;
//     }
//     return String(data);
//   };

//   return (
//     <div className="flex items-center gap-1 py-2">
//       <h3 className="font-semibold">{label}:</h3>
//       {children ? children : <p>{formatData(data)}</p>}
//     </div>
//   );
// };

// const ModalBox = ({ openModal, setOpenModal, data }: ModalBoxPropTypes) => {
//   if (!openModal) return null;

//   return (
//     <div
//       className={cn(
//         "fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-300",
//         {
//           hidden: !openModal,
//         }
//       )}
//       onClick={() => setOpenModal(false)}
//     >
//       <div
//         className="w-1/2 rounded-md bg-white py-2 shadow-lg"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between border-b border-gray-300 px-4 py-3">
//           <h2 className="text-lg font-medium text-gray-900">
//             {data?.shopName}
//           </h2>
//           <button onClick={() => setOpenModal(false)}>
//             <X />
//           </button>
//         </div>
//         <div className="grid grid-cols-2 gap-2 p-5">
//           {ModalBoxShopDataStruct.map((item, index) => {
//             const itemData = data ? (data[item.key as keyof ShopType] ?? "-") : "-";
            
//             return (
//               <ModalItem
//                 key={index}
//                 label={item.title}
//                 data={itemData as ShopDataValue}
//               >
//                 {item.key === "status" && (
//                   <Badge
//                     variant="destructive"
//                     style={{
//                       background:
//                         data?.status === "APPROVED" ? "#28a745" : "",
//                     }}
//                   >
//                     {data?.status}
//                   </Badge>
//                 )}
//               </ModalItem>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalBox;