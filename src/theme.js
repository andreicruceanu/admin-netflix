// import { createContext, useState, useMemo } from "react";
// import { createTheme } from "@mui/material/styles";

// // mui theme settings
// export const themeSettings = (mode) => {
//   const customPalette =
//     mode === "dark"
//       ? {
//           primary: {
//             main: "#4880FF",
//             bgColor: "#F5F6FA",
//             btnBgHover: "#F7EEFF",
//             light: "#273142",
//             dark: "#1e1e1e",
//           },
//           secondary: {
//             main: "#99B8FE",
//           },
//           background: {
//             default: "#1B2431",
//           },
//         }
//       : {
//           primary: {
//             main: "#4880FF",
//             bgColor: "#F5F6FA",
//             btnBgHover: "#F7EEFF",
//             light: "#fff",
//             dark: "#1e1e1e",
//           },
//           secondary: {
//             main: "#99B8FE",
//           },
//           background: {
//             default: "#F5F6FA",
//           },
//         };

//   return {
//     palette: {
//       mode,
//       ...customPalette,
//     },
//     typography: {
//       fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//       fontSize: 12,
//       h1: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 14,
//       },
//     },
//   };
// };

// // context for color mode
// export const ColorModeContext = createContext({
//   toggleColorMode: () => {},
// });

// export const useMode = () => {
//   const [mode, setMode] = useState("dark");

//   const colorMode = useMemo(
//     () => ({
//       toggleColorMode: () =>
//         setMode((prev) => (prev === "light" ? "dark" : "light")),
//     }),
//     []
//   );

//   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
//   return [theme, colorMode];
// };
