import { BreakpointNameType, IFullBreakpoint } from "../index.d";

export default function between(
  breakpoints: IFullBreakpoint[],
  startBreakpointName: BreakpointNameType,
  endBreakpointName: BreakpointNameType,
) {
  let foundStartBreakpoint = false;
  let foundEndBreakpoint = false;

  const correctBreakpoints = breakpoints.filter(breakpoint => {
    let includeThisBreakpoint = foundStartBreakpoint && !foundEndBreakpoint;

    if (breakpoint.name === startBreakpointName) {
      foundStartBreakpoint = true;
      includeThisBreakpoint = true;
    }
    if (breakpoint.name === endBreakpointName) foundEndBreakpoint = true;

    return includeThisBreakpoint;
  });

  return correctBreakpoints;
}
