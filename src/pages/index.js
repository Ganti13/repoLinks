import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef } from 'react'
import cookies from 'js-cookies'
import styles from '../styles/Home.module.css'

import { formValidation } from '../utils/formValidation'

export default function Home() {

  const [repo, setRepo] = useState({
    id: null,
    name: '',
    url: ''
  })

  const inputRef = useRef(null)

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = await formValidation(repo)
    if (err){ 
      setError(err[0])
      setSuccess(false)
      return 
    }

    const allList = JSON.parse(cookies.getItem('repositories')) || []
    const repolist = [...allList, {...repo, id: Date.now()}]
    cookies.setItem('repositories',JSON.stringify(repolist), {secure: true})

    setError(null)
    setSuccess(true)
    setRepo({
      name: '',
      url: ''
    })

    inputRef.current.focus()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>New repository</title>
      </Head>
        {error && <span>{error}</span> }
        {success && <p>Successfully added</p> }
      <form onSubmit={handleSubmit}>
        <label htmlFor='inputRepo'>Add a new repository</label>

        <input placeholder="name"
        id='inputRepo'
        value={repo.name}
        ref={inputRef}
        onChange={e => setRepo({...repo, name: e.target.value})}
        />

        <input placeholder="url"
        value={repo.url}
        onChange={e => setRepo({...repo, url: e.target.value})}
        />
        <div>
          <Link href='/repositories'>
            <a>List</a>
          </Link>
          <button type='submit'>Add</button>
        </div>
      </form>
      
    </div>
  )
}
