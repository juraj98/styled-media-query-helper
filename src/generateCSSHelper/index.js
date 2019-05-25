import { css } from "styled-components";
import compressBreakpoints from "./compressBreakpoints";
import generateMediaQueryLabels from "./generateMediaQueryLabels";

export default function generateCSSHelper(breakpoints, args) {
  return compressBreakpoints(breakpoints)
    .map(generateMediaQueryLabels)
    .map(mediaQueryLabel => `${mediaQueryLabel} {${css(...args)}}`);
}
