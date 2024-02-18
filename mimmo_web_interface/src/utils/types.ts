import { ReactElement } from "react"


export class TCommandNodeTypes {
    static readonly ai  = new TCommandNodeTypes('AI', '#9747FF50');
    static readonly voice = new TCommandNodeTypes('Voice', '#F8A30050');
    static readonly audio  = new TCommandNodeTypes('Audio', '#517C0050');
    static readonly text  = new TCommandNodeTypes('Text', '#2C60F650');
    static readonly none  = new TCommandNodeTypes('None', '#00000050');
  
    // private to disallow creating other instances of this type
    private constructor(private readonly label: string, public readonly color: string) {
    }
  
    toString() {
      return this.label;
    }
  }





export type TCommandNode = {
    label:string,
    description:string,
    type:TCommandNodeTypes,
    icon?: ReactElement,
    color?:string,
}