import type { GenericProps } from '../../lib/generics';
import './Content.css'

const Content = ({children}: GenericProps) => {
  return <main className="content">
    {children}
  </main>
}

export default Content;