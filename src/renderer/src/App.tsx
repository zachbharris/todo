import { useState } from 'react'
import { Reorder, stagger, useAnimate } from 'framer-motion'
import { ListBulletIcon } from '@heroicons/react/20/solid'

type Item = {
  id: number
  text: string
  checked: boolean
}

function App(): JSX.Element {
  const [items, setItems] = useState<Item[]>([{ id: 1, text: 'Item 1', checked: false }])
  const [ref, animate] = useAnimate()

  const handleChange = (id: number): void => {
    const newItems = items.map((item) => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked
    }))

    setItems(newItems)
  }

  return (
    <div className="container">
      <div className="card">
        <p className="header">
          <ListBulletIcon className="icon" />
          Checklist
        </p>

        <Reorder.Group axis="y" values={items} onReorder={setItems} ref={ref} className="group">
          {items.map((item) => (
            <Reorder.Item key={item.id} value={item.id}>
              <label className={`item ${item.checked && 'item-checked'}`}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                  onChange={() => handleChange(item.id)}
                  className="checkbox"
                />
                {item.text}
              </label>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  )
}

export default App
