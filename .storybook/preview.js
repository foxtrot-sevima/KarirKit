import "../src/input.css";
import "../assets/js/toast.js";

document.body.classList.add("bg-shell", "font-sans", "text-slate-800", "antialiased");

/** @type {import('@storybook/html-vite').Preview} */
const preview = {
  parameters: {
    layout: "padded",
    options: {
      storySort: {
        order: [
          "Guides",
          ["Introduction", "Installation", "Table of Dependency", "Table of Version", "Changelog"],
          "Foundations",
          ["Colors", "Typography", "Icons", "Theming"],
          "Components",
          [
            "Button",
            "Button Group",
            "Badge",
            "Avatar",
            "Card",
            "Input",
            "Search",
            "Select",
            "Datepicker",
            "Timepicker",
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
            "Alert",
            "Toast",
            "QR Code",
            "WYSIWYG",
            "Progress",
            "Tooltip",
            "Divider",
          ],
          "Templates",
          ["Dashboard", "Auth", "Errors"],
        ],
      },
    },
  },
};

export default preview;
