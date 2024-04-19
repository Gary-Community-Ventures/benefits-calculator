import type { FormattedMessageType } from '../../Types/Questions.ts';

export type CategoryOptions = {
  [key: string]: FormattedMessageType;
};

export type BenefitAccordion = {
  categoryName: FormattedMessageType;
  categoryOptions: CategoryOptions;
};
