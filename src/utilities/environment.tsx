
console.log(process.env.NEXT_PUBLIC_API_URL)
const nextPublicApiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!nextPublicApiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}
export const NEXT_PUBLIC_API_URL = nextPublicApiUrl;