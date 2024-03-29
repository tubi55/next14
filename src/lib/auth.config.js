export const authConfig = {
	pages: { signIn: '/login' },
	providers: [],
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.id = user.id;
			return token;
		},
		async session({ session, token }) {
			if (token) session.user.id = token.id;
			return session;
		},
		authorized({ auth, request }) {
			const user = auth?.user;
			const isPostPage = request.nextUrl?.pathname.startsWith('/post');
			const isLoginPage = request.nextUrl?.pathname.startsWith('/login');

			if (isPostPage && !user) return false;
			if (isLoginPage && user) return Response.redirect(new URL('/', request.nextUrl));
			return true;
		}
	}
};
