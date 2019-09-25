export type BreakpointNameType = string;

export type rangeStartType = number;

export type rangeEndType = number;

export interface IBreakpointConditions {
  and?: boolean;
  or?: boolean;
}

export interface ILooseBreakpoint {
  name: BreakpointNameType;
  rangeStart?: rangeStartType;
  rangeEnd?: rangeEndType;
}

export interface IFullBreakpoint {
  name: BreakpointNameType;
  rangeStart: rangeStartType;
  rangeEnd: rangeEndType;
}

export interface INamelessBreakpoint {
  start: rangeStartType;
  end: rangeEndType;
}

export interface ILooseBreakpointMap {
  [key: string]: ILooseBreakpoint;
}

export interface IFullBreakpointMap {
  [key: string]: IFullBreakpoint;
}

export interface IStringOrThisObject {
  [key: string]: string | IStringOrThisObject;
}

export interface ISpreadStyles {
  default: IStringOrThisObject;
  [key: string]: IStringOrThisObject;
}
