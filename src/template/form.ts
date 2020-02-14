type FieldType = 'text' | 'textarea' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'hidden';

export type FormField = {
  readonly description?: string;
  readonly label: string;
  readonly maximum?: number;
  readonly minimum?: number;
  readonly name: string;
  readonly options?: ReadonlyArray<{
    readonly selected?: boolean;
    readonly text: string;
    readonly value?: string;
  }>;
  readonly required?: boolean;
  readonly type?: FieldType;
  readonly value?: string;
}

export type FormTemplateAttributes = {
  readonly fields: ReadonlyArray<FormField>;
};
