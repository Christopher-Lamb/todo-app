export { default as generateUID } from "./generateUID";
export { default as moveItemDND } from "./moveItemDND";

const isDevelopment = process.env.NODE_ENV === "development";
const basePath = isDevelopment ? "" : "/todo-app";

export function navigateTo(page: string) {
  location.href = `${basePath}/${page}`;
}
