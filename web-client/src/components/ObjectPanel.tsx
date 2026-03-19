import type { GenericProps } from "../lib/generics"


const ObjectPanel = ({children}: GenericProps) => {
  return <div className="object-panel">
    {children}
  </div>
}

export default ObjectPanel