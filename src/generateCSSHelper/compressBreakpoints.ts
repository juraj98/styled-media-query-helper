import { IFullBreakpoint, INamelessBreakpoint } from "../definitions";

export default function compressBreakpoints(breakpoints: IFullBreakpoint[]) {
  const sortedBreakpoints = breakpoints.sort(
    (a: IFullBreakpoint, b: IFullBreakpoint) => a.rangeStart - b.rangeStart,
  );

  const newBreakpoints: INamelessBreakpoint[] = [];
  let newBreakpointStart: number | null = null;

  sortedBreakpoints.forEach((breakpoint: IFullBreakpoint, index: number) => {
    // Check for start
    if (newBreakpointStart === null) newBreakpointStart = breakpoint.rangeStart;

    // Check for end

    if (
      breakpoints[index + 1] &&
      breakpoint.rangeEnd + 1 !== breakpoints[index + 1].rangeStart
    ) {
      newBreakpoints.push({
        start: newBreakpointStart,
        end: breakpoint.rangeEnd,
      });

      newBreakpointStart = null;
    }
  });

  return newBreakpoints;
}
