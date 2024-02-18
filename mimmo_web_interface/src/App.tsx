import { useEffect } from "react"
import CommandEditor from "./features/comand_editor"
import { mimmoStart } from "./core";

function App() {
  
  useEffect(() => {
    mimmoStart();
  }, []);
  
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <CommandEditor></CommandEditor>
      </div>
    </>
  )
}

export default App
