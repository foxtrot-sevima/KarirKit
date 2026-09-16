export default {
  title: "Components/Select",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Combobox custom (`.combo`) - dropdown biasa, dropdown dengan pencarian, dan multi-select dengan tag. Ditampilkan dalam state tertutup di sini; interaksinya digerakkan oleh vanilla JS di `index.html`.",
      },
    },
  },
};

export const Basic = {
  render: () => `
    <div class="p-6 max-w-sm">
      <label class="form-label">Level Pengalaman</label>
      <div class="combo combo-full">
        <button type="button" class="combo-trigger">
          <span>Entry Level</span>
          <i class="kk kk-caret-down combo-chevron"></i>
        </button>
      </div>
    </div>`,
};

export const Searchable = {
  name: "Searchable Dropdown",
  render: () => `
    <div class="p-6 max-w-sm">
      <label class="form-label">Pilih Posisi (search dropdown)</label>
      <div class="combo combo-full">
        <button type="button" class="combo-trigger">
          <span class="combo-placeholder">Pilih posisi...</span>
          <i class="kk kk-caret-down combo-chevron"></i>
        </button>
      </div>
    </div>`,
};

export const MultiSelectWithTags = {
  name: "Multi-select with Tags",
  render: () => `
    <div class="p-6 max-w-sm">
      <label class="form-label mb-2.5">Pilih Skill (checkbox &amp; tag dropdown)</label>
      <div class="combo combo-full">
        <button type="button" class="combo-trigger">
          <span class="combo-tags">
            <span class="combo-placeholder">Pilih skill...</span>
          </span>
          <i class="kk kk-caret-down combo-chevron"></i>
        </button>
      </div>
    </div>`,
};
