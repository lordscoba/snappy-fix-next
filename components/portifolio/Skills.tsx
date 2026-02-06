"use client";

import { memo, useMemo } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { useParams } from "next/navigation";
import { data } from "./Data";

const Skills = () => {
  const params = useParams();
  const locationId = Number(params?.id);

  const single = useMemo(() => {
    return data[locationId - 1];
  }, [locationId]);

  if (!single) {
    return (
      <section className="py-20 text-center">
        <p>User not found.</p>
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
        {single.skills.map((skill, index) => (
          <SkillCard key={index} title={skill.skill_main}>
            {skill.skill_level.map((item, i) => (
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

type SkillItemProps = {
  domain: string;
  level: string;
};

const SkillItem = ({ domain, level }: SkillItemProps) => (
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
