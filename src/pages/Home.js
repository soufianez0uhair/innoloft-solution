import {FaGithub} from 'react-icons/fa'

export default function Home() {
    return (
        <section className="home">
            <h1>"Built With ❤️ for InnoLoft"</h1>
            <p><i>By Soufiane Zouhair </i><a href="https://github.com/soufianez0uhair" rel="noreferrer" target="_blank"><FaGithub className="icon--github" /></a></p>
        </section>
    )
}