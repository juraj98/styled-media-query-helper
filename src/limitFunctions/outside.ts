import { BreakpointNameType, IFullBreakpoint } from "../definitions";

export default function outside(
  breakpoints: IFullBreakpoint[],
  startBreakpointName: BreakpointNameType,
  endBreakpointName: BreakpointNameType,
) {
  let foundStartBreakpoint = false;
  let foundEndBreakpoint = false;

  return breakpoints.filter(breakpoint => {
    if (breakpoint.name === startBreakpointName) foundStartBreakpoint = true;

    const includeThisBreakpoint = !foundStartBreakpoint || foundEndBreakpoint;

    if (breakpoint.name === endBreakpointName) foundEndBreakpoint = true;

    return includeThisBreakpoint;
  });
}
