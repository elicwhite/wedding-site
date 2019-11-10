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

const RSVPPage = () => {
  const [name, nameInput] = useInput()

  const handleSubmit = event => {
    console.log("submit")
    event.preventDefault()

    const formData = {}
    formData.name = name
    formData.message = "test messages"
    formData.email = "foo@blah.com"
    formData.color = "green"

    fetch(URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
  }

  return (
    <>
      <SEO title="Home" />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />

        <h3>Name</h3>
        <form onSubmit={handleSubmit}>
          <div>{nameInput}</div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  )
}

export default withPrivateRoute(RSVPPage)
