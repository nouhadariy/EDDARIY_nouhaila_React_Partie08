import Banner from './Banner'
import ShoppingList from './ShoppingList'
import logo from '../assets/logo.png'
import '../styles/Banner.css'

function App() {
  return (
    <div>
      <Banner>
        <img src={logo} alt='La maison jungle' className='lmj-logo' />
        <div>
          <h1 className='lmj-title'>La maison jungle</h1>
          <p className='lmj-signature'>Atelier N°1 — réalisé par Nouhaila Eddariy</p>
        </div>
      </Banner>
      <ShoppingList />
    </div>
  )
}

export default App
