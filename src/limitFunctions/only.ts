import { BreakpointNameType, IFullBreakpoint } from "../definitions";

export default function only(
  breakpoints: IFullBreakpoint[],
  breakpointName: BreakpointNameType,
) {
  return breakpoints.filter(breakpoint => breakpoint.name === breakpointName);
}
