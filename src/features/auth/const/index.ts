export const SIGNUP_STEPS = Object.freeze({
  BASIC_INFO: "basic_info",
  EMAIL_VERIFICATION: "email_verification",
  BUSINESS_DETAILS: "business_details",
  COMPLETE: "complete",
})

export const SIGNUP_STEP_LABELS: Readonly<Array<string>> = Object.freeze([
  "Basic Info",
  "Verify Email",
  "Business Details",
  "Complete",
])

export const DEMO_OTP = "123456"

export interface BusinessTypeOption {
  label: string
  value: string
}

export const BUSINESS_TYPES: Readonly<Array<BusinessTypeOption>> = Object.freeze([
  { label: "Retail", value: "Retail" },
  { label: "Wholesale", value: "Wholesale" },
  { label: "Manufacturing", value: "Manufacturing" },
  { label: "Distribution", value: "Distribution" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "Food & Beverage", value: "Food & Beverage" },
  { label: "Other", value: "Other" },
])
