import { BreakpointNameType, IFullBreakpoint } from "../index.d";

export default function not(
  breakpoints: IFullBreakpoint[],
  breakpointName: BreakpointNameType,
) {
  return breakpoints.filter(breakpoint => breakpoint.name !== breakpointName);
}
