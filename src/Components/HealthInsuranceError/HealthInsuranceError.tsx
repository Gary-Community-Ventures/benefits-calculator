import { useEffect } from 'react';
import {
  useErrorController,
  healthInsuranceDataHasError,
  getHealthInsuranceError,
} from '../../Assets/validationFunctions';
import { HealthInsurance } from '../../Types/FormData';
import { FormHelperText } from '@mui/material';

interface HealthInsuranceErrorProps {
  hhMemberIndex: number;
  hhMemberInsurance: HealthInsurance;
  submitted: number;
}

const HealthInsuranceError = ({ hhMemberIndex, hhMemberInsurance, submitted }: HealthInsuranceErrorProps) => {
  const healthInsuranceErrorController = useErrorController(healthInsuranceDataHasError, getHealthInsuranceError);

  useEffect(() => {
    healthInsuranceErrorController.setSubmittedCount(submitted);
  }, [submitted]);

  useEffect(() => {
    healthInsuranceErrorController.updateError(hhMemberInsurance);
  });

  return (
    healthInsuranceErrorController.showError && (
      <FormHelperText>
        {healthInsuranceErrorController.message({ index: hhMemberIndex, healthInsurance: hhMemberInsurance })}
      </FormHelperText>
    )
  );
};

export default HealthInsuranceError;
