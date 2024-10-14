import { JSXElementConstructor, ReactElement } from 'react';
import { MessageFunction, ValidationFunction } from './ErrorController';
import { SignUpInfo } from './FormData';

export type QuestionName =
  'zipcode'
  | 'householdSize'
  | 'householdData'
  | 'hasExpenses'
  | 'householdAssets'
  | 'hasBenefits'
  | 'acuteHHConditions'
  | 'referralSource'
  | 'signUpInfo';

export type FormattedMessageType = ReactElement<any, string | JSXElementConstructor<any>>;

export type TextFieldDetails = {
  componentType: 'Textfield';
  inputType: string;
  inputMode?: string;
  inputPattern?: string;
  pattern?: string;
  inputName: string;
  inputLabel: FormattedMessageType;
  inputError: ValidationFunction<string>;
  inputHelperText: MessageFunction<string>;
  dollarField?: boolean;
  numericField?: boolean;
  required: boolean;
};

type BasicSelectOptions =
  | {
      [key: number]: {
        [key: string]: string;
      };
    }
  | {
      [key: string]: string;
    };

export type BasicSelectDetails = {
  componentType: 'BasicSelect';
  inputType: 'text';
  inputName: string;
  inputLabel?: FormattedMessageType;
  inputError?: ValidationFunction<string>;
  inputHelperText?: MessageFunction<string>;
  options?: BasicSelectOptions;
  required?: boolean;
  componentProperties: {
    labelId: string;
    inputLabelText: FormattedMessageType;
    id: string;
    value: string;
    label: FormattedMessageType;
    disabledSelectMenuItemText: FormattedMessageType;
  };
};

export type OptionCardGroupDetails = {
  componentType: 'OptionCardGroup';
  inputName: string;
  options?: any;
  inputError: ValidationFunction<{ [key: string]: boolean }>;
  inputHelperText?: MessageFunction<{ [key: string]: boolean }>;
};

export type HouseholdDataBlockDetails = {
  componentType: 'HouseholdDataBlock';
  ariaLabel: string;
  inputName: string;
};

export type RadioFieldDetails = {
  componentType: 'Radiofield';
  ariaLabel: string;
  inputName: string;
  inputError: ValidationFunction<undefined>;
};

export type ExpenseBlockDetails = {
  componentType: 'ExpenseBlock';
  ariaLabel: string;
  inputName: string;
};

export type PreferNotToAnswerDetails = {
  componentType: 'PreferNotToAnswer';
  ariaLabel: string;
  inputName: string;
  inputError: ValidationFunction<string>;
  inputHelperText: MessageFunction<string>;
};

export type AccordionContainerDetails = {
  componentType: 'AccordionContainer';
  ariaLabel: string;
  inputName: string;
  inputError: ValidationFunction<string>;
  inputHelperText: ValidationFunction<string>;
};

export type BasicCheckboxGroupDetails = {
  componentType: 'BasicCheckboxGroup';
  inputName: string;
  options?: {
    [key: string]: FormattedMessageType;
  };
  inputError: ValidationFunction<SignUpInfo>;
};

export type SignUpDetails = {
  componentType: 'SignUp';
  inputName: string;
  ariaLabel: string;
};

export type ComponentDetails =
  | TextFieldDetails
  | BasicSelectDetails
  | OptionCardGroupDetails
  | HouseholdDataBlockDetails
  | RadioFieldDetails
  | ExpenseBlockDetails
  | PreferNotToAnswerDetails
  | AccordionContainerDetails
  | BasicCheckboxGroupDetails
  | SignUpDetails;

export type Question = {
  name: string;
  question?: FormattedMessageType;
  questionDescription?: FormattedMessageType;
  componentDetails: ComponentDetails;
  header?: FormattedMessageType;
  subheader?: FormattedMessageType;
  followUpQuestions?: Question[];
};

export type Benefit = {
  name: FormattedMessageType;
  description: FormattedMessageType;
};

export type BenefitsList = {
  [key: string]: Benefit;
};

export type Category = {
  benefits: BenefitsList;
  category_name: FormattedMessageType;
};

export type CategoryBenefits = {
  cash: Category;
  foodAndNutrition: Category;
  childCare: Category;
  housingAndUtilities: Category;
  transportation: Category;
  healthCare: Category;
  taxCredits: Category;
};
