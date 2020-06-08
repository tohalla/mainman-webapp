import styled from "@emotion/styled";
import { FormikFormProps, useFormikContext } from "formik";
import React, { Ref, forwardRef, ReactNode, FormEventHandler } from "react";
import { Box, BoxProps } from "rebass";

import { getSpace } from "../../theme";
import AsyncButton from "../AsyncButton";

type Props = FormikFormProps &
  BoxProps & {
    submitLabel?: ReactNode;
    secondaryAction?: ReactNode;
  };

const Form = forwardRef(
  (
    { action, children, secondaryAction, submitLabel, ...rest }: Props,
    ref: Ref<HTMLFormElement>
  ) => {
    const { isSubmitting, handleReset, handleSubmit } = useFormikContext();

    return (
      <StyledForm
        ref={ref}
        action={action ?? "#"}
        as="form"
        display="flex"
        onReset={handleReset}
        onSubmit={(handleSubmit as unknown) as FormEventHandler<HTMLDivElement>}
        py={5}
        {...rest}
      >
        {children}
        <Actions>
          {secondaryAction}
          <AsyncButton loading={isSubmitting} ml={[3, 5]}>
            {submitLabel}
          </AsyncButton>
        </Actions>
      </StyledForm>
    );
  }
);

Form.defaultProps = {
  submitLabel: "Submit",
};

const Actions = styled.div`
  align-self: flex-end;
`;

const StyledForm = styled(Box)`
  flex-direction: column;

  > div + div {
    margin-top: ${getSpace(5)};
  }
`;

Form.displayName = "Form";

export default Form;
