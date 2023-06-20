import React from 'react'

export default function Search(props) {
  return (
    <>
    <div className="col col-sm-4">
        <input type="text" className='form-control' placeholder='Search here' value={props.value} onChange={(event)=>props.setSearch(event.target.value)} />
    </div>
    </>
  )
}
