// //index.jsx
// import NextUI from "./NextUI";
// import { ThemeProvider } from "./theme-provider";

// export default function Provider({ children }) {
//   return (
//     <NextUI>
//       <ThemeProvider
//         attribute="class"
//         defaultTheme="light"
//         enableSystem
//         disableTransitionOnChange
//       >
//         {children}
//       </ThemeProvider>
//     </NextUI>
//   );
// }


// Provider/index.tsx
'use client';

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}