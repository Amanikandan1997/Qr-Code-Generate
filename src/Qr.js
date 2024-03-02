import React, { useState } from 'react'
import  QRCode  from 'qrcode'
import "./Qr.css"
import qr from "./assets/qr.png"
export default function Qr() {
  const[img,setImg]=useState("")
  const[loading,Setloading]=useState(false);
  const[qrdata,setQrdata]=useState("");
  const[qrsize,setQrsize]=useState('150')
function generateQr  (){
   Setloading(true);
   try{
    const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}×${qrsize}&data=${encodeURIComponent(qrdata)}`;
    setImg(url);
   }catch(error){
    console.error('error grnerating Qr code,', error);
   }finally{
    Setloading(false);
   }
  }
 function DownloadQr (){
    fetch(img).then((response)=>response.blob().then((blob)=>{
      const link=document.createElement('a');
      link.href=URL.createObjectURL(blob);
     link.download="qrcode.png";
     document.body.appendChild(link); // append to the DOM so it can be clicked
     link.click( );// simulate a click
     document.body.removeChild(link)// remove from the DOM after clicking
    })
    .catch((error)=>{
      alert("Error downloading image!");
    })
    
    )
  }
  return (
  <>
  
  <div className='Qrcode'>
    <div className='BOX'>
    <h1 className='tittle'>QR Code Generator</h1>
    {loading && <p>Please Wait....</p>}
   {img && <img src={img}/>}
  <label htmlFor='dataInput' className='Input-label'>
  Enter Ur URL or  Text:
  </label>


  <input type='text'className='input-type' id='dataInput' placeholder="ex: https://www.google.com or Text" value={qrdata} onChange={(e)=>setQrdata (e.target.value)}/>


  {/* <label  htmlFor='sizeSelect'  className='Input-label'>Size of Qr code: ex: 150</label>


  <input type='text' id="sizeInput" value={qrsize} onChange={(e)=>setQrsize (e.target.value)} /><br/> */}


  <button className="btn" disabled={loading} onClick={generateQr} >Generate QR Code</button><br/>

  <button className="button" onClick={DownloadQr}>Download QR Code</button>
  <p>Designed By <a href='https://amanikandan1997.github.io/ReactJs_Portfolio/'>Manikandan UKI </a></p>
  </div>
  </div>
  
  </>
  )
}
