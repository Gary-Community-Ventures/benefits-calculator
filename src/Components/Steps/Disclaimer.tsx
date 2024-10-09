import { useContext } from 'react';
import { Context } from '../Wrapper/Wrapper';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { STARTING_QUESTION_NUMBER } from '../../Assets/stepDirectory.ts';
import { createScreen } from '../../Assets/updateScreen.ts';
import { CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import dataLayerPush from '../../Assets/analytics.ts';
import QuestionHeader from '../QuestionComponents/QuestionHeader.tsx';
import { useConfig } from '../Config/configHook.tsx';
import '../LandingPage/LandingPage.css';

const isTrue = (value: boolean) => {
  return value;
}

const Disclaimer = () => {
  const { formData, setFormData, locale, screenDoneLoading, theme } = useContext(Context);
  let { uuid } = useParams();
  const navigate = useNavigate();
  const publicChargeOption = useConfig('public_charge_rule');
  const privacyLink = useConfig('privacy_policy');
  const consentToContactLink = useConfig('consent_to_contact');
  const formSchema = z.object({
    agreeToTermsOfService: z.boolean().refine(isTrue),
    is13OrOlder: z.boolean().refine(isTrue),
  });

  const {
    control,
    formState:{errors},
    getValues,
    handleSubmit,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agreeToTermsOfService: formData.agreeToTermsOfService ?? false,
      is13OrOlder: formData.is13OrOlder ?? false,
    },
  });

  const formSubmitHandler:SubmitHandler<z.infer<typeof formSchema>> = async (termsOfServiceAndAgeData) => {
    const updatedFormData = { ...formData, ...termsOfServiceAndAgeData };
    setFormData(updatedFormData);

    if (uuid) {
      navigate(`/${uuid}/step-${STARTING_QUESTION_NUMBER}`);
    } else {
      const response = await createScreen(formData, locale);
      screenDoneLoading();
      navigate(`/${response.uuid}/step-${STARTING_QUESTION_NUMBER}`);
    }
  };

  const renderCardContent = () => {
    return (
      <CardContent sx={{ backgroundColor: theme.secondaryBackgroundColor }} className="landing-pg-font">
        <FormattedMessage
          id="landingPage.body"
          defaultMessage="MyFriendBen is a tool that can help determine benefits you are likely eligible for. Here's what you should know before you get started:"
        />
        <ul className="landing-page-list-container">
          <li>
            <FormattedMessage
              id="landingPage.firstBulletItem"
              defaultMessage="MyFriendBen only provides estimates of what you may qualify for. You should not rely on these estimates. You must confirm your final eligibility and benefit amount with the proper agency or other decision maker."
            />
          </li>
          <li>
            <div>
              <FormattedMessage
                id="landingPage.publicCharge"
                defaultMessage="Some benefits are available to Non-U.S. citizens. Non-U.S. citizens planning to apply for legal permanent residency or a visa should consider how applying for any benefits may affect their immigration status. For more information, please review the "
              />
              <a
                className="link-color"
                href={publicChargeOption.link}
                onClick={() => {
                  dataLayerPush({
                    event: 'public_charge',
                    action: 'public charge link click',
                  });
                }}
              >
                <FormattedMessage
                  id="landingPage.publicChargeLink"
                  defaultMessage="Colorado Department of Human Services Public Charge Rule"
                />
              </a>
              <FormattedMessage id="landingPage.publicCharge.afterLink" defaultMessage="." />
            </div>
          </li>
        </ul>
      </CardContent>
    );
  };

  const getLinksForCheckbox = () => {
    if (locale in privacyLink && locale in consentToContactLink) {
      return {
        privacyPolicyLink: privacyLink[locale],
        addTermsConsentToContact: consentToContactLink[locale],
      };
    } else {
      return {
        privacyPolicyLink: privacyLink['en-us'],
        addTermsConsentToContact: consentToContactLink['en-us'],
      };
    }
  };

  const createCheckboxLabel = () => {
    return (
      <div className="landing-pg-font">
        <FormattedMessage
          id="disclaimer-label"
          defaultMessage="By proceeding, you confirm that you have read and agree to the "
        />
        <Link to={getLinksForCheckbox().privacyPolicyLink} target="_blank" sx={{ color: theme.midBlueColor }}>
          <FormattedMessage id="landingPage-policyText" defaultMessage="Privacy Policy" />
        </Link>
        <FormattedMessage id="landingPage-and-text" defaultMessage=" and " />
        <Link to={getLinksForCheckbox().addTermsConsentToContact} target="_blank" sx={{ color: theme.midBlueColor }}>
          <FormattedMessage id="landingPage-additionalTerms" defaultMessage="Additional Terms & Consent to Contact" />
        </Link>
        <FormattedMessage id="landingPage-disclaimer-lable-end" defaultMessage="." />
      </div>
    );
  };

  return (
    <main className="benefits-form">
      <QuestionHeader>
        <FormattedMessage id="disclaimer.header" defaultMessage="What you should know: " />
      </QuestionHeader>
      {renderCardContent()}
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Controller
          name="agreeToTermsOfService"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={getValues('agreeToTermsOfService')} />}
              label={createCheckboxLabel()}
            />
          )}
        />
        <Controller
          name="is13OrOlder"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={getValues('is13OrOlder')} />}
              label={
                <div className="landing-pg-font">
                  <FormattedMessage
                    id="disclaimer-label-age"
                    defaultMessage="I confirm I am 13 years of age or older."
                  />
                </div>
              }
            />
          )}
        />
        <button type="submit">hello</button>
      </form>
    </main>
  );
};

export default Disclaimer;
