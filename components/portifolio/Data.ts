import { Chigozie2, Chris2, Pascal, Seyi } from "../../images/team-img";

type mine = {
  skill_type: string;
  skill_level: string;
};
type know = {
  skill_main: string;
  skill_level: Array<mine>;
};
export type Tester = {
  id: number;
  name: string;
  skills: Array<know>;
  text: string;
  image: any;
  github_link: string;
  linkdln_link: string;
  twitter_link: string;
  fb_link: string;
  instagram_link: string;
  years_experience: number;
  projects: number;
  about: string;
  cv: any;
  link_tree?: string;
};

export const data: Array<Tester> = [
  {
    id: 1,
    name: "Nwokoye Christopher",
    skills: [
      {
        skill_main: "FrontEnd Development",
        skill_level: [
          {
            skill_type: "HTML",
            skill_level: "Expert",
          },
          {
            skill_type: "CSS",
            skill_level: "Expert",
          },
          {
            skill_type: "JavaScript",
            skill_level: "Expert",
          },
          {
            skill_type: "Jquery",
            skill_level: "Expert",
          },
          {
            skill_type: "Bootstrap",
            skill_level: "Expert",
          },
          {
            skill_type: "TailwindCss",
            skill_level: "Expert",
          },
          {
            skill_type: "Redux",
            skill_level: "Expert",
          },
          {
            skill_type: "W3.Css",
            skill_level: "Expert",
          },
          {
            skill_type: "React.js",
            skill_level: "Intermediate",
          },
          {
            skill_type: "Laravel",
            skill_level: "Expert",
          },
        ],
      },
      {
        skill_main: "BackEnd Development",
        skill_level: [
          {
            skill_type: "PHP",
            skill_level: "Expert",
          },
          {
            skill_type: "Laravel",
            skill_level: "Expert",
          },
          {
            skill_type: "Node.js",
            skill_level: "Expert",
          },
          {
            skill_type: "Express.js",
            skill_level: "Expert",
          },
          {
            skill_type: "Golang",
            skill_level: "Expert",
          },
          {
            skill_type: "Mysql",
            skill_level: "Expert",
          },
          {
            skill_type: "MongoDB",
            skill_level: "Expert",
          },
          {
            skill_type: "Postgresql",
            skill_level: "Expert",
          },
          {
            skill_type: "Python",
            skill_level: "Expert",
          },
          {
            skill_type: "TypeScript",
            skill_level: "Expert",
          },
          {
            skill_type: "JavaScript",
            skill_level: "Expert",
          },
          {
            skill_type: "FastAPI",
            skill_level: "Expert",
          },
          {
            skill_type: "Firebase",
            skill_level: "Expert",
          },
        ],
      },
      {
        skill_main: "Mobile Development",
        skill_level: [
          {
            skill_type: "Flutter",
            skill_level: "Expert",
          },
          {
            skill_type: "Dart",
            skill_level: "Expert",
          },
          {
            skill_type: "Firebase",
            skill_level: "Expert",
          },
          {
            skill_type: "Android Studio",
            skill_level: "Expert",
          },
          {
            skill_type: "Xcode",
            skill_level: "Expert",
          },
        ],
      },
    ],
    text: "I am a good developer",
    image: Chris2,
    github_link: "github.com/lordscoba",
    linkdln_link: "linkdln.com/lordscoba",
    twitter_link: "twitter.com/lordscoba",
    fb_link: "facebook.com/lordscoba",
    instagram_link: "instagram.com/lordscoba",
    years_experience: 5,
    projects: 30,
    about: "I am a good deveoper",
    cv: Chris2,
  },
  {
    id: 2,
    name: "Nwokoye Chigozie",
    skills: [
      {
        skill_main: "FrontEnd Development",
        skill_level: [
          {
            skill_type: "HTMl",
            skill_level: "Expert",
          },
          {
            skill_type: "CSS",
            skill_level: "Expert",
          },
          {
            skill_type: "JavaScript",
            skill_level: "Expert",
          },
          {
            skill_type: "Jquery",
            skill_level: "Expert",
          },
          {
            skill_type: "Bootstrap",
            skill_level: "Expert",
          },
          {
            skill_type: "TailwindCss",
            skill_level: "Expert",
          },
          {
            skill_type: "React.js",
            skill_level: "Expert",
          },
          {
            skill_type: "Redux",
            skill_level: "Expert",
          },
        ],
      },
      {
        skill_main: "BackEnd Development",
        skill_level: [
          {
            skill_type: "PHP",
            skill_level: "Expert",
          },
          {
            skill_type: "Laravel",
            skill_level: "Intermediate",
          },
          {
            skill_type: "JavaScript",
            skill_level: "Expert",
          },
          {
            skill_type: "Express.js",
            skill_level: "Expert",
          },
          {
            skill_type: "Rust",
            skill_level: "Expert",
          },
          {
            skill_type: "Node.js",
            skill_level: "Intermediates",
          },
          {
            skill_type: "Golang",
            skill_level: "Expert",
          },
          {
            skill_type: "Mysql",
            skill_level: "Expert",
          },
          {
            skill_type: "Postgresql",
            skill_level: "Expert",
          },
          {
            skill_type: "MongoDB",
            skill_level: "Expert",
          },
          {
            skill_type: "Python",
            skill_level: "Expert",
          },
          {
            skill_type: "FastAPI",
            skill_level: "Expert",
          },
          {
            skill_type: "Firebase",
            skill_level: "Expert",
          },
          {
            skill_type: "Django",
            skill_level: "Expert",
          },
          {
            skill_type: "TypeScript",
            skill_level: "Expert",
          },
          {
            skill_type: "Machine Learning",
            skill_level: "Expert",
          },
        ],
      },
      {
        skill_main: "Devops",
        skill_level: [
          {
            skill_type: "Linux",
            skill_level: "Expert",
          },
          {
            skill_type: "AWS",
            skill_level: "Expert",
          },
          {
            skill_type: "Azure",
            skill_level: "Expert",
          },
          {
            skill_type: "Docker",
            skill_level: "Expert",
          },
          {
            skill_type: "Kubernetes",
            skill_level: "Expert",
          },
          {
            skill_type: "Jenkins",
            skill_level: "Expert",
          },
          {
            skill_type: "Git",
            skill_level: "Expert",
          },
          {
            skill_type: "Github",
            skill_level: "Expert",
          },
          {
            skill_type: "Digital Ocean",
            skill_level: "Expert",
          },
          {
            skill_type: "Heroku",
            skill_level: "Expert",
          },
        ],
      },
    ],
    text: "I am a good developer, ",
    image: Chigozie2,
    github_link: "github.com/greg",
    linkdln_link: "linkdln.com/greg",
    twitter_link: "twitter.com/greg",
    fb_link: "facebook.com/greg",
    instagram_link: "instagram.com/greg",
    years_experience: 4,
    projects: 30,
    about: "I am a good deveoper",
    cv: Chigozie2,
  },
  {
    id: 3,
    name: "John Akande",
    skills: [
      {
        skill_main: "Web Designer",
        skill_level: [
          {
            skill_type: "Blog",
            skill_level: "Expert",
          },
          {
            skill_type: "E-commerce",
            skill_level: "Intermediate",
          },
        ],
      },
      {
        skill_main: "Graphics Designer",
        skill_level: [
          {
            skill_type: "Photoshop",
            skill_level: "Expert",
          },
          {
            skill_type: "Corel Draw",
            skill_level: "Intermediate",
          },
        ],
      },
      {
        skill_main: "SEO",
        skill_level: [
          {
            skill_type: "Keyword Research",
            skill_level: "Expert",
          },
          {
            skill_type: "Indexing",
            skill_level: "Expert",
          },
          {
            skill_type: "Backlinking",
            skill_level: "Expert",
          },
        ],
      },
    ],
    link_tree: "https://linktr.ee/johnakande",
    text: "I am a good developer",
    image: Seyi,
    github_link: "github.com/seyi",
    linkdln_link: "linkdln.com/seyi",
    twitter_link: "twitter.com/seyi",
    fb_link: "facebook.com/seyi",
    instagram_link: "instagram.com/seyi",
    years_experience: 3,
    projects: 30,
    about: "I am a good deveoper",
    cv: Seyi,
  },
  {
    id: 4,
    name: "Osunkwor Pascal",
    skills: [
      {
        skill_main: "Graphics Designer",
        skill_level: [
          {
            skill_type: "Photoshop",
            skill_level: "Expert",
          },
          {
            skill_type: "Adobe after Effect",
            skill_level: "Expert",
          },
        ],
      },
      {
        skill_main: "UI/UX designer",
        skill_level: [
          {
            skill_type: "Figma",
            skill_level: "Expert",
          },
        ],
      },
    ],
    text: "I am a good Designer",
    image: Pascal,
    github_link: "github.com/pascal",
    linkdln_link: "linkdln.com/pascal",
    twitter_link: "twitter.com/pascal",
    fb_link: "facebook.com/pascal",
    instagram_link: "instagram.com/pascal",
    years_experience: 5,
    projects: 30,
    about: "I am a good designer",
    cv: Pascal,
  },
];
