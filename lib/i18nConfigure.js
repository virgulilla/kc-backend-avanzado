import { I18n } from "i18n";
import path from "path";

const i18n = new I18n({
  locales: ["en", "es"],
  directory: path.join(process.cwd(), "locales"),
  defaultLocale: "en",
  autoReload: true,
  syncFiles: true,
});

export default i18n;
