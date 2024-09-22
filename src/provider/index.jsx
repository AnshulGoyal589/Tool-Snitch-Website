import NextUI from "./NextUI";
import { ThemeProvider } from "./theme-provider";

export default function Provider({ children }) {
  return (
    <NextUI>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextUI>
  );
}
