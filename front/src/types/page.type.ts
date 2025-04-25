export type IRow = [number, boolean, string];

export interface IPage {
  records: IRow[];
  hasMore: boolean;
  total: number;
}
