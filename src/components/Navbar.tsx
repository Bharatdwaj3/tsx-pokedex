type Props = {
    title:string
}

const Navbar = ({title}: Props) => {
  return (
    <>
        <div>{title}</div>
    </>
  )
}

export default Navbar