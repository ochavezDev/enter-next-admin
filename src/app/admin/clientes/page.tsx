import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ClientesPage } from "@/components/Clientes/clientes-page";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clientes",
};

const Clientes = () => {
  return (
    <>
      <Breadcrumb pageName="Clientes" />

      <ClientesPage />
    </>
  );
};

export default Clientes;
