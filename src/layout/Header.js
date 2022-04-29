
import {BiMenu} from 'react-icons/bi'

export default function Header() {
    function showNav() {
        document.querySelector('.navbar').classList.toggle('show')
    }
    return (
        <header>
            <BiMenu onClick={showNav} className="icon--menu" />
            <img src="https://img.innoloft.com/logo.svg" alt="innoloft logo" className="logo" />
        </header>
    )
}