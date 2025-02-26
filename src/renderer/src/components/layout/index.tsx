import { ReactNode } from 'react'

interface LayoutProps {
  title: string
  children?: ReactNode
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div>
      <div>{title}</div>
      {children}
    </div>
  )
}

export default Layout
