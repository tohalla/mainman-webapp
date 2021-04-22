import { useFormikContext } from "formik";
import React, { Ref, forwardRef, ReactNode, FormEventHandler } from "react";
import { FormattedMessage } from "react-intl";
import { FlexProps, Flex } from "theme-ui";

import Button from "../Button";
import messages from "../messages";

export interface FormProps extends FlexProps {
  action?: string;
  submitLabel?: ReactNode;
  secondaryAction?: ReactNode;
  inline?: boolean;
  displayActions?: boolean;
}

const Form = forwardRef<HTMLDivElement, FormProps>(
  (
    {
      action,
      children,
      secondaryAction,
      submitLabel,
      inline,
      sx,
      displayActions,
      ...rest
    }: FormProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const { isSubmitting, handleReset, handleSubmit } = useFormikContext();

    return (
      <Flex
        as="form"
        onReset={handleReset}
        onSubmit={(handleSubmit as unknown) as FormEventHandler<HTMLDivElement>}
        sx={
          inline
            ? {
                alignItems: "flex-end",
                alignSelf: ["stretch", "flex-start"],
                ...sx,
              }
            : {
                alignSelf: "stretch",
                flexDirection: "column",
                "> div,label + div,label": { marginTop: 5 },
                width: ["auto", 8],
                ...sx,
              }
        }
        {...rest}
        ref={ref}
      >
        {children}
        {displayActions && (
          <Flex
            ml={inline ? 4 : 0}
            sx={{
              flexShrink: 0,
              justifyContent: ["center", "flex-end"],
              alignItems: "center",
              flexDirection: ["column-reverse", "row"],
            }}
          >
            {secondaryAction}
            <Button
              loading={isSubmitting}
              mb={inline ? 0 : [4, 0]}
              ml={inline ? 0 : [0, 5]}
              type="submit"
            >
              {submitLabel}
            </Button>
          </Flex>
        )}
      </Flex>
    );
  }
);

Form.defaultProps = {
  submitLabel: <FormattedMessage {...messages.submit} />,
  inline: false,
};

Form.displayName = "Form";

export default Form;
