/*
  LICENSE: MIT
  Created by: Lightnet
*/

//need to check fail later
export async function useFetch(_url, _query){
  let url = _url;
  let query = _query || {};

  return new Promise(async (resolve, reject) => {
    let res = await fetch(url,query);
    let data = await res.json();
    resolve(data);
  });
}