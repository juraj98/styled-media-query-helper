import { BreakpointNameType, IFullBreakpoint } from "../definitions";

export default function between(
  breakpoints: IFullBreakpoint[],
  startBreakpointName: BreakpointNameType,
  endBreakpointName: BreakpointNameType,
) {
  let foundStartBreakpoint = false;
  let foundEndBreakpoint = false;

  const correctBreakpoints = breakpoints.filter(breakpoint => {
    if (breakpoint.name === endBreakpointName) foundEndBreakpoint = true;

    const includeThisBreakpoint = foundStartBreakpoint && !foundEndBreakpoint;

    if (breakpoint.name === startBreakpointName) foundStartBreakpoint = true;

    return includeThisBreakpoint;
  });

  return correctBreakpoints;
}
