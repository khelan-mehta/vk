import SignIn from "@/components/signin"; // Import the client-side component

export const metadata = {
  title: "Vaikunth",
  description: "This is Next.js SignIn Page TailAdmin Dashboard Template",
};

export default function SignInPage() {
  return (
    <div>
      <SignIn /> {/* Render the client component */}
    </div>
  );
}
