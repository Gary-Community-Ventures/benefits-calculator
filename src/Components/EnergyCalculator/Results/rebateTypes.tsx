// NOTE: source: https://github.com/rewiringamerica/embed.rewiringamerica.org/blob/main/src/api/calculator-types-v1.ts
import { FormattedMessage } from 'react-intl';
import { FormattedMessageType } from '../../../Types/Questions';

export type EnergyCalculatorIncentiveType =
  | 'tax_credit'
  | 'pos_rebate'
  | 'rebate'
  | 'account_credit'
  | 'performance_rebate';
export type EnergyCalculatorAuthorityType = 'federal' | 'state' | 'utility' | 'city' | 'county' | 'other';

export type EnergyCalculatorAmountType = 'dollar_amount' | 'percent' | 'dollars_per_unit';
export type EnergyCalculatorAmountUnit = 'ton' | 'kilowatt' | 'watt' | 'btuh10k' | 'square_foot' | 'kilowatt_hour';
export interface EnergyCalculatorAmount {
  type: EnergyCalculatorAmountType;
  number: number;
  maximum?: number;
  representative?: number;
  unit?: EnergyCalculatorAmountUnit;
}

export const ENERGY_CALCULATOR_ITEMS = [
  // hvac
  'air_to_water_heat_pump',
  'central_air_conditioner',
  'ducted_heat_pump',
  'ductless_heat_pump',
  'geothermal_heating_installation',
  'other_heat_pump',
  // water heater
  'heat_pump_water_heater',
  'non_heat_pump_water_heater',
  // stove
  'electric_stove',
  // dryer
  'heat_pump_clothes_dryer',
  'non_heat_pump_clothes_dryer',
] as const;

export type EnergyCalculatorItemType = (typeof ENERGY_CALCULATOR_ITEMS)[number];

export interface EnergyCalculatorIncentive {
  payment_methods: EnergyCalculatorIncentiveType[];
  authority_type: EnergyCalculatorAuthorityType;
  authority_name: string | null;
  program: string;
  program_url: string;
  more_info_url?: string;
  items: EnergyCalculatorItemType[];
  amount: EnergyCalculatorAmount;
  start_date?: string;
  end_date?: string;
  short_description?: string;

  eligible?: boolean;
}

export interface EnergyCalculatorAPILocation {
  state: string;
}

export interface EnergyCalculatorAPIUtilityMap {
  [utilityId: string]: {
    name: string;
  };
}

export interface EnergyCalculatorAPIUtilitiesResponse {
  location: EnergyCalculatorAPILocation;
  utilities: EnergyCalculatorAPIUtilityMap;
  gas_utilities?: EnergyCalculatorAPIUtilityMap;
  gas_utility_affects_incentives?: boolean;
}

export interface EnergyCalculatorAPIResponse {
  authorities: {
    [authorityId: string]: {
      name: string;
      logo?: {
        src: string;
        width: number;
        height: number;
      };
    };
  };
  coverage: {
    state: string | null;
    utility: string | null;
  };
  data_partners: {
    [id: string]: {
      name: string;
      logo?: {
        src: string;
        width: number;
        height: number;
      };
    };
  };
  location: EnergyCalculatorAPILocation;
  incentives: EnergyCalculatorIncentive[];
  is_under_80_ami: boolean;
  is_under_150_ami: boolean;
}

export type EnergyCalculatorRebate = EnergyCalculatorIncentive;

export type EnergyCalculatorRebateCategoryType = 'hvac' | 'waterHeater' | 'stove' | 'dryer';

export const ENERGY_CALCULATOR_CATEGORY_MAP: Record<EnergyCalculatorItemType, EnergyCalculatorRebateCategoryType> = {
  air_to_water_heat_pump: 'hvac',
  central_air_conditioner: 'hvac',
  ducted_heat_pump: 'hvac',
  ductless_heat_pump: 'hvac',
  geothermal_heating_installation: 'hvac',
  other_heat_pump: 'hvac',
  heat_pump_water_heater: 'waterHeater',
  non_heat_pump_water_heater: 'waterHeater',
  electric_stove: 'stove',
  heat_pump_clothes_dryer: 'dryer',
  non_heat_pump_clothes_dryer: 'dryer',
};

export const ENERGY_CALCULATOR_CATEGORY_TITLE_MAP: Record<EnergyCalculatorRebateCategoryType, FormattedMessageType> = {
  hvac: (
    <FormattedMessage
      id="energyCalculator.results.category.hvac.title"
      defaultMessage="Heating, Ventilation & Cooling"
    />
  ),
  waterHeater: <FormattedMessage id="energyCalculator.results.category.hvac.title" defaultMessage="Water Heater" />,
  stove: <FormattedMessage id="energyCalculator.results.category.hvac.title" defaultMessage="Cooking Stove/Range" />,
  dryer: <FormattedMessage id="energyCalculator.results.category.hvac.title" defaultMessage="Clothes Dryer" />,
};

export type EnergyCalculatorRebateCategory = {
  type: EnergyCalculatorRebateCategoryType;
  name: FormattedMessageType;
  rebates: EnergyCalculatorRebate[];
};
