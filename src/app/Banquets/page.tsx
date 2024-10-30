import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BanquetPage from "@/components/BanquetPage";

export const metadata: Metadata = {
  title: "Vaikunth",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const BanquetsPage = () => {
  return (
    <DefaultLayout>
      <BanquetPage />
    </DefaultLayout>
  );
};

export default BanquetsPage;
