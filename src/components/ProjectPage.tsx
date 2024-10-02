import { useMemo } from "react";
import { ProjectType } from "../Types";
import projectsData from "../data.json";
import { useLocation } from "react-router-dom";

const ProjectPage = () => {
  // const navigationType: string | null = useNavigationType();
  const location = useLocation();
  const projectData = useMemo<ProjectType | undefined>(() => {
    return projectsData.find((p) => p.name === location.pathname.split("/")[1]);
  }, [location]);
  // console.log(projectData);

  // useEffect(() => {
  //   if (navigationType === "POP") {
  //     console.log("POP");
  //     // animation with 0 duration
  //   } else {
  //     console.log("not POP");
  //     // animation with 1s duration
  //   }
  // }, [navigationType]);

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
