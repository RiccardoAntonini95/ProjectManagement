import { useState } from "react";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import NewTask from "./components/NewTask";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleAddTask(text){
    setProjectsState(prevState => {
      const taskId = Math.random()
      const newTask = {
        text : text,
        projectId : prevState.selectedProjectId,
        id: taskId 
      }
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id){
    setProjectsState(prevState => {
      return{
        ...prevState, 
        tasks : prevState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleCancelAddProject(){
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddNewProject(projectData) { //mi aspetto un oggetto in ingresso con e chiavi title, desc e duedate e i values rispettivi
    setProjectsState(prevState => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId //teoricamente è sbagliato perchè potrei ottenere più volte lo stesso numero ma per questo esercizio lo lascio così
      }
      console.log(newProject)
      return {
        ...prevState,
        selectedProjectId : undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleSelectProject(id){
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId : id
      }
    })
  }

  function handleDeleteProject(){
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId : undefined, 
        //elimino il progetto attuale sul quale ho cliccato delete dall'array dello state
        //filtro solo quello che ha lo stesso id del precedente state, così elimino solo lui e non serve neanche l'id in ingresso
        projects : prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }

  //cerco l'elemento nell'array projects dell'oggetto projectsState usando l'id
  const currentProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

  //in base al fatto che un progetto sia selezionato o meno renderizzo 3 componenti diversi
  let content = <SelectedProject  project={currentProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks}/>;
  
  if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  } else if(projectsState.selectedProjectId === null){
    content = <NewProject onAddNew={handleAddNewProject} onCancel={handleCancelAddProject}/>
  }
 
  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelect={handleSelectProject} />
      {content}
    </main>
  );
}

export default App;
