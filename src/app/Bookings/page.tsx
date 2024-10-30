import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BookingPage from "@/components/BookingPage";

export const metadata: Metadata = {
  title: "Vaikunth",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const BookingsPage = () => {
  return (
    <DefaultLayout>
      <BookingPage />
    </DefaultLayout>
  );
};

export default BookingsPage;
