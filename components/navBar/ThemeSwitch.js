import { useTheme, Switch } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { SunIcon } from "../icons/Sunicon";
import { MoonIcon } from "../icons/Moonicon";

export function ThemeSwitch() {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  return (
    <Switch
      iconOn={<SunIcon filled />}
      iconOff={<MoonIcon filled />}
      checked={isDark}
      size="xs"
      onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
    />
  );
}