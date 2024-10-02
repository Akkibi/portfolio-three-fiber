import { useMemo } from "react";
import { ProjectType } from "../Types";
import projectsData from "../data.json";
import { useLocation } from "react-router-dom";

const ProjectPage = () => {
  const location = useLocation();
  const projectData = useMemo<ProjectType | undefined>(() => {
    return projectsData.find((p) => p.name === location.pathname.split("/")[1]);
  }, [location]);

  return (
    <>
      {projectData && (
        <div
          className="p-5"
          style={{
            color: projectData.colors[0],
            backgroundColor: projectData.colors[1],
          }}
        >
          <h1 className="text-3xl">{projectData.title}</h1>
          <p>{projectData.list.Date}</p>
          <p>{projectData.description}</p>
        </div>
      )}
    </>
  );
};

export default ProjectPage;
