import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import CardWithPicture from "../../components/Card/CardWithPicture";
import ProviderWrapper from "../../helpers/providerWrapper";
import { Tutorial } from "../../components/Card/types";

export default {
  title: "Card/CardWithPicture",
  component: CardWithPicture,
  argTypes: {
    backgroundColor: { control: "color" },
    color: { control: "color" },
    name: { control: "text" },
    organizationName: { control: "text" },
    date: { control: "text" },
    title: { control: "text" },
    contentDescription: { control: "text" }
  }
} as Meta<typeof CardWithPicture>;

export const Default: StoryFn<typeof CardWithPicture> = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <CardWithPicture {...args} />
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
    featured_image: "https://via.placeholder.com/400x225",
    tut_tags: ["HTML", "CSS"]
  } as Partial<Tutorial> as Tutorial
};
