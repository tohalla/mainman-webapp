import { useFormikContext } from "formik";
import React, { Ref, forwardRef, ReactNode, FormEventHandler } from "react";
import { FormattedMessage } from "react-intl";
import { FlexProps, Flex } from "theme-ui";

import Button from "../Button";
import messages from "../messages";

export interface FormProps extends Omit<FlexProps, "ref"> {
  action?: string;
  submitLabel?: ReactNode;
  secondaryAction?: ReactNode;
}

const Form = forwardRef<HTMLDivElement, FormProps>(
  (
    { action, children, secondaryAction, submitLabel, sx, ...rest }: FormProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const { isSubmitting, handleReset, handleSubmit } = useFormikContext();

    return (
      <Flex
        ref={ref}
        as="form"
        onReset={handleReset}
        onSubmit={(handleSubmit as unknown) as FormEventHandler<HTMLDivElement>}
        sx={{
          flex: 1,
          flexDirection: "column",
          "> div,label + div,label": { marginTop: 5 },
          width: 8,
          ...sx,
        }}
        {...rest}
      >
        {children}
        <Flex
          sx={{
            alignSelf: "flex-end",
            justifyContent: "center",
            alignItems: ["flex-end", "center"],
            flexDirection: ["column-reverse", "row"],
          }}
        >
          {secondaryAction}
          <Button loading={isSubmitting} mb={[4, 0]} ml={[0, 5]} type="submit">
            {submitLabel}
          </Button>
        </Flex>
      </Flex>
    );
  }
);

Form.defaultProps = {
  submitLabel: <FormattedMessage {...messages.submit} />,
};

Form.displayName = "Form";

export default Form;
