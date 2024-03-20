const SmartHRUIPreset = require("smarthr-ui/lib/smarthr-ui-preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [SmartHRUIPreset],
  content: ["./src/**/*.{ts,tsx}"],
};
