import Link from 'next/link'
import './header.css'

const Header = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link href="#about">About</Link></li>
            <li><Link href="#products">Products</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header