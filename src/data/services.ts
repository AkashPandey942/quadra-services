import LanguageIcon from "@mui/icons-material/Language";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import BrushIcon from "@mui/icons-material/Brush";
import CampaignIcon from "@mui/icons-material/Campaign";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description: "Fast, SEO-friendly websites using Next.js & React.",
    icon: LanguageIcon,
  },
  {
    slug: "mobile-apps",
    title: "Mobile App Development",
    description: "Android & iOS apps with scalable architecture.",
    icon: PhoneAndroidIcon,
  },
  {
    slug: "ui-ux",
    title: "UI / UX Design",
    description: "High-conversion design systems & branding.",
    icon: BrushIcon,
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "SEO, Ads & social media growth strategies.",
    icon: CampaignIcon,
  },
];
