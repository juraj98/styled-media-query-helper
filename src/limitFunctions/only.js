export default function only(breakpoints, breakpointName) {
  return breakpoints.filter(breakpoint => breakpoint.name === breakpointName);
}
