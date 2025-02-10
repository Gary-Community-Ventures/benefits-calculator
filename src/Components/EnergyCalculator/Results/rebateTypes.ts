// NOTE: source: https://github.com/rewiringamerica/embed.rewiringamerica.org/blob/main/src/api/calculator-types-v1.ts

import { ReactNode } from 'react';
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
  'air_sealing',
  'air_to_water_heat_pump',
  'attic_or_roof_insulation',
  'basement_insulation',
  'battery_storage_installation',
  'central_air_conditioner',
  'crawlspace_insulation',
  'door_replacement',
  'duct_replacement',
  'duct_sealing',
  'ducted_heat_pump',
  'ductless_heat_pump',
  'ebike',
  'efficiency_rebates',
  'electric_outdoor_equipment',
  'electric_panel',
  'electric_stove',
  'electric_vehicle_charger',
  'electric_wiring',
  'energy_audit',
  'floor_insulation',
  'geothermal_heating_installation',
  'heat_pump_clothes_dryer',
  'heat_pump_water_heater',
  'new_electric_vehicle',
  'new_plugin_hybrid_vehicle',
  'non_heat_pump_clothes_dryer',
  'non_heat_pump_water_heater',
  'other_heat_pump',
  'other_insulation',
  'other_weatherization',
  'rooftop_solar_installation',
  'used_electric_vehicle',
  'used_plugin_hybrid_vehicle',
  'wall_insulation',
  'window_replacement',
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

export type EnergyCalculatorRebateCategoryTypes = string;

export type EnergyCalculatorRebateCategory = {
  type: EnergyCalculatorRebateCategoryTypes;
  name: FormattedMessageType;
  rebates: EnergyCalculatorRebate[];
};
