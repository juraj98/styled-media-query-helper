import { BreakpointNameType, IFullBreakpoint } from "../index.d";

export default function downAnd(
  breakpoints: IFullBreakpoint[],
  breakpointName: BreakpointNameType,
) {
  let foundRuleBreakpoint = false;

  const correctBreakpoints = breakpoints.filter(breakpoint => {
    const includeThisBreakpoint = !foundRuleBreakpoint;
    if (breakpoint.name === breakpointName) foundRuleBreakpoint = true;
    return includeThisBreakpoint;
  });

  return correctBreakpoints;
}
