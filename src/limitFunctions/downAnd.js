export default function downAnd(breakpoints, breakpointName) {
  let foundRuleBreakpoint = false;

  const correctBreakpoints = breakpoints.filter(breakpoint => {
    const includeThisBreakpoint = !foundRuleBreakpoint;
    if (breakpoint.name === breakpointName) foundRuleBreakpoint = true;
    return includeThisBreakpoint;
  });

  return correctBreakpoints;
}
