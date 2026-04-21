"use client";

import dynamic from "next/dynamic";

const AuthSignupForm = dynamic(() => import("@/features/auth/components").then(mod => mod.AuthSignupForm), {
  ssr: false,
});

export default function SignupPage() {
  return <AuthSignupForm />;
}
