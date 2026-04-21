"use client";

import dynamic from "next/dynamic";

const AuthSignInForm = dynamic(() => import("@/features/auth/components").then(mod => mod.AuthSignInForm), {
  ssr: false,
  loading: () => <div className="h-96 w-full animate-pulse bg-muted rounded-xl" />
});

export default function LoginPage() {
  return <AuthSignInForm />;
}
