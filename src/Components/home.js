import React from 'react'
import { Link } from 'react-router-dom'

const Home = (props) => {
  return (
      <>
    <ul>
<li>
    <Link to={"/list"}>
    list pageee
              </Link>
</li>
</ul>
    <h2>my Home</h2>
    </>
  )
}

export default Home
