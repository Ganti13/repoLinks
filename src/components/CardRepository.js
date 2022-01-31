import Link from 'next/link'
import styles from '../styles/Repository.module.css'

export function CardRepository({repository, deleteRepository}){

    return(
        <div className={styles.container}>
            <div className={styles.close} onClick={((e) => deleteRepository(e, repository.id))}/>
            <Link href={repository.url}>
                <a target="_blank">
                    <h1>{repository.name}</h1>
                </a>
            </Link>
        </div>
    )
}