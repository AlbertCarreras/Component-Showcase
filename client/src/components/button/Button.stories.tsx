import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: "Button",
  },
};

export const WithCustomText: Story = {
  args: {
    text: "Submit",
  },
};

export const Disabled: Story = {
  args: {
    text: "Disabled",
    disabled: true,
  },
};
