import { NextRequest, NextResponse } from "next/server";
import {
  verifyAccessToken,
  getAccessTokenFromCookies,
  getRefreshTokenFromCookies,
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
  generateTokenId,
} from "@/lib/jwt";

// Rotas que não precisam de autenticação
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
  "/api/lens-types",
  "/api/complete-order",
];

// Rotas que precisam de autenticação
const protectedRoutes = [
  "/dashboard",
  "/my-area",
  "/api/orders",
  "/api/profile",
];

// Rotas de admin
const adminRoutes = ["/dashboard", "/api/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se é uma rota pública
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    // Tentar obter o access token dos cookies
    const accessToken = await getAccessTokenFromCookies();

    if (!accessToken) {
      // Se não há access token, tentar refresh token
      const refreshToken = await getRefreshTokenFromCookies();

      if (!refreshToken) {
        // Redirecionar para login se não há tokens
        return redirectToLogin(request);
      }

      // Tentar renovar o access token
      try {
        const refreshPayload = await verifyRefreshToken(refreshToken);

        // Gerar novos tokens
        const newAccessToken = await createAccessToken({
          userId: refreshPayload.userId,
          email: "", // Será preenchido pelo banco
          role: "", // Será preenchido pelo banco
        });

        const newRefreshToken = await createRefreshToken({
          userId: refreshPayload.userId,
          tokenId: generateTokenId(),
        });

        // Criar nova resposta com os cookies atualizados
        const response = NextResponse.next();

        // Definir os novos cookies
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 15 * 60, // 15 minutos
          path: "/",
        });

        response.cookies.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60, // 7 dias
          path: "/",
        });

        return response;
      } catch (error) {
        // Refresh token inválido, redirecionar para login
        return redirectToLogin(request);
      }
    }

    // Verificar o access token
    const payload = await verifyAccessToken(accessToken);

    // Verificar se é rota de admin e se o usuário é admin
    if (isAdminRoute && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/my-area", request.url));
    }

    // Adicionar informações do usuário aos headers para uso nas rotas
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-email", payload.email);
    requestHeaders.set("x-user-role", payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Token inválido, redirecionar para login
    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
