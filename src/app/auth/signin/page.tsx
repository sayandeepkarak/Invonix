"use client";

import dynamic from "next/dynamic";

const AuthSignInForm = dynamic(() => import("@/features/auth/components").then(mod => mod.AuthSignInForm), {
  ssr: false,
});

export default function LoginPage() {
  return <AuthSignInForm />;
}
