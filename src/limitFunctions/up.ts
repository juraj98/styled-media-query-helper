import { BreakpointNameType, IFullBreakpoint } from "../definitions";

export default function up(
  breakpoints: IFullBreakpoint[],
  breakpointName: BreakpointNameType,
) {
  let foundRuleBreakpoint = false;

  const correctBreakpoints = breakpoints.filter(breakpoint => {
    if (foundRuleBreakpoint) return true;
    if (breakpoint.name === breakpointName) foundRuleBreakpoint = true;
    return false;
  });

  return correctBreakpoints;
}
