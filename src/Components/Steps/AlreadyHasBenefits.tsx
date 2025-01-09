import { zodResolver } from '@hookform/resolvers/zod';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { ReactNode, useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { updateScreen } from '../../Assets/updateScreen';
import { Benefits } from '../../Types/FormData';
import { FormattedMessageType } from '../../Types/Questions';
import CheckBoxAccordion from '../AccordionsContainer/CheckboxAccordion';
import { useConfig } from '../Config/configHook';
import ErrorMessageWrapper from '../ErrorMessage/ErrorMessageWrapper';
import HelpButton from '../HelpBubbleIcon/HelpButton';
import PrevAndContinueButtons from '../PrevAndContinueButtons/PrevAndContinueButtons';
import QuestionHeader from '../QuestionComponents/QuestionHeader';
import { useDefaultBackNavigationFunction, useGoToNextStep } from '../QuestionComponents/questionHooks';
import QuestionQuestion from '../QuestionComponents/QuestionQuestion';
import { Context } from '../Wrapper/Wrapper';

const HAS_BENEFITS_SHOW = 'true';

type CategoryBenefitsConfig = {
  [key: string]: {
    benefits: {
      [key: string]: {
        name: FormattedMessageType;
        description: FormattedMessageType;
      };
    };
    category_name: FormattedMessageType;
  };
};

type CategoryBenefitsProps = {
  alreadyHasBenefits: { [key: string]: boolean };
  onChange: (alreadyHasBenefits: { [key: string]: boolean }) => void;
};

function CategoryBenefits({ alreadyHasBenefits, onChange }: CategoryBenefitsProps) {
  const [currentExpanded, setCurrentExpanded] = useState(0); // start with the first accordion open

  const benefits = useConfig<CategoryBenefitsConfig>('category_benefits');

  return (
    <>
      {Object.values(benefits).map((details, index) => {
        const options = Object.entries(details.benefits).map(([name, benefit]) => {
          return {
            value: name,
            text: (
              <span>
                <strong>{benefit.name}</strong>
                {benefit.description}
              </span>
            ),
          };
        });

        return (
          <CheckBoxAccordion
            name={details.category_name}
            options={options}
            expanded={currentExpanded === index}
            onExpand={(isExpanded) => {
              if (isExpanded) {
                setCurrentExpanded(index);
              } else {
                if (currentExpanded === index) {
                  setCurrentExpanded(-1); // close all
                }
              }
            }}
            values={alreadyHasBenefits}
            onChange={(values) => {
              let newAlreadyHas: { [key: string]: boolean } = { ...alreadyHasBenefits };

              newAlreadyHas = { ...newAlreadyHas, ...values };

              onChange(newAlreadyHas);
            }}
            key={index}
          />
        );
      })}
    </>
  );
}

function AlreadyHasBenefits() {
  const { formData, setFormData, locale } = useContext(Context);
  const { formatMessage } = useIntl();
  const { uuid } = useParams();
  const backNavigationFunction = useDefaultBackNavigationFunction('hasBenefits');
  const nextStep = useGoToNextStep('hasBenefits');

  const formSchema = z
    .object({
      hasBenefits: z.enum([HAS_BENEFITS_SHOW, 'false', 'preferNotToAnswer']),
      alreadyHasBenefits: z.record(z.string(), z.boolean()),
    })
    .refine(
      ({ hasBenefits, alreadyHasBenefits }) => {
        const noBenefitsSelected = Object.values(alreadyHasBenefits).every((value) => !value);

        if (hasBenefits === HAS_BENEFITS_SHOW && noBenefitsSelected) {
          return false;
        }

        return true;
      },
      {
        message: formatMessage({
          id: 'validation-helperText.benefits',
          defaultMessage:
            'If your household does not receive any of these benefits, please select the "No" option above.',
        }),
        path: ['alreadyHasBenefits'],
      },
    );

  const {
    control,
    formState: { errors, isSubmitted },
    handleSubmit,
    setValue,
    watch,
  } = useForm<{ hasBenefits: 'true' | 'false' | 'preferNotToAnswer'; alreadyHasBenefits: Benefits }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasBenefits: formData.hasBenefits,
      alreadyHasBenefits: formData.benefits,
    },
  });

  const formSubmitHandler = ({ alreadyHasBenefits, hasBenefits }: z.infer<typeof formSchema>) => {
    if (uuid === undefined) {
      throw new Error('uuid is not defined');
    }

    if (HAS_BENEFITS_SHOW !== hasBenefits) {
      for (const key in alreadyHasBenefits) {
        alreadyHasBenefits[key] = false;
      }
    }

    const newFormData = { ...formData, hasBenefits: hasBenefits, benefits: alreadyHasBenefits };

    setFormData(newFormData);
    updateScreen(uuid, newFormData, locale);
    nextStep();
  };

  return (
    <div>
      <QuestionHeader>
        <FormattedMessage
          id="qcc.tell-us-final-text"
          defaultMessage="Tell us some final information about your household."
        />
      </QuestionHeader>
      <QuestionQuestion>
        <FormattedMessage
          id="questions.hasBenefits"
          defaultMessage="Does your household currently have any benefits?"
        />
        <HelpButton
          helpText="This information will help make sure we don't give you results for benefits you already have."
          helpId="questions.hasBenefits-description"
        />
      </QuestionQuestion>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Controller
          name="hasBenefits"
          control={control}
          render={({ field }) => {
            return (
              <RadioGroup
                {...field}
                aria-label={formatMessage({
                  id: 'questions.hasBenefits',
                  defaultMessage: 'Does your household currently have any benefits?',
                })}
                sx={{ marginBottom: '1rem' }}
              >
                <FormControlLabel
                  value={HAS_BENEFITS_SHOW}
                  control={<Radio />}
                  label={<FormattedMessage id="radiofield.label-yes" defaultMessage="Yes" />}
                />
                <FormControlLabel
                  value={'false'}
                  control={<Radio />}
                  label={<FormattedMessage id="radiofield.label-no" defaultMessage="No" />}
                />
                <FormControlLabel
                  value={'preferNotToAnswer'}
                  control={<Radio />}
                  label={
                    <FormattedMessage id="radiofield.label-preferNotToAnswer" defaultMessage="Prefer not to answer" />
                  }
                />
              </RadioGroup>
            );
          }}
        />
        {watch('hasBenefits') === HAS_BENEFITS_SHOW && (
          <div>
            <QuestionQuestion>
              <FormattedMessage
                id="questions.hasBenefits-a"
                defaultMessage="Please tell us what benefits your household currently has."
              />
            </QuestionQuestion>
            <CategoryBenefits
              alreadyHasBenefits={watch('alreadyHasBenefits')}
              onChange={(values) =>
                setValue('alreadyHasBenefits', values, {
                  shouldValidate: isSubmitted,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
            />
            {errors.alreadyHasBenefits !== undefined && (
              <ErrorMessageWrapper fontSize="1.5rem">
                {errors.alreadyHasBenefits.message as ReactNode}
              </ErrorMessageWrapper>
            )}
          </div>
        )}
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
}

export default AlreadyHasBenefits;
