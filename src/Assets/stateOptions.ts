import { useContext } from 'react';
import { Context } from '../Components/Wrapper/Wrapper';
import { useConfig } from '../Components/Config/configHook';
import { ALL_VALID_WHITE_LABELS, WhiteLabel } from '../Types/WhiteLabel';

export type StateOption = {
  code: string;
  name: string;
  public: boolean;
};

/** The states the "What is your state?" dropdown should offer, in display order. */
export function useStateOptions(): StateOption[] {
  const { getReferrer } = useContext(Context);
  // Derived by the API from its white label registry, so a new or newly launched state needs no change here.
  const catalog = useConfig<StateOption[]>('state_options', []);

  // A state the API offers but this build has no route for would dead-end at /{code}.
  const routable = catalog.filter((state) => ALL_VALID_WHITE_LABELS.includes(state.code as WhiteLabel));

  // A referrer may name states that are not public yet, as the KS and MO 2-1-1s do for the Kansas City metro.
  const selected = getReferrer('stateOptions', [])
    .map((code) => routable.find((state) => state.code === code))
    .filter((state): state is StateOption => state !== undefined);

  return selected.length > 0 ? selected : routable.filter((state) => state.public);
}
