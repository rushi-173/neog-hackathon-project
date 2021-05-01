import { useEffect, useState } from "react";
import "./Home.css";

export function Home({chatrooms}) {


  return (
    <div className="Home">
      <h1>Home</h1>
      {chatrooms && chatrooms.map((chatroom)=>{
        return(
          <div>
            <p>{chatroom.title}</p>
            <p>{chatroom.}</p>
          </div>
        )
      })}
    </div>
  );
}
