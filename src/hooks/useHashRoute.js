import { useState, useEffect } from "react";

export function useHashRoute(defaultRoute = "home") {
  const [route, setRoute] = useState(() => {
    const h = window.location.hash.replace("#/", "").replace("#", "");
    return h || defaultRoute;
  });

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#/", "").replace("#", "");
      setRoute(h || defaultRoute);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return [
    route,
    (r) => (window.location.hash = r.startsWith("#") ? r : "#/" + r),
  ];
}
