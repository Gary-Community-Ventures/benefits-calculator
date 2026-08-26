import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Context } from '../Wrapper/Wrapper';
import SelectStatePage from './SelectStatePage';
import { createMockContextValue } from '../../test-utils/renderHelpers';

// ─── Mocks ───────────────────────────────────────────────────────────────────

// Stub nav chrome — the dropdown contents are what matter here.
jest.mock('../PrevAndContinueButtons/PrevAndContinueButtons', () => ({
  __esModule: true,
  default: () => <button type="submit">Continue</button>,
}));

jest.mock('../QuestionComponents/questionHooks', () => ({
  useQueryString: () => '',
}));

jest.mock('../Common/usePageTitle', () => ({
  usePageTitle: jest.fn(),
}));

jest.mock('../../Assets/analytics', () => ({
  useTrackEvent: () => jest.fn(),
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderPage(referrerStates: string[]) {
  const contextValue = createMockContextValue({
    getReferrer: ((key: string, defaultValue: unknown) =>
      key === 'stateOptions' ? referrerStates : defaultValue) as any,
  });

  render(
    <IntlProvider locale="en">
      <Context.Provider value={contextValue}>
        <MemoryRouter>
          <SelectStatePage />
        </MemoryRouter>
      </Context.Provider>
    </IntlProvider>,
  );
}

function openStateDropdown() {
  // MUI v5 renders the Select trigger as a button with aria-haspopup=listbox, not a combobox.
  const trigger = screen.getAllByRole('button').find((el) => el.getAttribute('aria-haspopup') === 'listbox');
  fireEvent.mouseDown(trigger!);

  return screen
    .getAllByRole('option')
    .map((option) => option.textContent)
    .filter((text) => text !== 'Choose your state');
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('SelectStatePage', () => {
  it('offers the public states when the referrer sets no state options', () => {
    renderPage([]);

    const states = openStateDropdown();

    expect(states).toEqual(['Colorado', 'Illinois', 'Massachusetts', 'North Carolina', 'Texas', 'Washington']);
  });

  it('offers only Kansas and Missouri for a referrer scoped to those states', () => {
    renderPage(['ks', 'mo']);

    expect(openStateDropdown()).toEqual(['Kansas', 'Missouri']);
  });
});
