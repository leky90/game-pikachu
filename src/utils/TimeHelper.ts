export function timeConvert(num: number) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0")
  );
}
