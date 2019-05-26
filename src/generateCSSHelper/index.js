import { css } from "styled-components";
import compressBreakpoints from "./compressBreakpoints";
import generateMediaQueryLabels from "./generateMediaQueryLabels";

export default function generateCSSHelper(breakpoints, args, conditions) {
  if (conditions.and === false) return null;

  const generatedCSS = css(...args);

  return compressBreakpoints(breakpoints)
    .map(generateMediaQueryLabels)
    .map(mediaQueryLabel =>
      conditions.or
        ? generatedCSS
        : css`
            ${mediaQueryLabel} {
              ${generatedCSS}
            }
          `
    );
}
