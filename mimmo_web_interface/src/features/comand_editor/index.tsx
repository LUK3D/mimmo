import { TCommandNode, TCommandNodeTypes } from "../../utils/types";

import NodeList from './components/node_list';

export default function CommandEditor() {

  const nodeList:Array<TCommandNode> = [
    {
      label:"Browser",
      description:"Create a new browser instance for this command if not already, and runs the instruction.",
      icon:<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7h14ZM5 9V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3Z"></path><circle cx={8} cy={7.03} r={1} fill="currentColor"></circle><circle cx={12} cy={7.03} r={1} fill="currentColor"></circle></svg>,
      type:TCommandNodeTypes.none,
    },
    {
      label:"Mimmo",
      description:"Guive a command that mimmo can run throu the LLM instance (Ask mimmo to do something)",
      icon:<svg width="100%" height="100%" viewBox="0 0 828 736" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-gray-400"><rect x="105" y="141" width="618" height="575" rx="207" strokeWidth="50"/><rect x="168" y="258" width="492" height="300" rx="120" strokeWidth="50"/><rect x="746" y="315" width="62" height="230" rx="31" strokeWidth="50"/><rect x="727" y="12" width="24" height="298" rx="12" strokeWidth="24"/><rect x="-20" y="20" width="62" height="230" rx="31" transform="matrix(-1 0 0 1 62 295)" strokeWidth="50"/><rect x="-12" y="12" width="24" height="298" rx="12" transform="matrix(-1 0 0 1 89 0)" strokeWidth="24"/><circle cx="329" cy="440" r="38" strokeWidth="50"/><circle cx="500" cy="440" r="38" strokeWidth="50"/></svg>,
      type:TCommandNodeTypes.ai,
    },
    {
      label:"Input",
      description:"Starts the microphone for the user to speak. You can use this to get an answer from the user.",
      icon:<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={4}><rect width={14} height={27} x={17} y={4} rx={7}></rect><path strokeLinecap="round" d="M9 23c0 8.284 6.716 15 15 15c8.284 0 15-6.716 15-15M24 38v6"></path></g></svg>,
      type:TCommandNodeTypes.voice,
    },
    {
      label:"Output",
      description:"Prints a text message in the chat.",
      icon:<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16"><path fill="currentColor" d="M5.5 5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm-1-8A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2zM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5z"></path></svg>,
      type:TCommandNodeTypes.text,
    },
    {
      label:"Output",
      description:"Reads the message for the user. If the command has the permition to do so.",
      icon:<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><g fill="currentColor"><path d="M22.143 3.302c-.328-.547-.665-.921-.913-1.128a.75.75 0 0 0-.96 1.152c.127.106.353.357.587.747c.401.67.643 1.475.643 2.427s-.242 1.758-.643 2.427c-.234.39-.46.641-.587.747a.75.75 0 0 0 .96 1.152c.248-.207.585-.58.913-1.128C22.68 8.805 23 7.736 23 6.5s-.32-2.305-.857-3.198"></path><path d="M19.874 4.396a3.075 3.075 0 0 0-.674-.746a.75.75 0 0 0-.9 1.2c.062.046.19.175.326.379c.234.35.374.77.374 1.271c0 .5-.14.92-.374 1.271a1.681 1.681 0 0 1-.326.379l-.084.073A.75.75 0 0 0 19.2 9.35c.189-.141.435-.388.674-.746A3.734 3.734 0 0 0 20.5 6.5c0-.812-.235-1.517-.626-2.104M17 3.75a.75.75 0 0 0-1.314-.494L14.16 5h-1.41a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h1.41l1.526 1.744A.75.75 0 0 0 17 9.25z"></path><path d="M4.25 4H12a1 1 0 0 0-1 1v.5H4.25a.75.75 0 0 0-.75.75v11.502c0 .414.336.75.75.75h15.499a.75.75 0 0 0 .75-.75v-5.77c.474.069.974-.057 1.371-.388c.042-.035.085-.072.129-.112v6.27a2.25 2.25 0 0 1-2.25 2.25H4.25A2.25 2.25 0 0 1 2 17.752V6.25A2.25 2.25 0 0 1 4.25 4"></path><path d="M13.75 15.5a.75.75 0 0 1 .102 1.493L13.75 17h-3.5a.75.75 0 0 1-.102-1.493l.102-.007z"></path></g></svg>,
      type:TCommandNodeTypes.audio,
    },
  ];


  return (
    <div className="w-full h-full flex ">
      <div className="min-w-[400px] w-[400px] h-full border-r flex flex-col">
        <div className="w-full min-h-[80px] h-[80px] border-b bg-white flex items-center px-5 justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-black">Mimmo</h1> - <p>Commands</p>
          </div>
          <button className="text-gray-500 active:scale-95 transition-transform">
            <div className="flex w-7 h-7">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M21 19V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2m-11 0V5h9l.002 14z"></path></svg>
            </div>
          </button>
        </div>
        <div className="flex px-5 pb-4 pt-2">
          <div className=" flex w-full border px-2 py-1 rounded-md bg-gray-50 outline-none">
            <div className="w-6 h-6 text-gray-500 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0"></path></g></svg>
            </div>
            <input type="text" placeholder="Search nodes..." className="w-full outline-none bg-transparent" />
          </div>
        </div>
        <NodeList nodes={nodeList}></NodeList>
      </div>
      <div className="w-full h-full bg-gray-200 flex flex-col">
        <div className="w-full min-h-[80px] h-[80px] border-b bg-white">

        </div>
        <div className="w-full h-full grid-grdient bg-gray-100" data-bg="#000000">

        </div>
      </div>
    </div>
  )
}
