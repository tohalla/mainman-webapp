import { useFormikContext } from "formik";
import React, { Ref, forwardRef, ReactNode, FormEventHandler } from "react";
import { FormattedMessage } from "react-intl";

import Button from "../Button";
import messages from "../messages";

import { Box, BoxProps } from "rebass";

interface Props extends Omit<BoxProps, "css"> {
  action?: string;
  submitLabel?: ReactNode;
  secondaryAction?: ReactNode;
}

const Form = forwardRef(
  (
    { action, children, secondaryAction, submitLabel, ...rest }: Props,
    ref: Ref<HTMLFormElement>
  ) => {
    const { isSubmitting, handleReset, handleSubmit } = useFormikContext();

    return (
      <Box
        ref={ref}
        as="form"
        onReset={handleReset}
        onSubmit={(handleSubmit as unknown) as FormEventHandler<HTMLDivElement>}
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          "> div + div": { marginTop: 5 },
        }}
        {...rest}
      >
        {children}
        <Box sx={{ alignSelf: "flex-end" }}>
          {secondaryAction}
          <Button loading={isSubmitting} ml={[3, 5]} type="submit">
            {submitLabel}
          </Button>
        </Box>
      </Box>
    );
  }
);

Form.defaultProps = {
  submitLabel: <FormattedMessage {...messages.submit} />,
};

Form.displayName = "Form";

export default Form;
