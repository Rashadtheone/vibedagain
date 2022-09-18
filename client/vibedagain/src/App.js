import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';


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
     <label>A Note on them</label>
      <input type="text" onChange={(event) => {
      setUserNote(event.target.value)
     }}/>
     <label>Link to image</label>
      <input type="text" onChange={(event) => {
      setFavImage(event.target.value)
     }}/>

     
<button onClick={addToList}>Add To List</button>
      </div>
      <div className='displaydata'>
      {artistList.map((val, key) => {
        return <div key = {key}>
          <h2>{val.artistName}</h2>
          <h2>{val.favSong}</h2>
          <h2>{val.userNote}</h2>
          <img src={val.favImage}/>
          
          <label>Artist Name</label>
        <input type="text" onChange={(event) => {
      setNewArtistName(event.target.value)
     }}/>
     <label>Favorite Song</label>
      <input type="text" onChange={(event) => {
      setNewFavSong(event.target.value)
     }}/>
     <label>A Note on them</label>
      <input type="text" onChange={(event) => {
      setNewUserNote(event.target.value)
     }}/>
     <label>Link to image</label>
      <input type="text" onChange={(event) => {
      setNewFavImage(event.target.value)
     }}/>
          
          <button onClick={() => updateArtist(val._id)}>Update Artist</button>

          <button onClick={() => deleteArtist(val._id)}>Delete</button>
          </div>

      })}

      </div>
    </div>
    </div>
  );
}

export default App;
