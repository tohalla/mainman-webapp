import { useFormikContext } from "formik";
import React, { Ref, forwardRef, ReactNode, FormEventHandler } from "react";
import { FormattedMessage } from "react-intl";

import Button from "../Button";
import messages from "../messages";

import { BoxProps, Flex } from "rebass";

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
      <Flex
        ref={ref}
        as="form"
        onReset={handleReset}
        onSubmit={(handleSubmit as unknown) as FormEventHandler<HTMLDivElement>}
        sx={{
          flex: 1,
          flexDirection: "column",
          "> div + div": { marginTop: 5 },
        }}
        {...rest}
      >
        {children}
        <Flex
          alignItems={["flex-end", "center"]}
          flexDirection={["column-reverse", "row"]}
          justifyContent="center"
          sx={{ alignSelf: "flex-end" }}
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
