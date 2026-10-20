/**
 * Alvee's public details. Every profile link on the site reads from here.
 * Drop a square photo at public/alvee.jpg and it shows up on its own.
 */
export const CREATOR = {
  name: "Alvee Alam",
  tagline: "Marketing | Outreach | Design",
  location: "Sylhet, Bangladesh",
  bio: "I build small, useful tools and the marketing around them. Relay started with a simple question: why does my AI know nothing about the alerts my phone gets all day? If it saves you a copy-paste, I'd love to hear about it.",
  email: "venalvees@gmail.com",
  photo: "/alvee.jpg",
  links: {
    linkedin: "https://www.linkedin.com/in/alvee-alam",
    facebook: "https://www.facebook.com/share/1CaHaYx8ac/",
    whatsapp: "https://wa.me/8801728306663",
    email: "mailto:venalvees@gmail.com",
    website: "https://tinysamples.com",
  },
} as const;
