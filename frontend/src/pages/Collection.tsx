/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { GlobalContext, ProductType } from "../context/AppContext"
import { assets } from "../assets/assets"
import PageTitle from "../components/PageTitle"
import ProductCard from "../components/ProductCard"



// filter in array base on condition
export function filterArray<T>(array: T[], condition: (item: T) => boolean): T[] {
  return array.filter(condition)
}


function Collection() {
  const [showFilter, setShowFilter] = useState<boolean>(true)
  const [filterProducts, setFilterProducts] = useState<ProductType[]>([])
  const [category, setCategory] = useState<string[]>([])
  const [subCategory, setSubCategory] = useState<string[]>([])
  const [select, setSelect] = useState<string>('')
  const { productArray, searchTerm, showSearch } = useContext(GlobalContext)

  const toggleCategory = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    if (category.includes(value)) {
      setCategory(prevC => prevC.filter(item => item !== value))
    } else {
      setCategory(prevC => [...prevC, value])
    }
  }

  const toggleSubCategory = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    if (subCategory.includes(value)) {
      setSubCategory(prevS => prevS.filter(item => item !== value))
    } else {
      setSubCategory(prevS => [...prevS, value])
    }
  }

  const sortProducts = () => {
    const sortList = filterProducts.slice()

    switch (select) {
      case 'low-high':
        setFilterProducts(sortList.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilterProducts(sortList.sort((a, b) => b.price - a.price))
        break
      default:
        setFilterProducts(sortList)
        break
    }

  }

  const handleSelected = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value
    setSelect(value)
  }
  useEffect(() => {
    sortProducts()
  }, [select, productArray])

  // filtering due to category or subcategory
  useEffect(() => {
    let filterProducts: ProductType[] = productArray

    if (category.length > 0) {
      filterProducts = filterArray(filterProducts, product => category.includes(product.category))
    }

    if (subCategory.length > 0) {
      filterProducts = filterArray(filterProducts, product => subCategory.includes(product.subCategory))
    }

    if (showSearch && searchTerm) {
      filterProducts = filterArray(filterProducts, product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilterProducts(filterProducts)

  }, [category, subCategory, searchTerm, showSearch, productArray])






  return (
    <main className="flex flex-col sm:flex-row gap-2 pt-10 ">

      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="uppercase text-xl flex items-center cursor-pointer gap-2">
          Filters
          <img src={assets.dropdown_icon} alt="dropdown icon" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="uppercase mb-3 text-sm font-medium">categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input type="checkbox" onChange={toggleCategory} className="w-3" value={'Men'} />
              <span>Men</span>
            </label>
            <label className="flex gap-2">
              <input type="checkbox" onChange={toggleCategory} className="w-3" value={'Women'} />
              <span>Women</span>
            </label>
            <label className="flex gap-2">
              <input type="checkbox" onChange={toggleCategory} className="w-3" value={'Kids'} />
              <span>Kids</span>
            </label>
          </div>
        </div>
        {/* sub category */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="uppercase mb-3 text-sm font-medium">type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input type="checkbox" onChange={toggleSubCategory} className="w-3" value={'Topwear'} />
              <span>Top Wear</span>
            </label>
            <label className="flex gap-2">
              <input type="checkbox" onChange={toggleSubCategory} className="w-3" value={'Bottomwear'} />
              <span>Bottom Wear</span>
            </label>
            <label className="flex gap-2">
              <input type="checkbox" onChange={toggleSubCategory} className="w-3" value={'Winterwear'} />
              <span>Winter Wear</span>
            </label>
          </div>
        </div>
      </div>

      {/*  right side part*/}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <PageTitle text1="All" text2="Collections" />
          <select className="border-2 border-gray-300 text-sm px-2" onChange={handleSelected}>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* all products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length < 1 && <h1 className="text-center text-gray-400 text-2xl py-10">No Items Found</h1>}
          {
            filterProducts.map(product => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))
          }
        </div>

      </div>

    </main>
  )

}

export default Collection