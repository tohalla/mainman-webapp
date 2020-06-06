import styled from "@emotion/styled";
import { FormikFormProps, useFormikContext } from "formik";
import React, { Ref, forwardRef, ReactNode } from "react";
import { Button } from "rebass";

import { getSpace } from "../../theme";

interface Props extends FormikFormProps {
  submitLabel?: ReactNode;
  secondaryAction?: ReactNode;
}

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
        onReset={handleReset}
        onSubmit={handleSubmit}
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  padding: ${getSpace(5)} 0;
  > div + div {
    margin-top: ${getSpace(5)};
  }
`;

Form.displayName = "Form";

export default Form;
