import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

function Albums() {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
          try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums`);
            const data = await response.json();
            setAlbums(data);
          } catch (error) {
            console.error('Error fetching albums:', error);
          }
        };
    
        fetchAlbums();
      }, []);

      const getRandomTime = () => {
        const randomDate = new Date ()
        randomDate.setHours(Math.floor(Math.random() * 24));
      randomDate.setMinutes(Math.floor(Math.random() * 60));
      randomDate.setDate(Math.floor(Math.random() * 30));
      randomDate.setMonth(Math.floor(Math.random()*12));
      randomDate.setFullYear(Math.floor(Math.random()*24+2000))
        return randomDate
      }

  return (
    <>
    <div className='text-right'><button className='bg-cyan-200 rounded-md border-[2px] m-2 p-2 shadow-lg
      border-gray-500'>Add Album</button></div>
      <div className='flex flex-wrap '>
      
          {albums.map((album) => (
           
            <div key={album.id} className='bg-cyan-100 rounded-lg border-[1px] border-black text-left
            m-6 p-4 shadow-lg font-medium w-[22rem]'>
               <div className='inline'>id : {album.id} </div>
             <div className='inline-flex justify-end '> <button className='mx-4' >✏️</button>
             <button className='mx-4 m'> ❌</button>
             </div>
             <div>
             <Link to={{
              pathname : `/albums/${album.id}/photos`
             }}>
              <div className='inline'>UserId : {album.userId}</div>
              <h3>Title : {album.title}</h3>
             <div>Date :  <span className='font-normal'>{getRandomTime().toLocaleDateString()}</span></div>
              <div>Time : <span className='font-normal'>{getRandomTime().toLocaleTimeString([],
                { hour: '2-digit', minute: '2-digit', hour12: true })}</span></div>
            </Link>
            </div>
            </div>
            
          ))}
        </div>
    </>
  )
}

export default Albums
