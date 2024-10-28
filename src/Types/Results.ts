import { Language } from './Language';

export type Translation = {
  default_message: string;
  label: string;
};

// fix later
export type TestMessage = (string | Translation)[];

export type ProgramNavigator = {
  id: number;
  name: Translation;
  phone_number: string;
  email: Translation;
  assistance_link: Translation;
  description: Translation;
  languages: Language[];
};

export type Program = {
  program_id: number;
  name: Translation;
  name_abbreviated: string;
  external_name: string;
  estimated_value: number;
  estimated_delivery_time: Translation;
  estimated_application_time: Translation;
  description_short: Translation;
  short_name: string;
  description: Translation;
  value_type: Translation;
  learn_more_link: Translation;
  apply_button_link: Translation;
  legal_status_required: string[];
  category: Translation;
  estimated_value_override: Translation;
  eligible: boolean;
  failed_tests: TestMessage[];
  passed_tests: TestMessage[];
  already_has: boolean;
  new: boolean;
  low_confidence: boolean;
  navigators: ProgramNavigator[];
  documents: ProgramDocument[];
  warning_messages: Translation[];
};

export type ProgramDocument = {
  text: Translation;
  link: Translation;
  link_text: Translation;
}

export type UrgentNeed = {
  name: Translation;
  description: Translation;
  link: Translation;
  type: Translation;
  warning: Translation;
  phone_number: string;
};

export type Validation = {
  id: number;
  screen_uuid: string;
  program_name: string;
  eligible: boolean;
  value: string;
};

export type EligibilityResults = {
  programs: Program[];
  urgent_needs: UrgentNeed[];
  screen_id: number;
  default_language: string;
  missing_programs: boolean;
  validations: Validation[];
  created_date: string;
};
