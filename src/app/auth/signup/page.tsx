"use client";

import dynamic from "next/dynamic";

const AuthSignupForm = dynamic(() => import("@/features/auth/components").then(mod => mod.AuthSignupForm), {
  ssr: false,
  loading: () => <div className="h-96 w-full animate-pulse bg-muted rounded-xl" />
});

export default function SignupPage() {
  return <AuthSignupForm />;
}
