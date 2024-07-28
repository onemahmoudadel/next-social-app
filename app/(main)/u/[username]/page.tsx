const page = ({ params }: { params: { username: string } }) => {
  return (
    <div>{params.username} page</div>
  )
}

export default page