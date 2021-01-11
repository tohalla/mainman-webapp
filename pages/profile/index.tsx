import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

const messages = defineMessages({
  // title text for profile
  title: "Profile",
});

const ProfilePage = () => {
  return <div />;
};

ProfilePage.displayName = "ProfilePage";
ProfilePage.layoutProps = {
  title: <FormattedMessage {...messages.title} />,
};

export default ProfilePage;
