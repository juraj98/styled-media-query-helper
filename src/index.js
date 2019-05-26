import { css } from "styled-components";
import parseBreakpoints from "./parseBreakpoints";
import generateCSSHelper from "./generateCSSHelper";
import generateMediaQueryLabels from "./generateCSSHelper/generateMediaQueryLabels";
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

  _getWithFunction(breakpoints, conditions) {
    return breakpointName => {
      if (breakpoints.some(breakpoint => breakpoint.name === breakpointName)) {
        return this._getReturnFunction(breakpoints, conditions);
      }

      return this._getReturnFunction(
        [...breakpoints, this.breakpointsMap[breakpointName]],
        conditions
      );
    };
  }

  _getWithoutFunction(breakpoints, conditions) {
    return breakpointName =>
      this._getReturnFunction(
        breakpoints.filter(breakpoint => breakpoint.name !== breakpointName),
        conditions
      );
  }

  _getAndFunction(breakpoints, conditions) {
    return boolean =>
      this._getReturnFunction(breakpoints, {
        ...conditions,
        and: boolean
      });
  }

  _getOrFunction(breakpoints, conditions) {
    return boolean =>
      this._getReturnFunction(breakpoints, {
        ...conditions,
        or: boolean
      });
  }

  _getReturnFunction(breakpoints, conditions = {}) {
    const returnFunction = (...args) =>
      generateCSSHelper(breakpoints, args, conditions);
    returnFunction.with = this._getWithFunction(breakpoints, conditions);
    returnFunction.without = this._getWithoutFunction(breakpoints, conditions);
    returnFunction.or = this._getOrFunction(breakpoints, conditions);
    returnFunction.and = this._getAndFunction(breakpoints, conditions);
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

  spread(styles) {
    return (...args) =>
      this.breakpoints.map(({ name, rangeStart, rangeEnd }) => {
        const styleToUse = styles[name] || styles.default;
        const generatedCSS = css(
          ...args.map(arg =>
            typeof arg === "function" ? arg(styleToUse) : arg
          )
        );

        return css`
          ${generateMediaQueryLabels({ start: rangeStart, end: rangeEnd })} {
            ${generatedCSS}
          }
        `;
      });
  }
}
