declare module "react-intl" {
  import { MessageDescriptor } from "react-intl";

  type Descriptor = Required<
    Pick<MessageDescriptor, "description" | "defaultMessage">
  >;
  type Format = Record<string, Descriptor>;

  function defineMessages(msgs: Format): Format;
}
