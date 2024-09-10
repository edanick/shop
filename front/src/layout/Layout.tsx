import { useContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "../components/Layout/Header/Header";
import Main from "../components/Layout/Main";
import Footer from "../components/Layout/Footer";

import tmc from "../utils/themes";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Layout({ children }: { children: string | JSX.Element | JSX.Element[] }) {
    const
        themeContext = useContext(ThemeContext),
        theme = themeContext.theme,
        isDarkTheme = theme == "dark",

        themes: any = tmc,
        darkTheme = createTheme(themes.dark),
        lightTheme = createTheme(themes.light);

    return (
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <CssBaseline />
            <Header isDarkTheme={isDarkTheme} onThemeToggleChange={themeContext.toggle} />
            <Main>{children}</Main>
            <Footer />
        </ThemeProvider>
    );
}