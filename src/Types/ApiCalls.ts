import { ApiFormData, ApiUser, ApiUserWriteOnly } from './ApiFormData';
import { Translation } from './Results';

export type TranslationResponse = {
  [key: string]: {
    [key: string]: string;
  };
};

export type UserRequestData = ApiUser & ApiUserWriteOnly;

export type SendMessageRequestData = {
  email: string;
  phone: string;
  screen: string;
};

export type ProgramCategoryResponse = {
  name: Translation;
  icon: string;
  programs: {
    name: Translation;
    website_description: Translation;
  }[];
}[];

export type UrgentNeedProgramsResponse = {
  name: Translation;
  type: Translation;
  website_description: Translation;
}[];

export type ValidationRequestData = {
  screen_uuid: string;
  program_name: string;
  eligible: boolean;
  value: number;
};

export type AdminTokenResponse = {
  token: string;
};
