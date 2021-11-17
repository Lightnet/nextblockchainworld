/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://stackoverflow.com/questions/63092367/react-usestate-array-not-updating
// https://newbedev.com/removing-object-from-array-using-hooks-usestate

import { useEffect, useState } from "react";
import useFetch from "../hook/usefectch";

export default function Wallet(){
  const [wallets, setWallets] = useState([]);

  useEffect(()=>{
    getWallet();
  },[])


  useEffect(()=>{
    console.log(wallets.length);
  },[wallets])

  async function getWallet(){
    let response = await fetch('api/wallet');
    if(!response.ok){
      console.log("ERROR FETCH SERVER!");
      return;
    }
    let data = await response.json();
    console.log(data);
    if(data.api){
      if(data.api == 'WALLETS'){
        setWallets(data.wallets);
      }
    }
  }

  async function createWallet(){

    let data = await useFetch('api/wallet',{
      method:'POST'//,
      //body:JSON.stringify({api:'CREATE'})
    });

    console.log(data);
    if(data.api){
      if(data.api == 'CREATE'){
        setWallets([...wallets, data.wallet]);
      }
    }
  }

  async function deleteWallet(id){
    let data = await useFetch('api/wallet',{
      method:'DELETE',
      body:JSON.stringify({id:id})
    });

    //console.log(data);
    if(data.api){
      if(data.api == 'DELETE'){
        //console.log(data);
        setWallets(wallets.filter(item=>item.id !== data.id ));
      }
    }
  }

  return (<>
    <div>
      <button onClick={createWallet}>Create Wallet</button>
      <table>
        <thead>
          <tr>
            <td>ID:</td>
          </tr>
          <tr>
             <td>HASH:</td>
          </tr>
        </thead>
          {wallets.map(item=>{
            return(
              <tbody key={item.id}>
                <tr>
                  <td>ID: {item.id} <button onClick={()=>deleteWallet(item.id)}> Delete </button></td>
                </tr>
                <tr>
                  <td>HASH: </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  </>);
}
/*
{JSON.stringify(item.hash))
*/
