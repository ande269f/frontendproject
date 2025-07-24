const { heroui } = require('@heroui/theme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',                      
    './node_modules/@heroui/theme/dist/components/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: { extend: {} },
  darkMode: 'class',
  plugins: [ heroui() ],
};
