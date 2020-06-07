import { NextPageContext } from "next";
import Router from "next/router";

export const redirect = ({
  ctx,
  location,
  condition,
}: {
  ctx: Omit<NextPageContext, "store">;
  location: string;
  condition?(route: string): boolean;
}): void => {
  // server
  const route = ctx.req?.url ?? Router.route;
  if (typeof condition === "function" && !condition(route)) {
    return;
  }
  if (ctx.res) {
    if (route === location) {
      return;
    }
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
    return;
  }

  void Router.replace(location).catch();
};
