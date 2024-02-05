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
};

export type Program = {
  program_id: number;
  name: Translation;
  name_abbreviated: string;
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
  eligible: boolean;
  failed_tests: TestMessage[];
  passed_tests: TestMessage[];
  already_has: boolean;
  new: boolean;
  low_confidence: boolean;
  navigators: ProgramNavigator[];
  documents: Translation[];
};

export type UrgentNeed = {
  name: Translation;
  description: Translation;
  link: Translation;
  type: Translation;
  phone_number: string;
};

export type EligibilityResults = {
  programs: Program[];
  urgent_needs: UrgentNeed[];
  screen_id: number;
  default_language: string;
};
