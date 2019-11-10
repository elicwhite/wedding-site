import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import NavBar from "../components/navbar"
import Image from "../components/image"
import SEO from "../components/seo"

import { withPrivateRoute } from "../components/privateRoute"

const URL =
  "https://script.google.com/macros/s/AKfycbw40Vlc4DUTT-s8ZsKFK9zThsqAGWocI_3I0MOChYuHHx4s8dO6/exec"

function useInput() {
  const [value, setValue] = useState("")
  const input = (
    <input type="text" onChange={e => setValue(e.target.value)} value={value} />
  )

  return [value, input]
}

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        We are getting married!
      </div>
    </>
  )
}

export default withPrivateRoute(IndexPage)
