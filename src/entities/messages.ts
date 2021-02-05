import { defineMessages } from "react-intl";

export default defineMessages({
  // link text for navigating to creation of new entity
  createEntity: "creating a new entity",
  /* text to display when organisation has no entities and the user has
   rights to create them */
  noEntities:
    "No entities created yet for {organisationLink}. Continue with {createLink}.",
  /* text to display when organisation has no entities and the user does not
   have rights to create them */
  noEntitiesRestricted: "There exists no entities for {organisationLink}.",
});

export const formMessages = defineMessages({
  // Entity form: label for the name field
  name: "Name",
  // Entity form: label for the entity description field
  description: "Description",
  // Entity form: submit text for creating a new entity
  create: "Create entity",
  // Entity form: submit text for updating an entity
  update: "Update entity",
});
