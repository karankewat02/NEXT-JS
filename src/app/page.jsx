"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {

  const [content, setContent] = useState(["Hi how can I help you?"])
  const [message,setMessage] = useState("");

  const handelSend =async()=>{
    if(!message){
      return
    }
    const tempMsg = message
    setMessage("");
    setContent([...content, tempMsg]);
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ tempMsg }),
    });

    const data = await response.json();
    const { output } = data;
    setContent([...content, tempMsg ,output]);
  }

  return (
    <div>
      <div className={styles.content}>
        {
          content?.map((item,index)=>{
            return(
              <p key={index}>{item}</p>
            )
          })
        }
      </div>
      <div className={styles.inpurContainer}>
        <input type="text" onChange={(e)=>setMessage(e.target.value)} value={message} placeholder="message" />
        <button onClick={handelSend}>
          send
        </button>
      </div>
    </div>
  );
}
