export { default } from "next-auth/middleware";

export const config = { matcher: ["/student", "/student/:path*"] };
