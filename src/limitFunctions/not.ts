import { BreakpointNameType, IFullBreakpoint } from "../definitions";

export default function not(
  breakpoints: IFullBreakpoint[],
  breakpointName: BreakpointNameType,
) {
  return breakpoints.filter(breakpoint => breakpoint.name !== breakpointName);
}
