const Filter = ({setFilterName}) => {

  const changeFilterName = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      Filter results: <input onChange={changeFilterName}/>
    </div>
  )
}

export default Filter