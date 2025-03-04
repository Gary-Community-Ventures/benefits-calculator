export const ALL_VALID_WHITE_LABELS = ['co', 'nc', 'co_energy_calculator'] as const;
export type WhiteLabel = (typeof ALL_VALID_WHITE_LABELS)[number];
