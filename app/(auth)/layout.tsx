import { PropsWithChildren } from "react"

const layout = ({children}:PropsWithChildren) => {
  return (
    <>
      <main className="flex justify-center items-center py-8 min-h-screen bg-primary-foreground">
          {children}
      </main>
    </>
  )
}

export default layout