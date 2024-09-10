import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({ theme: "light", toggle: () => { } });

export const ThemeProvider = ({ children }: any) => {

    const [theme, setTheme] = useState<string>("light");


    useEffect(() => {

        let t = localStorage.getItem("theme") ?? "light";

        setTheme(t);

    }, []);

    const toggle = () => {

        localStorage.setItem("theme", theme == "light" ? "dark" : "light");
    
        setTheme(theme == "light" ? "dark" : "light");
      };

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};