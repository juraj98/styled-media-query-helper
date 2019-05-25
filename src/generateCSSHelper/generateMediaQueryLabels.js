export default function generateMediaQueryLabels({ start, end }) {
  const minWidth = start === 0 ? "" : `(min-width: ${start}px)`;
  const maxWidth = end === Infinity ? "" : `(max-width: ${end}px)`;
  const join = minWidth && maxWidth ? " and " : "";

  return `@media ${minWidth}${join}${maxWidth}`;
}
