import {
  BreakpointNameType,
  ILooseBreakpoint,
  IFullBreakpoint,
} from "./index.d";

export function getCheckBreakpointName() {
  const usedBreakpointNames: BreakpointNameType[] = [];
  return (breakpoint: ILooseBreakpoint, index: number) => {
    const { name } = breakpoint;

    if (typeof name !== "string") {
      throw new Error(
        `Breakpoint with index ${index} has invalid name. Expected type string, received ${typeof name}.`,
      );
    }

    if (usedBreakpointNames.includes(name)) {
      throw new Error(
        `Breakpoints must have unique names. ${name} is used more than once.`,
      );
    }

    if (name === "__firstBreakpoint" || name === "__lastBreakpoint") {
      throw new Error(
        "Breakpoint cannot have name '__firstBreakpoint' or '__lastBreakpoint'",
      );
    }

    usedBreakpointNames.push(name);
    return breakpoint;
  };
}

export function getCheckAndNormalizeRanges() {
  let breakpointWithoutStart: BreakpointNameType | null = null;
  let breakpointWithoutEnd: BreakpointNameType | null = null;

  return (breakpoint: ILooseBreakpoint): IFullBreakpoint => {
    const newBreakpoint = { ...breakpoint };

    const isRangeStartMissing =
      newBreakpoint.rangeStart === undefined ||
      newBreakpoint.rangeStart === null;
    const isRangeEndMissing =
      newBreakpoint.rangeEnd === undefined || newBreakpoint.rangeEnd === null;

    if (isRangeStartMissing && isRangeEndMissing) {
      throw new Error(
        `Breakpoint ${newBreakpoint.name} is missing both rangeStart and rangeEnd.`,
      );
    }

    if (isRangeStartMissing) {
      if (breakpointWithoutStart) {
        throw new Error(
          `There can be only one breakpoint withou rangeStart. ${breakpointWithoutStart} and ${newBreakpoint.name} are both missing rangeStart.`,
        );
      } else {
        breakpointWithoutStart = newBreakpoint.name;
        newBreakpoint.rangeStart = 0;
      }
    }

    if (isRangeEndMissing) {
      if (breakpointWithoutEnd) {
        throw new Error(
          `There can be only one breakpoint withou rangeEnd. ${breakpointWithoutEnd} and ${newBreakpoint.name} are both missing rangeEnd.`,
        );
      } else {
        breakpointWithoutEnd = newBreakpoint.name;
        newBreakpoint.rangeEnd = Infinity;
      }
    }

    if (typeof newBreakpoint.rangeStart !== "number") {
      throw new Error(
        `Breakpoint ${
          newBreakpoint.name
        } has invalid rangeStart type. Expected number, received ${typeof newBreakpoint.rangeStart}.`,
      );
    }

    if (typeof newBreakpoint.rangeEnd !== "number") {
      throw new Error(
        `Breakpoint ${
          newBreakpoint.name
        } has invalid rangeEnd type. Expected number, received ${typeof newBreakpoint.rangeEnd}.`,
      );
    }

    if (newBreakpoint.rangeStart < 0) {
      throw new Error(
        `Breakpoint ranges must be greater than 0. startRange for ${newBreakpoint.name} breakpoint is ${newBreakpoint.rangeStart}`,
      );
    }

    if (newBreakpoint.rangeStart > newBreakpoint.rangeEnd) {
      throw new Error(
        `rangeStart must be less or equal to rangeEnd. Breakpoint ${newBreakpoint.name} has rangeStart=${newBreakpoint.rangeStart} and rangeEnd=${newBreakpoint.rangeEnd}`,
      );
    }

    return newBreakpoint as IFullBreakpoint;
  };
}

export function checkAndAddEdgeRanges(breakpoints: IFullBreakpoint[]) {
  if (breakpoints.length === 0) return breakpoints;

  const result = [...breakpoints];

  const firstBreakpoint = breakpoints[0];
  const lastBreakpoint = breakpoints[breakpoints.length - 1];

  if (firstBreakpoint.rangeStart !== 0) {
    result.unshift({
      name: "__firstBreakpoint",
      rangeStart: 0,
      rangeEnd: firstBreakpoint.rangeStart - 1,
    });
  }

  if (lastBreakpoint.rangeEnd !== Infinity) {
    result.push({
      name: "__lastBreakpoint",
      rangeStart: lastBreakpoint.rangeEnd + 1,
      rangeEnd: Infinity,
    });
  }

  return result;
}

export function checkRangeContinuity(
  breakpoint: IFullBreakpoint,
  index: number,
  breakpoints: IFullBreakpoint[],
) {
  if (index === breakpoints.length - 1) return breakpoint;

  const nextBreakpoint = breakpoints[index + 1];

  if (breakpoint.rangeEnd + 1 !== nextBreakpoint.rangeStart) {
    throw new Error(
      `Ranges are not continuous. Difference between breakpoint ${
        breakpoint.name
      } rangeEnd and ${
        nextBreakpoint.name
      } rangeStart should be 1, but it's ${nextBreakpoint.rangeStart -
        breakpoint.rangeEnd}`,
    );
  }

  return breakpoint;
}

export default function parseBreakpoints(
  breakpoints: ILooseBreakpoint[],
): IFullBreakpoint[] {
  const normalizedBreakpoints = breakpoints
    .map(getCheckBreakpointName())
    .map(getCheckAndNormalizeRanges())
    .sort((a, b) => a.rangeStart - b.rangeStart)
    .map(checkRangeContinuity);

  return checkAndAddEdgeRanges(normalizedBreakpoints);
}
