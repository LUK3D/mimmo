import { useState } from "react";
import { TCommandNode, TCommandNodeTypes } from "../../types";

export default function NodeList({nodes}:{nodes:Array<TCommandNode>}) {
    const [expanded, setExtapnded] = useState(true);

    const expandhandller = ()=>setExtapnded(!expanded);
  return (
    <>
    <button className="w-full py-2 border-t flex px-5 items-center outline-none" onClick={expandhandller}>
        <div className="mr-1">
        <svg className={`${expanded?'rotate-90':''} transform transition-transform`} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z"></path></g></svg>
        </div> 
        <p>Core Nodes</p>
    </button>
    {expanded &&<ul className="w-full flex flex-col px-5 py-2 gap-2 bg-gray-50">
         {nodes.map((node)=>(
            <li className="flex w-full " key={`${node.label}-${node.type.toString()}`}>
                <button className="w-full py-2 px-2 hover:border-gray-200 border-transparent border rounded-lg flex text-left active:scale-[0.99] items-center">
                    <div className="min-w-[60px] min-h-[60px] w-[60px] h-[60px] bg-white rounded-md text-gray-400 p-2 border">
                        {node.icon}
                    </div>
                    <div className="flex flex-col ml-3 w-full">
                    <div className="font-bold flex w-full justify-between">
                        <p>{node.label}</p> 
                        {node.type!= TCommandNodeTypes.none && <div style={{backgroundColor:node.type.color,}} className={` text-black/55 px-1 p-1 text-xs rounded-md`}>( {node.type.toString()} )</div>}
                    </div>
                    <p className="text-gray-400 text-xs">{node.description}</p>
                    </div>
                </button>
            </li>
        ))}
        
    </ul>}
    </>
  )
}
