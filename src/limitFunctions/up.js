export default function up(breakpoints, breakpointName) {
  let foundRuleBreakpoint = false;

  const correctBreakpoints = breakpoints.filter(breakpoint => {
    if (foundRuleBreakpoint) return true;
    if (breakpoint.name === breakpointName) foundRuleBreakpoint = true;
    return false;
  });

  return correctBreakpoints;
}
