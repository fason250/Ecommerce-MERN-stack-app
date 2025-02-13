import { FormEvent, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { useApplication } from '../context/adminContext'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'

function Add() {
  const [description, setDescription] = useState<string>('')
  const [subCategory, setSubCategory] = useState<string>('Men')
  const [bestSeller, setBestSeller] = useState<boolean>(false)
  const [category, setCategory] = useState<string>('Men')
  const [image1, setImage1] = useState<File | null>(null)
  const [image2, setImage2] = useState<File | null>(null)
  const [image3, setImage3] = useState<File | null>(null)
  const [image4, setImage4] = useState<File | null>(null)
  const [sizes, setSizes] = useState<string[]>([])
  const [price, setPrice] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSizes = (size: string) => {
    setSizes(prevSizes => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter(item => item !== size)
      }
      return [...prevSizes, size]
    })
  }
  const { token } = useApplication()

  const handleSubmit = async (event: FormEvent) => {
    try {
      setLoading(true)
      event.preventDefault()
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('price', price)
      formData.append('bestSeller', JSON.stringify(bestSeller))
      formData.append("sizes", JSON.stringify(sizes))
      if (image1) formData.append('image1', image1)
      if (image2) formData.append('image2', image2)
      if (image3) formData.append('image3', image3)
      if (image4) formData.append('image4', image4)

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/products/addProduct`, formData, {
        headers: {
          token: token
        }
      })
      if (data.success) {
        toast.success("Product added successfully")
        setName("")
        setDescription("")
        setPrice("")
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setBestSeller(false)
        setSizes([])
      } else {
        toast.error("failed to add product")
      }


    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }


  return loading ? <div className='w-full min-h-screen py-20 flex items-center justify-center text-4xl'><Loading /></div> : (
    <form onSubmit={handleSubmit} className='flex flex-col w-full gap-3 items-start'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <img className="w-23 h-24 object-cover" src={`${image1 ? URL.createObjectURL(image1) : assets.upload_area}`} alt="upload area " />
            <input
              accept='image/*'
              type="file" id='image1'
              className='hidden'
              onChange={(event) => setImage1(event.target.files ? event.target.files[0] : null)}
            />
          </label>
          <label htmlFor='image2'>
            <img className="w-23 h-24 object-cover" src={`${image2 ? URL.createObjectURL(image2) : assets.upload_area}`} alt="upload area " />
            <input
              type="file" id='image2'
              className='hidden'
              onChange={(event) => setImage2(event.target.files ? event.target.files[0] : null)}
            />
          </label>
          <label htmlFor='image3'>
            <img className="w-23 h-24 object-cover" src={`${image3 ? URL.createObjectURL(image3) : assets.upload_area}`} alt="upload area " />
            <input
              type="file" id='image3'
              className='hidden'
              onChange={(event) => setImage3(event.target.files ? event.target.files[0] : null)}
            />
          </label>
          <label htmlFor='image4'>
            <img className="w-23 h-24 object-cover" src={`${image4 ? URL.createObjectURL(image4) : assets.upload_area}`} alt="upload area " />
            <input
              type="file" id='image4'
              className='hidden'
              onChange={(event) => setImage4(event.target.files ? event.target.files[0] : null)}
            />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <label className='mb-2 block'>Product Name</label>
        <input
          className="w-full max-w-[500px] px-3 py-2 border-[1px] border-gray-300 rounded-sm" type="text"
          placeholder='product name' required
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div className='w-full'>
        <label className='mb-2 block'>Product Description</label>
        <textarea
          className='w-full max-w-[500px] px-3 py-2 border-[1px] border-gray-300 rounded-sm resize-none'
          required placeholder='description'
          rows={3}
          value={description}
          onChange={event => setDescription(event.target.value)}
        ></textarea>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={event => setCategory(event.target.value)} className='w-full px-3 py-2 border border-gray-400'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub Category</p>
          <select onChange={event => setSubCategory(event.target.value)} className='w-full px-3 py-2 border border-gray-400'>
            <option value="TopWear">TopWear</option>
            <option value="BottomWear">BottomWear</option>
            <option value="WinterWear">WinterWear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={event => setPrice(event.target.value)} className='w-full px-3 py-2 sm:w-[120px] border-gray-400 border rounded-sm' type="number" placeholder="25" min={0} />
        </div>
      </div>
      <div>
        <p className='mb-2'>product sizes</p>
        <div className='flex gap-3'>
          <div>
            <label onClick={() => handleSizes('S')} className={`${sizes.includes('S') ? 'bg-orange-400' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}> S</label>
          </div>
          <div>
            <label onClick={() => handleSizes('M')} className={`${sizes.includes('M') ? 'bg-orange-400' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</label>
          </div>
          <div>
            <label onClick={() => handleSizes('L')} className={`${sizes.includes('L') ? 'bg-orange-400' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</label>
          </div>
          <div>
            <label onClick={() => handleSizes('XL')} className={`${sizes.includes('XL') ? 'bg-orange-400' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}> XL</label>
          </div>
          <div>
            <label onClick={() => handleSizes('XXL')} className={`${sizes.includes('XXL') ? 'bg-orange-400' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}> XXL</label>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input type="checkbox" id="bestSeller" checked={bestSeller} onChange={event => setBestSeller(event.target.checked)} />
        <label htmlFor="bestSeller" className='cursor-pointer' >Add to BestSeller</label>
      </div>
      <button className='w-28 py-3 rounded-sm bg-black text-white mt-4 active:bg-slate-800'>Add Product</button>
    </form>
  )

}


export default Add