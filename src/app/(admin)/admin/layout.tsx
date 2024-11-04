"use client";

import { api } from "@/api/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getUserSession } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [cognitoId, setCognitoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const id = await getUserSession();
        setCognitoId(id);
        await authenticateAdmin(id);
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  const authenticateAdmin = async (id: string) => {
    try {
      const response = await api.post("/read/admin-profile", {
        cognitoId: id,
        email: null,
      });
      if (response.data.isAdmin) {
        return true;
      }
      throw new Error("Admin not authenticated");
    } catch (error) {
      console.error("Error authenticating admin profile:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Alert>
          <AlertTitle>Loading...</AlertTitle>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminLayout;
