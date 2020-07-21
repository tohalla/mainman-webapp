import React from "react";
import { FormattedMessage } from "react-intl";

import { titles } from "src/general/messages";

const ProfilePage = () => {
  return <div />;
};

ProfilePage.displayName = "ProfilePage";
ProfilePage.layoutProps = {
  title: <FormattedMessage {...titles.profile} />,
};

export default ProfilePage;
