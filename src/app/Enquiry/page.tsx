import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EnquiriesPage from "@/components/EnquiriesPage";

export const metadata: Metadata = {
  title: "Vaikunth",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <EnquiriesPage />
    </DefaultLayout>
  );
};

export default CalendarPage;
