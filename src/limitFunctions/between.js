export default function between(
  breakpoints,
  startBreakpointName,
  endBreakpointName
) {
  let foundStartBreakpoint = false;
  let foundEndBreakpoint = false;

  const correctBreakpoints = breakpoints.filter(breakpoint => {
    if (breakpoint.name === endBreakpointName) foundEndBreakpoint = true;

    const includeThisBreakpoint = foundStartBreakpoint && !foundEndBreakpoint;

    if (breakpoint.name === startBreakpointName) foundStartBreakpoint = true;

    return includeThisBreakpoint;
  });

  return correctBreakpoints;
}
