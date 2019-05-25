import parseBreakpoints from "./parseBreakpoints";
import generateCSSHelper from "./generateCSSHelper";
import limits from "./limitFunctions";

export default class Media {
  constructor(breakpoints) {
    this.breakpoints = parseBreakpoints(breakpoints);
    this.breakpointsMap = this.breakpoints.reduce(
      (accumulator, breakpoint) => ({
        ...accumulator,
        [breakpoint.name]: breakpoint
      }),
      {}
    );
    this.breakpointNames = this.breakpoints.map(breakpoint => breakpoint.name);
  }

  _checkBreakpointNames(...breakpointNames) {
    const breakpointNamesArray = Array.isArray(breakpointNames)
      ? breakpointNames
      : [breakpointNames];

    breakpointNamesArray.forEach(breakpointName => {
      if (typeof breakpointName !== "string") {
        throw new Error(
          `Breakpoint name must be a string, received ${typeof breakpointName}`
        );
      }

      if (!this.breakpointNames.includes(breakpointName)) {
        throw new Error(
          `Breakpoint name ${breakpointName} is invalid. Possible names: ${this.breakpointNames.join(
            ", "
          )}`
        );
      }
    });
  }

  _getWithFunction(correctBreakpoints) {
    return breakpointName => {
      if (
        correctBreakpoints.some(
          breakpoint => breakpoint.name === breakpointName
        )
      ) {
        return this._getReturnFunction(correctBreakpoints);
      }

      return this._getReturnFunction([
        ...correctBreakpoints,
        this.breakpointsMap[breakpointName]
      ]);
    };
  }

  _getWithoutFunction(correctBreakpoints) {
    return breakpointName =>
      this._getReturnFunction(
        correctBreakpoints.filter(
          breakpoint => breakpoint.name !== breakpointName
        )
      );
  }

  _getReturnFunction(correctBreakpoints) {
    const returnFunction = (...args) =>
      generateCSSHelper(correctBreakpoints, args);
    returnFunction.with = this._getWithFunction(correctBreakpoints);
    returnFunction.without = this._getWithoutFunction(correctBreakpoints);
    return returnFunction;
  }

  up(breakpointName) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.up(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  upAnd(breakpointName) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.upAnd(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  down(breakpointName) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.down(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  downAnd(breakpointName) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.downAnd(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  only(breakpointName) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.only(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  not(breakpointName) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.not(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  between(startBreakpointName, endBreakpointName) {
    this._checkBreakpointNames(startBreakpointName, endBreakpointName);
    const correctBreakpoints = limits.between(
      this.breakpoints,
      startBreakpointName,
      endBreakpointName
    );
    return this._getReturnFunction(correctBreakpoints);
  }

  betweenAnd(startBreakpointName, endBreakpointName) {
    this._checkBreakpointNames(startBreakpointName, endBreakpointName);
    const correctBreakpoints = limits.betweenAnd(
      this.breakpoints,
      startBreakpointName,
      endBreakpointName
    );
    return this._getReturnFunction(correctBreakpoints);
  }

  outside(startBreakpointName, endBreakpointName) {
    this._checkBreakpointNames(startBreakpointName, endBreakpointName);
    const correctBreakpoints = limits.outside(
      this.breakpoints,
      startBreakpointName,
      endBreakpointName
    );
    return this._getReturnFunction(correctBreakpoints);
  }

  outsideAnd(startBreakpointName, endBreakpointName) {
    this._checkBreakpointNames(startBreakpointName, endBreakpointName);
    const correctBreakpoints = limits.outsideAnd(
      this.breakpoints,
      startBreakpointName,
      endBreakpointName
    );

    return this._getReturnFunction(correctBreakpoints);
  }
}
