import { Injectable } from '@nestjs/common';
import { IPage, IRow } from './types/page.type';
import { faker } from '@faker-js/faker';

@Injectable()
export class AppService {
  private records: IRow[] = [];
  private limit: number = 20;
  constructor() {
    this.records = new Array(1_000_000)
      .fill(0)
      .map((_, idx) => [idx + 1, false, String(idx + 1)]);
  }

  getPage(offset: number, query?: string): IPage {
    const payload = query
      ? this.records.filter((row) => row[2].match(query))
      : this.records;
    return {
      records: payload.slice(
        (offset - 1) * this.limit,
        (offset - 1) * this.limit + this.limit,
      ),
      hasMore: (offset - 1) * this.limit + this.limit < payload.length,
      total: payload.length,
    };
  }

  replace(fromId: number, toId: number): boolean {
    const from = this.records.findIndex((row) => row[0] === fromId);
    const to = this.records.findIndex((row) => row[0] === toId);
    if (from !== -1 && to !== -1) {
      const temp = this.records[from];
      this.records[from] = this.records[to];
      this.records[to] = temp;
      return true;
    }
    return false;
  }

  check(id: number): boolean {
    const em = this.records.find((row) => row[0] === id);
    if (em) {
      em[1] = !em[1];
      return true;
    }
    return false;
  }
}
