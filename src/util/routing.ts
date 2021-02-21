import type { NextPageContext } from "next";
import { BaseRouter } from "next/dist/next-server/lib/router/router";
import Router from "next/router";
import { curry } from "ramda";

export const redirect = ({
  ctx,
  location,
  condition,
}: {
  ctx?: Omit<NextPageContext, "store">;
  location: string;
  condition?(route: string): boolean;
}): void => {
  const route = ctx?.req?.url ?? Router.route;
  if (typeof condition === "function" && !condition(route)) {
    return;
  }
  if (ctx?.res) {
    if (route === location) {
      return;
    }
    ctx.res.writeHead(302, { Location: location }).end();
    return;
  }

  void Router.replace(location).catch();
};

export const isProtectedRoute = (route: string) =>
  !/^\/(?:auth|m)\/.*/g.test(route);

export const getParam = curry((key: string, query: BaseRouter["query"]):
  | string
  | undefined =>
  Array.isArray(query[key]) ? query[key]?.[0] : (query[key] as string)
);
