import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../data.json";
import { ProjectType } from "../Types";
import ProjectPage from "./ProjectPage";
import { useNavigationType } from "react-router-dom";

const Redirection = () => {
  const navigationType: string | null = useNavigationType();
  const [project, setProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    const project: ProjectType | undefined = data.find(
      (project) => project.name === window.location.pathname.split("/")[1]
    );
    document.title = project?.title || "Project not found";
    setProject(project || null);
    useState;
  }, [navigationType]);

  if (project) {
    return <ProjectPage project={project} />;
  } else {
    return (
      <div className=" absolute z-50 inset-0 h-full w-full bg-black animate-opacity">
        <div className="absolute top-1/2 left-1/2 transform flex flex-col justify-center items-center text-center gap-5 -translate-x-1/2 -translate-y-1/2 text-white text">
          <h1 className="text-4xl">404</h1>
          <p>la page que vous essayez de visiter n'existe pas</p>
          <Link
            className="px-5 py-2 max-w-max bg-white text-black font-bold inline-block "
            to="/"
          >
            Retour
          </Link>
        </div>
      </div>
    );
  }
};

export default Redirection;
