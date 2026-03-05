import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import CardWithoutPicture from "../../components/Card/CardWithoutPicture";
import ProviderWrapper from "../../helpers/providerWrapper";
import { Tutorial } from "../../components/Card/types";

export default {
  title: "Card/CardWithoutPicture",
  component: CardWithoutPicture,
  argTypes: {
    backgroundColor: { control: "color" },
    name: { control: "text" },
    organizationName: { control: "text" },
    date: { control: "text" },
    title: { control: "text" },
    contentDescription: { control: "text" }
  }
} as Meta<typeof CardWithoutPicture>;

export const Default: StoryFn<typeof CardWithoutPicture> = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <CardWithoutPicture {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

Default.args = {
  tutorial: {
    tutorial_id: "sample-id",
    title: "FreeCodeCamp Especially If You Do Not Have 24/7 Internet Access",
    summary:
      "Make sure your conditions fit with the map. Instead of writing logic handling for each case, We had a map, and we put the case and the logic as key, value pairs. Hence, We can retriev the logic from the map based on the key...",
    created_by: "Shahaab",
    owner: "Codelabz",
    tut_tags: ["HTML", "CSS"]
  } as Partial<Tutorial> as Tutorial
};
