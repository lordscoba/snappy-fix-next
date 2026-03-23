import Link from "next/link";
import { toolCategories } from "@/data/toolsCategoryData";
import { tools } from "@/data/toolsData";

export default function ToolCategories({
  searchQuery = "",
}: {
  searchQuery?: string;
}) {
  // Filter categories based on if their name matches OR if any tools within them match the search
  const filteredCategories = toolCategories.filter((category) => {
    const categoryMatches = category.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const toolsInCategoryMatch = tools.some(
      (tool) =>
        tool.category === category.name &&
        (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())),
    );
    return categoryMatches || toolsInCategoryMatch;
  });

  if (filteredCategories.length === 0) return null;

  return (
    <section className="space-y-10">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2b1d3a] border-l-4 border-[#fb397d] pl-4">
        Browse Tool Categories
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCategories.map((category) => {
          const count = tools.filter(
            (tool) => tool.category === category.name,
          ).length;

          return (
            <Link
              key={category.slug}
              href={category.href}
              className="group relative rounded-[2rem] border border-[#e9e1ff] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(91,50,180,0.15)]"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#2b1d3a] group-hover:text-[#5b32b4] transition-colors">
                  {category.name}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  Explore powerful {category.name.toLowerCase()} designed to
                  help you process and optimize images efficiently.
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-500">
                    {count} tool{count !== 1 ? "s" : ""}
                  </span>

                  <span className="inline-flex items-center text-sm font-semibold text-[#c3003a] group-hover:gap-3 gap-1 transition-all">
                    View →
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-[#5b32b4]/5 to-[#fb397d]/5" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
