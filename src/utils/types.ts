export interface GenericObject {
  [key: string]: string | number | boolean;
}

export interface ApiResponseObject {
  [key: string]: string | number | boolean | GenericObject;
}

export type IdToApiResponseObject = Record<string, ApiResponseObject>;
