import React,{useState} from 'react'
import { v4 as uuid} from 'uuid'

const Gallery = ()=> {

    const [proj, setProj] = useState()
    const [modal, setModal] = useState(false)
    

    const [newImage, setNewImage] = useState('')
    const [descr, setDscrp] = useState('')
  
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

    const handleEdit = (clicked)=> {
        //console.log(clicked)
        //setNewImage(clicked.img)
        //setDscrp(clicked.descr)
        
        const updArray = content.map( itm => {
            if(itm.id === clicked.id) {
                return {...itm, 
                    img: 'tst'  
                }
            }
            return itm
    })
        console.log(updArray)
    }

    const handleDelete = (clicked)=> {
        const filterArray = content.filter(itm => itm.id !== clicked)
        console.log(filterArray)
        setContent(filterArray)
    }

    console.log(content)

    return(
        <div className="app">
        <form onSubmit={handleSubmit}>
          <input placeholder="Type..."onChange={(e)=>setNewImage(e.target.value)}value={newImage}></input>
          <textarea onChange={(e)=> setDscrp(e.target.value)}value={descr}></textarea>
          <button>Add Image</button>
        </form>
        
    
            {/* mapping over our 'db' here */}
            {content.map(itm=> (
            <div className="card"key={itm.id}>
              <span className="delete__itm"onClick={()=> handleDelete(itm.id)}>X</span>  
              <p><img src={itm.img} alt="#" onClick={()=> {
                setProj(itm.img)
                setModal(prev => !prev)}}/></p>
              <p>{itm.descr} <span className="edit__itm"onClick={()=> handleEdit(itm)}>...</span></p>
            </div>
          ))}
          <div className={modal===false ? 'modal' : 'modal__active'}  onClick={()=> setModal(false)}>
            <p><img src={proj} alt={proj} className="modal__img" /></p></div>
        </div>
    )
}

export default Gallery