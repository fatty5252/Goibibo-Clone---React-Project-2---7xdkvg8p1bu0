// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["*"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["*"],
  theme: {
    extend: {},
  },
  plugins: [],
});

module.exports = {
  theme: {
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
    },
  },
  variants: {},
  plugins: [],
}

