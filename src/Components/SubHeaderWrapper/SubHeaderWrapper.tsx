import { PropsWithChildren } from "react";

export const SubHeaderWrapper = (props: PropsWithChildren<{}>, key?:string) => {
  return(
    <div className="secondary-heading">
      {props.children}
    </div>
  )
}