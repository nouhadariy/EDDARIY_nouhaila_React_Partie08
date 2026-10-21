import { useState } from 'react'
import CareScale from './CareScale'
import '../styles/PlantItem.css'

function PlantItem({ id, cover, name, water, light, price, isBestSale, onAdd }) {
  const [added, setAdded] = useState(false)

  function handleAdd() {
    onAdd()
    setAdded(true)
    setTimeout(() => setAdded(false), 900)
  }

  return (
    <li key={id} className='lmj-plant-item'>
      <div className='lmj-cover-wrap'>
        <img className='lmj-plant-item-cover' src={cover} alt={`${name} cover`} />
        {isBestSale && <span className='lmj-best-sale'>🔥 Top vente</span>}
      </div>
      {name}
      <div>
        <CareScale careType='water' scaleValue={water} />
        <CareScale careType='light' scaleValue={light} />
      </div>
      <div className='lmj-buy-row'>
        <span className='lmj-price'>{price} DH</span>
        <button
          className={added ? 'lmj-add-btn lmj-added' : 'lmj-add-btn'}
          onClick={handleAdd}
        >
          {added ? 'Ajouté ✓' : 'Ajouter au panier'}
        </button>
      </div>
    </li>
  )
}

export default PlantItem
