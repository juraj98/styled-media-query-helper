import { css } from "styled-components";
import compressBreakpoints from "./compressBreakpoints";
import generateMediaQueryLabels from "./generateMediaQueryLabels";
import { IFullBreakpoint, IBreakpointConditions } from "../definitions";

export default function generateCSSHelper(
  breakpoints: IFullBreakpoint[],
  conditions: IBreakpointConditions,
  literals: TemplateStringsArray,
  ...placeholders: any[]
) {
  if (conditions.and === false) return null;

  const generatedCSS = css(literals, ...placeholders);

  return compressBreakpoints(breakpoints)
    .map(generateMediaQueryLabels)
    .map(mediaQueryLabel =>
      conditions.or
        ? generatedCSS
        : css`
            ${mediaQueryLabel} {
              ${generatedCSS}
            }
          `,
    );
}
