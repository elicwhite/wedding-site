import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import { handleLogin } from "../services/auth"
import Layout from "../components/layout"
import SEO from "../components/seo"

function useInput() {
  const [value, setValue] = useState("")
  const input = (
    <input
      type="text"
      onChange={e => setValue(e.target.value)}
      value={value}
    />
  )

  return [value, input]
}

const LoginPage = () => {
  const [password, passwordInput] = useInput()
  useEffect(() => {
    const success = handleLogin({
      password: password,
    })

    if (success) {
      navigate(`/`)
    }
  }, [password])

  return (
    <Layout>
      <SEO title="Login" />
      {passwordInput}
    </Layout>
  )
}

export default LoginPage
