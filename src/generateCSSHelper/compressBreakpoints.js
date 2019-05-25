export default function compressBreakpoints(breakpoints) {
  const sortedBreakpoints = breakpoints.sort(
    (a, b) => a.rangeStart - b.rangeStart
  );

  const newBreakpoints = [];
  let newBreakpointStart = null;

  sortedBreakpoints.forEach((breakpoint, index) => {
    // Check for start
    if (newBreakpointStart === null) newBreakpointStart = breakpoint.rangeStart;

    // Check for end
    if (breakpoint.rangeEnd + 1 !== breakpoints[index + 1]?.rangeStart) {
      newBreakpoints.push({
        start: newBreakpointStart,
        end: breakpoint.rangeEnd
      });

      newBreakpointStart = null;
    }
  });

  return newBreakpoints;
}
