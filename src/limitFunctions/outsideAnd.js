export default function outsideAnd(
  breakpoints,
  startBreakpointName,
  endBreakpointName
) {
  let foundStartBreakpoint = false;
  let foundEndBreakpoint = false;

  return breakpoints.filter(breakpoint => {
    if (breakpoint.name === endBreakpointName) foundEndBreakpoint = true;

    const includeThisBreakpoint = !foundStartBreakpoint || foundEndBreakpoint;

    if (breakpoint.name === startBreakpointName) foundStartBreakpoint = true;

    return includeThisBreakpoint;
  });
}
