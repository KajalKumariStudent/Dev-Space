import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import EditAddAlbumModal from '../components/controlButtons/EditAddAlbumModal';
import DeleteAlbumOrPost from '../components/controlButtons/DeleteAlbumorPost';


function Albums() {

    const [albums, setAlbums] = useState([]);
    const [idToEdit,setIdToEdit] = useState(false); 
    const [idToDelete, setIdToDelete] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      const handleOpenEditModal = (postId) => {
        setSelectedAlbumId(postId);
        setIdToEdit(true);
      };
      const handleCloseEditModal = () => setIdToEdit(false);

      const handleAlbum = (editedAlbum) => {
        setAlbums((prevAlbums) =>prevAlbums.map((album) => album.id === editedAlbum.id ? editedAlbum: album) )
        handleCloseEditModal()
      }
      const handleOpenDeleteModal = (postId) =>{
        setIsDeleteModalOpen(true);
        setIdToDelete(postId)
       }

      const handleOpenAddModal = () => setShowAdd(true);

      const handleCloseAddModal = () => setShowAdd(false);

      const handleAdd = (newAlbum) => {
        setAlbums((prevAlbums) =>[...prevAlbums, newAlbum])
        handleCloseAddModal()
    }

  return (
    <>
    <div className='text-right'><button onClick={handleOpenAddModal} 
    className='bg-cyan-200 rounded-md border-[2px] m-2 p-2 shadow-lg
      border-gray-500'>Add Album</button>
      <EditAddAlbumModal 
      handleOpenAddModal={handleOpenAddModal} handleAdd={handleAdd} showAdd={showAdd} />
      </div>
      <div className='flex flex-wrap '>
      <EditAddAlbumModal 
      albumId={selectedAlbumId} handleEdit={handleAlbum}  idToEdit={idToEdit} handleCloseEditModal={handleCloseEditModal}/>
          {albums.map((album) => (
           
            <div key={album.id} className='bg-cyan-100 rounded-lg border-[1px] border-black text-left
            m-6 p-4 shadow-lg font-medium w-[22rem]'>
               <div className='inline'>id : {album.id} </div>
             <div className='inline-flex justify-end '> 
             <button onClick={() => handleOpenEditModal(album.id)} className='mx-4' >✏️</button>
             <button onClick={() => handleOpenDeleteModal(album.id)} className='mx-4 m'> ❌</button>
            
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
          <DeleteAlbumOrPost isDeleteModalOpen={isDeleteModalOpen}
           setIsDeleteModalOpen={setIsDeleteModalOpen} 
           setAllPostsOrAlbumsData={setAlbums}
           idToDelete={idToDelete} setIdToDelete={setIdToDelete}/>
        </div>
    </>
  )
}

export default Albums
