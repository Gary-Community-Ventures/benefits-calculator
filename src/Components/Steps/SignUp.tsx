import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function SignUp() {
  const contactInfoSchema = z
    .object({
      firstName: z.string().min(1), // TODO: add error message
      lastName: z.string().min(1), // TODO: add error message
      email: z.string().min(1).email().optional(), // TODO: add error message
      cell: z.number().int().pipe(z.string().length(10)).optional(), // TODO: add error message
      tcpa: z.literal(true), // TODO: add error message
    })
    .superRefine(({ email, cell }, ctx) => {
      const noEmailAndCell = email === undefined && cell === undefined;
      const message = 'todo add message'; // TODO: add error message

      if (noEmailAndCell) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message,
          path: ['email'],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message,
          path: ['cell'],
        });
        return false;
      }

      return true;
    });

  const formSchema = z
    .object({
      contactType: z.object({
        sendOffers: z.boolean(),
        sendUpdates: z.boolean(),
      }),
      contactInfo: contactInfoSchema.optional(),
    })
    .refine((data) => {
      const { contactType, contactInfo } = data;
      const showContactInfo = contactType.sendOffers || contactType.sendUpdates;

      if (showContactInfo && contactInfo === undefined) {
        return false;
      }

      return true;
    });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return <div></div>;
}
