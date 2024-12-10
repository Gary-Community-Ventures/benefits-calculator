import { zodResolver } from '@hookform/resolvers/zod';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useContext, useState } from 'react';
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
  alreadyHasBenefits: string[];
  onChange: (alreadyHasBenefits: string[]) => void;
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

        const benefitValues = Object.keys(details.benefits);

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
              let newAlreadyHas: string[] = [...alreadyHasBenefits];

              for (const value of benefitValues) {
                if (values.includes(value)) {
                  if (newAlreadyHas.includes(value)) {
                    continue;
                  }
                  newAlreadyHas.push(value);
                } else {
                  newAlreadyHas = newAlreadyHas.filter((v) => v !== value);
                }
              }

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

  const benefits = useConfig<CategoryBenefitsConfig>('category_benefits');
  const allBenefits = Object.values(benefits)
    .map((value) => {
      return Object.keys(value.benefits);
    })
    .flat();

  const formSchema = z
    .object({
      hasBenefits: z.enum(['true', 'false', 'preferNotToAnswer']),
      alreadyHasBenefits: z.array(z.string()),
    })
    .refine(
      ({ hasBenefits, alreadyHasBenefits }) => {
        if (hasBenefits === 'true' && alreadyHasBenefits.length === 0) {
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

  const alreadyHasBenefits = Object.entries(formData.benefits)
    .filter(([_, value]) => value)
    .map(([name, _]) => name);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<{ hasBenefits: 'true' | 'false' | 'preferNotToAnswer'; alreadyHasBenefits: string[] }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasBenefits: formData.hasBenefits,
      alreadyHasBenefits: alreadyHasBenefits,
    },
  });

  const formSubmitHandler = ({ alreadyHasBenefits, hasBenefits }: z.infer<typeof formSchema>) => {
    if (uuid === undefined) {
      throw new Error('uuid is not defined');
    }

    const newBenefits: Benefits = {};
    for (const benefit of allBenefits) {
      if (hasBenefits === 'true') {
        newBenefits[benefit] = alreadyHasBenefits.includes(benefit);
      } else {
        newBenefits[benefit] = false;
      }
    }

    const newFormData = { ...formData, hasBenefits: hasBenefits, benefits: newBenefits };

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
                  value={'true'}
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
        {watch('hasBenefits') === 'true' && (
          <div>
            <QuestionQuestion>
              <FormattedMessage
                id="questions.hasBenefits-a"
                defaultMessage="Please tell us what benefits your household currently has."
              />
            </QuestionQuestion>
            <CategoryBenefits
              alreadyHasBenefits={watch('alreadyHasBenefits')}
              onChange={(values) => setValue('alreadyHasBenefits', values)}
            />
            {errors.alreadyHasBenefits !== undefined && (
              <ErrorMessageWrapper fontSize="1.5rem">{errors.alreadyHasBenefits.message}</ErrorMessageWrapper>
            )}
          </div>
        )}
        <PrevAndContinueButtons backNavigationFunction={backNavigationFunction} />
      </form>
    </div>
  );
}

export default AlreadyHasBenefits;
