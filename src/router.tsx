import React from "react";
import { useRoutes } from "react-router-dom";
import Spinner from "./common/widgets";

// Dynamically import all .tsx files from /pages
const pages = import.meta.glob("./pages/**/*.tsx");

// Convert path to route
const routes = Object.keys(pages).map((path) => {
  const routePath = path
    .replace("./pages", "") // remove prefix
    .replace(/\/index\.tsx$/, "/") // index.tsx = root path
    .replace(/\.tsx$/, "") // remove file extension
    .replace(/\[\.{3}(.*)\]/, "*") // catch-all [..slug]
    .replace(/\[(.*)\]/, ":$1"); // dynamic segments like [id] → :id

  return {
    path: routePath === "" ? "/" : routePath,
    element: React.createElement(
      React.lazy(pages[path] as any) as React.ComponentType
    ),
  };
});

export const AppRoutes = () => {
  const element = useRoutes(routes);
  return (
    <React.Suspense
      fallback={
        <div>
          <Spinner></Spinner>
        </div>
      }
    >
      {element}
    </React.Suspense>
  );
};
