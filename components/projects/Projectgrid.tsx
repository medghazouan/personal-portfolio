import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import ProjectCard, { type ProjectData } from "./ProjectCard";

async function getProjects(): Promise<ProjectData[]> {
  await connectDB();
  const docs = await Project.find({})
    .sort({ featured: -1, createdAt: -1 })
    .lean();

  return docs.map((doc, i) => ({
    _id:         doc._id.toString(),
    title:       doc.title,
    slug:        doc.slug,
    description: doc.description,
    longDesc:    doc.longDesc,
    thumbnail:   doc.thumbnail,
    tags:        doc.tags,
    category:    doc.category,
    status:      doc.status,
    liveUrl:     doc.liveUrl,
    sourceUrl:   doc.sourceUrl,
    encryption:  doc.encryption,
    featured:    doc.featured,
    index:       i + 1,
  }));
}

export default async function ProjectGrid() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <div className="col-span-3 flex flex-col items-center justify-center py-24 text-center">
        <p
          className="text-xs uppercase tracking-widest text-slate-600 mb-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          
        </p>
        <p className="text-slate-500 text-sm">
          No projects in the archive yet. Add some via MongoDB Compass.
        </p>
      </div>
    );
  }

  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </>
  );
}