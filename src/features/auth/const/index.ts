import { BusinessTypeOption } from "@/features/auth/types";

export const SIGNUP_STEPS = Object.freeze({
  BASIC_INFO: "basic_info",
  EMAIL_VERIFICATION: "email_verification",
  BUSINESS_DETAILS: "business_details",
  COMPLETE: "complete",
} as const);

export const SIGNUP_STEP_LABELS = Object.freeze([
  "Basic Info",
  "Verify Email",
  "Business Details",
  "Complete",
] as const);

export const BUSINESS_TYPE = Object.freeze({
  RETAIL: "Retail",
  WHOLESALE: "Wholesale",
  MANUFACTURING: "Manufacturing",
  DISTRIBUTION: "Distribution",
  ECOMMERCE: "E-commerce",
  FOOD_BEVERAGE: "Food & Beverage",
  OTHER: "Other",
} as const);

export const BUSINESS_TYPES: ReadonlyArray<BusinessTypeOption> = Object.freeze(
  Object.values(BUSINESS_TYPE).map((type) => ({
    label: type,
    value: type,
  })),
);

export const DEMO_OTP = "123456";
export const SESSION_STORAGE_KEY = "invonix_session_active";
export const REDIRECT_TIMEOUT = 5000;
