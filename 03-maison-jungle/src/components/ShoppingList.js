import { useState } from 'react'
import { plantList } from '../datas/plantList'
import PlantItem from './PlantItem'
import '../styles/ShoppingList.css'

function ShoppingList() {
  const [activeCat, setActiveCat] = useState('toutes')
  const [cart, setCart] = useState([])

  const categories = plantList.reduce(
    (acc, plant) =>
      acc.includes(plant.category) ? acc : acc.concat(plant.category),
    []
  )

  const visiblePlants =
    activeCat === 'toutes'
      ? plantList
      : plantList.filter((plant) => plant.category === activeCat)

  function addToCart(plant) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === plant.id)
      if (found) {
        return prev.map((item) =>
          item.id === plant.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { id: plant.id, name: plant.name, price: plant.price, qty: 1 }]
    })
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const count = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className='lmj-shopping-list'>
      <div className='lmj-main'>
        <ul className='lmj-categories'>
          <li>
            <button
              className={activeCat === 'toutes' ? 'lmj-cat-btn active' : 'lmj-cat-btn'}
              onClick={() => setActiveCat('toutes')}
            >
              Toutes ({plantList.length})
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={activeCat === cat ? 'lmj-cat-btn active' : 'lmj-cat-btn'}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        <ul className='lmj-plant-list'>
          {visiblePlants.map(({ id, cover, name, water, light, price, isBestSale }) => (
            <PlantItem
              key={id}
              id={id}
              cover={cover}
              name={name}
              water={water}
              light={light}
              price={price}
              isBestSale={isBestSale}
              onAdd={() => addToCart({ id, name, price })}
            />
          ))}
        </ul>
      </div>

      <aside className='lmj-cart'>
        <h2 className='lmj-cart-title'>
          Mon panier <span className='lmj-cart-count'>{count}</span>
        </h2>

        {cart.length === 0 ? (
          <p className='lmj-cart-empty'>Ton panier est vide. Choisis une plante !</p>
        ) : (
          <>
            <ul className='lmj-cart-list'>
              {cart.map((item) => (
                <li key={item.id} className='lmj-cart-line'>
                  <span className='lmj-cart-name'>{item.name}</span>
                  <span className='lmj-qty'>
                    <button onClick={() => changeQty(item.id, -1)}>−</button>
                    {item.qty}
                    <button onClick={() => changeQty(item.id, 1)}>+</button>
                  </span>
                  <span className='lmj-line-total'>{item.price * item.qty} DH</span>
                </li>
              ))}
            </ul>
            <p className='lmj-total'>
              Total : <strong>{total} DH</strong>
            </p>
            <button className='lmj-clear-btn' onClick={() => setCart([])}>
              Vider le panier
            </button>
          </>
        )}
      </aside>
    </div>
  )
}

export default ShoppingList
