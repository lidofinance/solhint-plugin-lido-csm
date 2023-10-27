declare interface Token {
  type: string;
  value: string | undefined;
  range?: [number, number];
  loc?: {
    start: {
      line: number;
      column: number;
    };
    end: {
      line: number;
      column: number;
    };
  };
}
