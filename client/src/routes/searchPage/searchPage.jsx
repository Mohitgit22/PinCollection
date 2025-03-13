import { useSearchParams } from 'react-router'
import React from 'react'
import Gallery from '../../components/gallery/Gallery'
import './searchPage.css'

const SearchPage = () => {
   
  let [searchParams] = useSearchParams()
   
  const search = searchParams.get("search")
  return (
    <Gallery search = {search}/>
  )
}

export default SearchPage