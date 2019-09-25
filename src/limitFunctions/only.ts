import { BreakpointNameType, IFullBreakpoint } from "../index.d";

export default function only(breakpoints: IFullBreakpoint[], breakpointName: BreakpointNameType) {
  return breakpoints.filter(breakpoint => breakpoint.name === breakpointName);
}
