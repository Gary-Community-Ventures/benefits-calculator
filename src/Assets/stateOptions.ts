import { useContext } from 'react';
import { Context } from '../Components/Wrapper/Wrapper';

// Display names for every white label that is a state, including ones that are not publicly
// launched, so a referrer can be pointed at them by code.
export const STATE_NAMES: { [key: string]: string } = {
  co: 'Colorado',
  il: 'Illinois',
  ks: 'Kansas',
  ma: 'Massachusetts',
  mo: 'Missouri',
  nc: 'North Carolina',
  tx: 'Texas',
  wa: 'Washington',
};

// States shown in the public "What is your state?" dropdown. A white label can be live and
// directly reachable at /{state} (see ALL_VALID_WHITE_LABELS) without appearing here — KS and MO
// are omitted because they are not yet publicly launched.
export const PUBLIC_STATE_CODES = ['co', 'il', 'ma', 'nc', 'tx', 'wa'];

/**
 * The state dropdown options as `{ code: name }`, in the order they should be listed.
 *
 * A referrer can replace the public list through the `stateOptions` referrer config on the
 * `_default` white label (the only config loaded before a state is chosen): the KS and MO 2-1-1s
 * serve the Kansas City metro on both sides of the state line, so their links offer KS and MO
 * even though neither is public yet. An empty or unrecognized override falls back to the public
 * list rather than rendering an empty dropdown.
 */
export function useStateOptions(): { [key: string]: string } {
  const { getReferrer } = useContext(Context);

  const referrerStateCodes = getReferrer('stateOptions', []).filter((code) => code in STATE_NAMES);
  const stateCodes = referrerStateCodes.length > 0 ? referrerStateCodes : PUBLIC_STATE_CODES;

  return Object.fromEntries(stateCodes.map((code) => [code, STATE_NAMES[code]]));
}
