

export interface IWeight {
  id: string;
  weight: number;
  dateRecorded: Date | null;
}

export class Weight implements IWeight {
  id: string;
  weight: number;
  dateRecorded: Date | null;

  constructor(init?: WeightFormValues) {
      this.id = init?.id ?? "";
      this.weight = init?.weight ?? 0;
      this.dateRecorded = init?.dateRecorded ?? null;
  }
}

export class WeightFormValues {
  id?: string = undefined;
  weight: number = 0;
  dateRecorded: Date | null = null;

  constructor(init?: WeightFormValues) {
      this.id = init?.id;
      this.weight = init?.weight ?? 0;
      this.dateRecorded = init?.dateRecorded ?? null;
  }
}