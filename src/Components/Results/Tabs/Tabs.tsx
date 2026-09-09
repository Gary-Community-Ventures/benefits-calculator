import { useCallback, useMemo, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useImmediateHelpSuppressed, useResultsContext, useResultsLink } from '../Results';
import { FormattedMessage } from 'react-intl';
import { useTranslateNumber } from '../../../Assets/languageOptions';
import { useIsEnergyCalculator } from '../../EnergyCalculator/hooks';
import { useTrackEvent } from '../../../Assets/analytics';
import { buildTabs, getNextTabIndex, ResultsTabId } from './buildTabs';

type ResultsTabsProps = {
  // Supplied by Results, which already knows which tab is rendering. Deriving it from
  // the URL here instead would re-parse information the caller already has.
  activeTab: ResultsTabId;
};

const ResultsTabs = ({ activeTab }: ResultsTabsProps) => {
  const { programs, needs } = useResultsContext();
  const translateNumber = useTranslateNumber();
  const navigate = useNavigate();

  const benefitsLink = useResultsLink(`results/benefits`);
  const needsLink = useResultsLink(`results/near-term-needs`);
  const helpLink = useResultsLink(`results/more-help`);
  const immediateHelpSuppressed = useImmediateHelpSuppressed();

  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const track = useTrackEvent();

  const tabs = useMemo(
    () =>
      buildTabs({
        benefitsLink,
        needsLink,
        helpLink,
        programCount: programs.length,
        needCount: needs.length,
        immediateHelpSuppressed,
      }),
    [benefitsLink, needsLink, helpLink, programs.length, needs.length, immediateHelpSuppressed],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

      if (currentIndex === -1) {
        return;
      }

      const nextIndex = getNextTabIndex(e.key, currentIndex, tabs.length);

      if (nextIndex !== null) {
        e.preventDefault();
        tabRefs.current[nextIndex]?.focus();
        navigate(tabs[nextIndex].to);
      }
    },
    [activeTab, navigate, tabs],
  );

  const isEnergyCalculator = useIsEnergyCalculator();
  if (isEnergyCalculator) {
    return null;
  }

  return (
    <nav aria-label="Results">
      {/* A flex row, not a Grid: tabs size to their labels and left-align, which is the
          desktop tab convention. Equal-width columns would stretch each tab's hit area
          arbitrarily wide and leave the label floating in empty space.
          data-tab-count scopes the mobile three-tab sizing, where the tabs do share the
          width equally. */}
      <div className="results-tab-container" data-tab-count={tabs.length} role="tablist" onKeyDown={handleKeyDown}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;

          return (
            <div key={tab.id} className="results-tab" role="presentation">
              <NavLink
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                to={tab.to}
                className={isActive ? 'active' : ''}
                id={tab.testId}
                data-testid={tab.testId}
                role="tab"
                aria-selected={isActive}
                aria-controls="results-tabpanel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  track('screener_results_tab_click', { tab_name: tab.trackName });

                  if (tab.id === 'help') {
                    // Continuity for GA4 "get help": this event used to fire only from
                    // the bottom More Help button, which this tab replaces. Distinct
                    // `location` keeps the rollup comparable while still separating the two surfaces.
                    track('screener_get_help_click', { location: 'immediate_help_tab' });
                  }
                }}
              >
                <span className="results-tab-label">
                  {/* Sizing lives in .results-tab-icon so it tracks the label across
                      breakpoints; this is only the pre-CSS fallback size. strokeWidth
                      matches the shared Icon component, so these don't render heavier
                      than every other icon on the page. */}
                  <tab.icon aria-hidden="true" className="results-tab-icon" size={17} strokeWidth={1.5} />
                  <FormattedMessage id={tab.labelId} defaultMessage={tab.defaultMessage} />
                  {tab.count !== undefined && <span className="results-tab-count">{translateNumber(tab.count)}</span>}
                </span>
              </NavLink>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default ResultsTabs;
