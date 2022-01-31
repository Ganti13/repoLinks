import { useEffect, useState, useCallback} from "react"
import cookies from 'js-cookies'

import { CardRepository } from '../components/CardRepository'
import styles from '../styles/Repositories.module.css'

import { useRouter } from 'next/router'
import Head  from 'next/head'


export default function Repos({repositories}){
    const router = useRouter()

    const [repos, setRepos] = useState([{}])
    const [loading, setLoading] = useState(true)
    
    const deleteRepository = (e, id )=> {
        e.target.parentNode.classList.add(styles.deleted)
        console.log(e.target.parentNode)
        setTimeout(() => {
            const newRepositoriesList = repos.filter(repository => repository.id !== id)
            cookies.setItem('repositories',JSON.stringify(newRepositoriesList), { secure: true})
            setRepos(newRepositoriesList)

            e.target.parentNode.classList.remove(styles.deleted)
        },500)
        
    }


    useEffect(() => {
        setRepos(repositories)
        setLoading(false)
    },[])

    if(loading) return <div className={styles.loading}>Loading...</div>

    return (
        <div className={styles.container}>
            <Head><title>Repositories</title></Head>
            <div className={styles.back} onClick={() => router.push('/')}></div>
            {repos.length < 1 && <span className={styles.no__content}>No repositories added</span>}
            {repos.map((repository ,index) => (
                <div key={index}>
                    <CardRepository repository={repository } deleteRepository={deleteRepository}/>
                </div>
            ))}
        </div>
    )
}

export const getServerSideProps = ({req}) => {
    const repositories = req.cookies.repositories || []
    return {
        props:{
            repositories: JSON.parse(repositories)
        }
    }
}