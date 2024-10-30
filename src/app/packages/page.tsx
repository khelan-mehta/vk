import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Packages from "@/components/Packages";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vaikunth",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <Packages />
    </DefaultLayout>
  );
};

export default Profile;
