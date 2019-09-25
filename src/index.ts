import { css } from "styled-components";
import parseBreakpoints from "./parseBreakpoints";
import generateCSSHelper from "./generateCSSHelper";
import generateMediaQueryLabels from "./generateCSSHelper/generateMediaQueryLabels";
import limits from "./limitFunctions";
import {
  BreakpointNameType,
  IFullBreakpointMap,
  IFullBreakpoint,
  IBreakpointConditions,
  ILooseBreakpoint,
  ISpreadStyles,
} from "./index.d";

export default class Media {
  breakpoints: IFullBreakpoint[];

  breakpointsMap: IFullBreakpointMap;

  breakpointNames: BreakpointNameType[];

  constructor(breakpoints: ILooseBreakpoint[]) {
    this.breakpoints = parseBreakpoints(breakpoints);
    this.breakpointsMap = this.breakpoints.reduce(
      (accumulator: IFullBreakpointMap, breakpoint: IFullBreakpoint) => ({
        ...accumulator,
        [breakpoint.name]: breakpoint,
      }),
      {},
    );
    this.breakpointNames = this.breakpoints.map(
      (breakpoint: IFullBreakpoint) => breakpoint.name,
    );
  }

  _checkBreakpointNames(...breakpointNames: BreakpointNameType[]) {
    const breakpointNamesArray = Array.isArray(breakpointNames)
      ? breakpointNames
      : [breakpointNames];

    breakpointNamesArray.forEach(breakpointName => {
      if (typeof breakpointName !== "string") {
        throw new Error(
          `Breakpoint name must be a string, received ${typeof breakpointName}`,
        );
      }

      if (!this.breakpointNames.includes(breakpointName)) {
        throw new Error(
          `Breakpoint name ${breakpointName} is invalid. Possible names: ${this.breakpointNames.join(
            ", ",
          )}`,
        );
      }
    });
  }

  _getWithFunction(
    breakpoints: IFullBreakpoint[],
    conditions: IBreakpointConditions,
  ) {
    return (breakpointName: string) => {
      if (breakpoints.some(breakpoint => breakpoint.name === breakpointName)) {
        return this._getReturnFunction(breakpoints, conditions);
      }

      return this._getReturnFunction(
        [...breakpoints, this.breakpointsMap[breakpointName]],
        conditions,
      );
    };
  }

  _getWithoutFunction(
    breakpoints: IFullBreakpoint[],
    conditions: IBreakpointConditions,
  ) {
    return (breakpointName: string) =>
      this._getReturnFunction(
        breakpoints.filter(breakpoint => breakpoint.name !== breakpointName),
        conditions,
      );
  }

  _getAndFunction(
    breakpoints: IFullBreakpoint[],
    conditions: IBreakpointConditions,
  ) {
    return (boolean: boolean) =>
      this._getReturnFunction(breakpoints, {
        ...conditions,
        and: boolean,
      });
  }

  _getOrFunction(
    breakpoints: IFullBreakpoint[],
    conditions: IBreakpointConditions,
  ) {
    return (boolean: boolean) =>
      this._getReturnFunction(breakpoints, {
        ...conditions,
        or: boolean,
      });
  }

  _getReturnFunction(breakpoints: IFullBreakpoint[], conditions = {}) {
    const returnFunction = (
      literals: TemplateStringsArray,
      ...placeholders: any[]
    ) => generateCSSHelper(breakpoints, conditions, literals, ...placeholders);
    returnFunction.with = this._getWithFunction(breakpoints, conditions);
    returnFunction.without = this._getWithoutFunction(breakpoints, conditions);
    returnFunction.or = this._getOrFunction(breakpoints, conditions);
    returnFunction.and = this._getAndFunction(breakpoints, conditions);
    return returnFunction;
  }

  up(breakpointName: string) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.up(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  upAnd(breakpointName: string) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.upAnd(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  down(breakpointName: string) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.down(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  downAnd(breakpointName: string) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.downAnd(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  only(breakpointName: string) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.only(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  not(breakpointName: string) {
    this._checkBreakpointNames(breakpointName);
    const correctBreakpoints = limits.not(this.breakpoints, breakpointName);
    return this._getReturnFunction(correctBreakpoints);
  }

  between(startBreakpointName: string, endBreakpointName: string) {
    this._checkBreakpointNames(startBreakpointName, endBreakpointName);
    const correctBreakpoints = limits.between(
      this.breakpoints,
      startBreakpointName,
      endBreakpointName,
    );
    return this._getReturnFunction(correctBreakpoints);
  }

  betweenAnd(startBreakpointName: string, endBreakpointName: string) {
    this._checkBreakpointNames(startBreakpointName, endBreakpointName);
    const correctBreakpoints = limits.betweenAnd(
      this.breakpoints,
      startBreakpointName,
      endBreakpointName,
    );
    return this._getReturnFunction(correctBreakpoints);
  }

  outside(startBreakpointName: string, endBreakpointName: string) {
    this._checkBreakpointNames(startBreakpointName, endBreakpointName);
    const correctBreakpoints = limits.outside(
      this.breakpoints,
      startBreakpointName,
      endBreakpointName,
    );
    return this._getReturnFunction(correctBreakpoints);
  }

  outsideAnd(startBreakpointName: string, endBreakpointName: string) {
    this._checkBreakpointNames(startBreakpointName, endBreakpointName);
    const correctBreakpoints = limits.outsideAnd(
      this.breakpoints,
      startBreakpointName,
      endBreakpointName,
    );

    return this._getReturnFunction(correctBreakpoints);
  }

  spread(styles: ISpreadStyles) {
    return (literals: TemplateStringsArray, ...placeholders: any[]) =>
      this.breakpoints.map(
        ({ name, rangeStart, rangeEnd }: IFullBreakpoint) => {
          const styleToUse = styles[name] || styles.default;

          const generatedCSS = css(
            literals,
            ...placeholders.map(arg =>
              typeof arg === "function" ? arg(styleToUse) : arg,
            ),
          );

          return css`
            ${generateMediaQueryLabels({ start: rangeStart, end: rangeEnd })} {
              ${generatedCSS}
            }
          `;
        },
      );
  }
}
