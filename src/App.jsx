import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  })

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleAddNewProject(projectData) { //mi aspetto un oggetto in ingresso con e chiavi title, desc e duedate e i values rispettivi
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random() //teoricamente è sbagliato perchè potrei ottenere più volte lo stesso numero ma per questo progettino lo lascio così
      }
      return {
        ...prevState,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  let content;
  
  if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  } else if(projectsState.selectedProjectId === null){
    content = <NewProject onAddNew={handleAddNewProject}/>
  }
  
  console.log(projectsState)
  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onStartAddProject={handleStartAddProject}/>
      {content}
    </main>
  );
}

export default App;
