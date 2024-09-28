import { useEffect } from "react";
import { ProjectType } from "../Types";
import { useNavigationType } from "react-router-dom";

const ProjectPage = ({ project }: { project: ProjectType }) => {
  const navigationType: string | null = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") {
      console.log("POP");
      // animation with 0 duration
    } else {
      console.log("not POP");
      // animation with 1s duration
    }
  }, [navigationType]);

  return (
    <>
      {project && (
        <div
          className="p-5"
          style={{
            color: project.colors[0],
            backgroundColor: project.colors[1],
          }}
        >
          <h1 className="text-3xl">{project.title}</h1>
          <p>{project.list.Date}</p>
          <p>{project.description}</p>
        </div>
      )}
    </>
  );
};

export default ProjectPage;
