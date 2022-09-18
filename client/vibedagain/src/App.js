import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  const [artistName, setArtistName] = useState("")
  const [favSong, setFavSong] = useState("")
  const [userNote, setUserNote] = useState("")
  const [favImage, setFavImage] = useState("")

  const [artistList, setArtistList] = useState([])

  const [newartistName, setNewArtistName] = useState('')
  const [newfavSong, setNewFavSong] = useState('')
  const [newuserNote, setNewUserNote] = useState('')
  const [newfavImage, setNewFavImage] = useState('')

  const code = new URLSearchParams(window.location.search).get('code')

  useEffect(() => {
    axios.get('http://localhost:3001/app/read').then((res => {
      setArtistList(res.data)
    }))
  })

  const addToList = () => {
    axios.post('http://localhost:3001/app/addartist', {artistName: artistName, 
    favSong: favSong, 
    userNote: userNote, 
    favImage: favImage})
  }

  const updateArtist = (id) => (
    axios.put('http://localhost:3001/app/update', {
      id: id,
      newartistName: newartistName, 
      newfavSong: newfavSong, 
      newuserNote: newuserNote, 
      newfavImage: newfavImage

    })
  )

  const deleteArtist = (id) => {
    axios.delete(`http://localhost:3001/app/delete/${id}`)
  }


  return (
    <div className="App">
      <h1>Who's your Favorite Artist?</h1>
      { code ? <Dashboard code={code} / > : <Login/>}
      <div className="maincontainer">
      
      <div className='userinputs'>
        <h1>Enter Your Here</h1>
        <label>Artist Name</label>
        <input type="text" onChange={(event) => {
      setArtistName(event.target.value)
     }}/>
     <label>Favorite Song</label>
      <input type="text" onChange={(event) => {
      setFavSong(event.target.value)
     }}/>
    
     <label>Link to image</label>
      <input type="text" onChange={(event) => {
      setFavImage(event.target.value)
     }}/>
 <label>A Note on them</label>
      <input type="text" onChange={(event) => {
      setUserNote(event.target.value)
     }}/>
     
<button onClick={addToList}>Add To List</button>
      </div>
      <div className='displaydata'>
      {artistList.map((val, key) => {
        return <div key = {key}>
          <div className='dbData'> 
          <img className='artistImg'src={val.favImage}/>
          <label className='dDataLabeldb'>Name</label><h2>{val.artistName}</h2>
          <label className='dDataLabeldb'>Favorite Song</label><h2>{val.favSong}</h2>
          <label className='dDataLabeldb'>Comment</label><h2>{val.userNote}</h2>
          </div>
          
          <label className='dDataLabaledit'>Link to image</label>
      <input type="text" className='editInput' onChange={(event) => {
      setNewFavImage(event.target.value)
     }}/>
          <label className='dDataLabaledit'>Artist Name</label>
        <input className='editInput'type="text" onChange={(event) => {
      setNewArtistName(event.target.value)
     }}/>
     <label className='dDataLabaledit'>Favorite Song</label>
      <input className='editInput' type="text" onChange={(event) => {
      setNewFavSong(event.target.value)
     }}/>
     <label className='dDataLabaledit'>A Note on them</label>
      <input className='editInputcomment' type="text" onChange={(event) => {
      setNewUserNote(event.target.value)
     }}/>
     
          
          <button className = 'updateButton' onClick={() => updateArtist(val._id)}>Update Artist</button>

          <button className = 'deleteButton' onClick={() => deleteArtist(val._id)}>Delete</button>
          </div>

      })}

      </div>
      <div className='spotifyData'></div>

    </div>
    </div>
  );
}

export default App;
