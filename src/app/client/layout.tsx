import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "ElectronicStore CRM",
};

export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <div className="es-client flex min-h-screen flex-col bg-es-background font-es-body-md text-es-body-md text-es-on-background">
      {children}
    </div>
  );
}
