export default {
  title: "Components/Radio",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Radio button dalam satu grup (`name` sama)." } },
  },
  argTypes: {
    optionA: { control: "text", name: "Label opsi A" },
    optionB: { control: "text", name: "Label opsi B" },
    selected: { control: "radio", options: ["A", "B"] },
  },
  args: {
    optionA: "Remote",
    optionB: "Hybrid",
    selected: "A",
  },
};

export const Playground = {
  render: (args) => `
    <div class="p-6 space-y-2.5">
      <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="radio" name="wfh" ${args.selected === "A" ? "checked" : ""} class="form-radio" /> ${args.optionA}</label>
      <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="radio" name="wfh" ${args.selected === "B" ? "checked" : ""} class="form-radio" /> ${args.optionB}</label>
    </div>`,
};
