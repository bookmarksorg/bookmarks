import { withAuth } from "next-auth/middleware";

export default withAuth({ pages: { signIn: "/login" } });

export const config = {
    matcher: ["/home/:path*", "/profile/:path*", "/library/:path*", "/books/:path*", "/discussions/:path*"],
};
