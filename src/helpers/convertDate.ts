export function convertDate(value: string) {
  const date = new Date(value);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
