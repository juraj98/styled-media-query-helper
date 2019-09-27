import { BreakpointNameType, IFullBreakpoint } from "../definitions";

export default function upAnd(
  breakpoints: IFullBreakpoint[],
  breakpointName: BreakpointNameType,
) {
  let foundRuleBreakpoint = false;

  const correctBreakpoints = breakpoints.filter(breakpoint => {
    if (breakpoint.name === breakpointName) foundRuleBreakpoint = true;
    return foundRuleBreakpoint;
  });

  return correctBreakpoints;
}
