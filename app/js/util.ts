export function padNum(str: string, len: number): string {
  while (str.length < len) {
    str = '0' + str;
  }
  return str;
}