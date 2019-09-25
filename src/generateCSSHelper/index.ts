import { css } from "styled-components";
import compressBreakpoints from "./compressBreakpoints";
import generateMediaQueryLabels from "./generateMediaQueryLabels";
import { IFullBreakpoint, IBreakpointConditions } from "../index.d";

export default function generateCSSHelper(breakpoints: IFullBreakpoint[], args, conditions: IBreakpointConditions) {
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
