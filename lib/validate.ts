export interface Customer {
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export function validateCustomer(c: Partial<Customer>): Record<string, string> {
  const e: Record<string, string> = {};
  const s = (v?: string) => (v ?? "").trim();
  if (s(c.name).length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s(c.email))) e.email = "Please enter a valid email.";
  if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(s(c.phone).replace(/[\s-]/g, ""))) e.phone = "Enter a valid 10-digit mobile number.";
  if (s(c.address1).length < 5) e.address1 = "Please enter your house no. and street.";
  if (s(c.city).length < 2) e.city = "Please enter your city.";
  if (!INDIAN_STATES.includes(s(c.state))) e.state = "Please choose your state.";
  if (!/^[1-9]\d{5}$/.test(s(c.pincode))) e.pincode = "Enter a valid 6-digit PIN code.";
  return e;
}
