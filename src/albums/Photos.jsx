import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Photos() {
    const [photos, setPhotos] = useState([])
    const { albumId } = useParams()

    const getRandomTime = () => {
        const randomDate = new Date ()
        randomDate.setHours(Math.floor(Math.random() * 24));
      randomDate.setMinutes(Math.floor(Math.random() * 60));
        return randomDate
      }
    

    useEffect(() => {
        const fetchPhotos = async () => {
          try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
            const data = await response.json();
            setPhotos(data);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
    
        fetchPhotos();
      }, [albumId]);
  return (
    <>
        <h1 className='font-bold text-3xl inline'> Photos </h1>
       <div className='flex flex-wrap'>
          {photos.map((photo) => (
            <div key={photo.id} className='bg-cyan-100 rounded-lg  border-black text-left
             m-6 p-4 shadow-lg font-medium w-[250px] '> 
              <div ><img src={`${photo.url}`} alt="Url" className='w-52 h-36' /></div>
              <br />
              <hr />
               <div >Album Id : {photo.albumId}</div>
              <div >Id : {photo.id} </div>
              <h3 >Title : {photo.title}</h3>
              <p className='font-normal'>Time : {getRandomTime().toLocaleTimeString([],
                { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>
             ))}
             </div>
    </>
  )
}

export default Photos
