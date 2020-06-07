import styled from "@emotion/styled";
import { FormikFormProps, useFormikContext } from "formik";
import React, { Ref, forwardRef, ReactNode, FormEventHandler } from "react";
import { Button, Box, BoxProps } from "rebass";

import { getSpace } from "../../theme";

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
    const { handleReset, handleSubmit } = useFormikContext();

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
          <Button ml={[3, 5]} type="submit">
            {submitLabel}
          </Button>
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
