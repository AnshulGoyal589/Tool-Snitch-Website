"use client";

import { ShopType } from "@/app/(admin)/admin/page";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { Badge } from "../ui/badge";
import { ModalBoxShopDataStruct } from "@/config/constant";

interface ModalBoxPropTypes {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: ShopType | undefined;
}

const ModalItem = ({
  label,
  data,
  children,
}: {
  label: string;
  data: string | string[] | number;
  children?: ReactNode;
}) => {
  return (
    <>
      <div className="flex items-center gap-1 py-2">
        <h3 className="font-semibold">{label}:</h3>
        {children ? children : <p>{data}</p>}
      </div>
    </>
  );
};

const ModalBox = ({ openModal, setOpenModal, data }: ModalBoxPropTypes) => {
  if (!openModal) return null;

  return (
    <>
      <div
        className={cn(
          "fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-300",
          {
            hidden: !openModal,
          }
        )}
        onClick={() => setOpenModal(false)}
      >
        <div
          className="w-1/2 rounded-md bg-white py-2 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-gray-300 px-4 py-3">
            <h2 className="text-lg font-medium text-gray-900">
              {data?.shopName}
            </h2>
            <button onClick={() => setOpenModal(false)}>
              <X />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 p-5">
            {ModalBoxShopDataStruct.map((item, index) => {
              return (
                <ModalItem
                  key={index}
                  label={item.title}
                  data={
                    item.key in data! ? data![item.key as keyof ShopType]! : "-"
                  }
                >
                  {item.key === "status" && (
                    <Badge
                      variant="destructive"
                      style={{
                        background:
                          data?.status === "APPROVED" ? "#28a745" : "",
                      }}
                    >
                      {data?.status}
                    </Badge>
                  )}
                </ModalItem>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBox;
