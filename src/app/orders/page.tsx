import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrdersComponents from "@/components/OrdersComponent";
import Link from "next/link";
import OrdersComponent from "@/components/OrdersComponent";

export const metadata: Metadata = {
  title: "Vaikunth",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <OrdersComponents />
    </DefaultLayout>
  );
};

export default Profile;
