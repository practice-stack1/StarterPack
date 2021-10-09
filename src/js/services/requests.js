async function postData(api, formData){
  let response = await fetch(`${api}`, {
    method: 'POST',
    body: formData
  });
  return await response.text();
}

const getResource = async (url) => {
  let res = await fetch(url);

  if(!res.ok){
    throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

export {postData, getResource};
