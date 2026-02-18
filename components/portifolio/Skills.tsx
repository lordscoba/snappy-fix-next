"use client";

import { memo } from "react";
import { BsPatchCheck } from "react-icons/bs";

type SkillsProps = {
  portfolio: any;
};

const Skills = ({ portfolio }: SkillsProps) => {
  if (!portfolio) {
    return (
      <section className="py-20 text-center">
        <p>Portfolio not found.</p>
      </section>
    );
  }

  return (
    <section id="skills" className="bg-[#fafafa] py-14 px-4">
      <header className="text-center space-y-2">
        <h2 className="text-4xl md:text-5xl font-bold">Skills</h2>
        <p className="text-gray-600">My technical level</p>
      </header>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {portfolio.skills?.map((skill: any, index: number) => (
          <SkillCard key={index} title={skill.skill_main}>
            {skill.skill_level.map((item: any, i: number) => (
              <SkillItem
                key={i}
                domain={item.skill_type}
                level={item.skill_level}
              />
            ))}
          </SkillCard>
        ))}
      </div>
    </section>
  );
};

const SkillItem = ({ domain, level }: any) => (
  <div className="flex gap-2 items-start">
    <BsPatchCheck className="mt-1 text-black" />
    <div>
      <h4 className="font-medium">{domain}</h4>
      <p className="text-sm text-gray-500">{level}</p>
    </div>
  </div>
);

const SkillCard = ({ title, children }: any) => (
  <article className="w-full md:w-[340px] bg-white p-6 border border-gray-300 rounded-2xl shadow hover:shadow-xl transition space-y-4">
    <h3 className="text-center text-xl font-semibold">{title}</h3>
    <div className="grid grid-cols-2 gap-4">{children}</div>
  </article>
);

export default memo(Skills);
