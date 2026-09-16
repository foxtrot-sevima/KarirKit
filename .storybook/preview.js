import "../src/input.css";

document.body.classList.add("bg-shell", "font-sans", "text-slate-800", "antialiased");

/** @type {import('@storybook/html-vite').Preview} */
const preview = {
  parameters: {
    layout: "padded",
    options: {
      storySort: {
        order: [
          "Guides",
          ["Introduction", "Table of Dependency", "Table of Version", "Changelog"],
          "Foundations",
          ["Colors", "Typography", "Icons"],
          "Components",
          [
            "Button",
            "Badge",
            "Avatar",
            "Card",
            "Input",
            "Search",
            "Select",
            "Date Picker",
            "Textarea",
            "Checkbox",
            "Radio",
            "Toggle",
            "Dropdown",
            "Modal",
            "Sidebar",
            "Tabs",
            "Breadcrumb",
            "Table",
            "DataTable",
            "Alert",
            "Progress",
            "Tooltip",
            "Divider",
          ],
        ],
      },
    },
  },
};

export default preview;
