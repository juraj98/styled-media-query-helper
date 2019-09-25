import { BreakpointNameType, IFullBreakpoint } from "../index.d";

export default function outsideAnd(breakpoints: IFullBreakpoint[], startBreakpointName: BreakpointNameType, endBreakpointName: BreakpointNameType) {
  let foundStartBreakpoint = false;
  let foundEndBreakpoint = false;

  return breakpoints.filter(breakpoint => {
    if (breakpoint.name === endBreakpointName) foundEndBreakpoint = true;

    const includeThisBreakpoint = !foundStartBreakpoint || foundEndBreakpoint;

    if (breakpoint.name === startBreakpointName) foundStartBreakpoint = true;

    return includeThisBreakpoint;
  });
}
