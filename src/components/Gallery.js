import React,{useState} from 'react'
import { v4 as uuid} from 'uuid'

const Gallery = ()=> {

    const [proj, setProj] = useState()
    const [modal, setModal] = useState(false)
    

    const [newImage, setNewImage] = useState('')
    console.log(newImage)
    const [descr, setDscrp] = useState('')
    const [edit, setEdit] = useState(false)
    const [id, setID] = useState('')
    
  
    const [content, setContent] = useState([
        {
          id: uuid(),
          img: "/img/01.jpg",
          descr: 'Some txt goes her'
        },
        {
          id: uuid(),
          img: '/img/02.jpg',
          descr: 'Some more txt goes her'
        },
        {
          id: uuid(),
          img: '/img/03.jpg',
          descr: 'Some more txt goes her'
        },
        {
          id: uuid(),  
          img: '/img/04.jpg',
          descr: 'Some more txt goes her'
        },
        {
          id: uuid(),
          img: '/img/05.jpg',
          descr: 'Some more txt goes her'
        },
        {
          id: uuid(),
          img: '/img/06.jpg',
          descr: 'Some more txt goes here for img6'
        },
        {
          id: uuid(),
          img: '/img/07.jpg',
          descr: 'Some more txt goes her'
        }
      ]) 

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(newImage && descr) {
        const db = [...content, {
          id: uuid(),  
          img: newImage,
          descr: descr}]

        console.log('our db', db)
        setContent(db)
        }
    }

    const handleEdit = ()=> {
        
        setEdit(true)
        console.log(newImage)
        
        const updArray = content.map( itm => {
            if(itm.id === id.id) {
                return {...itm, 
                    img: newImage,
                    descr:descr  
                }
            }
            return itm
    })
        setContent(updArray)
        setEdit(false)
        setNewImage('')
        setDscrp('')
    }

    const handleDelete = (clicked)=> {
        const filterArray = content.filter(itm => itm.id !== clicked)
        //console.log(filterArray)
        setContent(filterArray)
    }

    console.log(content)

    return(
        <div className="app">
            <form>
                <input placeholder="Type..."onChange={(e)=>setNewImage(e.target.value)}value={newImage}></input>
                <textarea onChange={(e)=> setDscrp(e.target.value)}value={descr}></textarea>
                
            </form>
            {edit===false ? <button onClick={handleSubmit}>Add Image</button> : <button onClick={()=>{
                handleEdit()
                }}>Edit project</button>}
        
    
            {/* mapping over our 'db' here */}
            {content.map(itm=> (
            <div className="card"key={itm.id}>
                <span className="delete__itm"onClick={()=> handleDelete(itm.id)}>X</span>  
                <p><img src={itm.img} alt="#" onClick={()=> {
                    setProj(itm.img)
                    setModal(prev => !prev)}}/></p>
                <p>{itm.descr} <span className="edit__itm"onClick={()=> {
                        setEdit(toggle => !toggle)
                        setNewImage(itm.img)
                        setDscrp(itm.descr)
                        setID(itm)
                        }}>...</span></p>
            </div>
          ))}
          
            <div className={modal===false ? 'modal' : 'modal__active'}  onClick={()=> setModal(false)}>
                <p><img src={proj} alt={proj} className="modal__img" /></p>
            </div>
        </div>
    )
}

export default Gallery