export const isAdmin = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("admin") === "true";
};
