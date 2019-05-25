export default function not(breakpoints, breakpointName) {
  return breakpoints.filter(breakpoint => breakpoint.name !== breakpointName);
}
