import { Anek_Bangla, Fraunces, Hind_Siliguri, IBM_Plex_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";

const body = Inter({ variable: "--kp-body", subsets: ["latin"] });
const display = Plus_Jakarta_Sans({ variable: "--kp-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const serif = Fraunces({ variable: "--kp-serif", subsets: ["latin"], style: ["italic"], weight: ["500"] });
const mono = IBM_Plex_Mono({ variable: "--kp-mono", subsets: ["latin"], weight: ["500"] });
const bangla = Hind_Siliguri({ variable: "--kp-bangla", subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });
const banglaDisplay = Anek_Bangla({ variable: "--kp-bangla-display", subsets: ["bengali", "latin"], weight: ["600", "700", "800"] });

export const fontVariables = [body, display, serif, mono, bangla, banglaDisplay].map((f) => f.variable).join(" ");
