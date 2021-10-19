const defaultHeader = {
  'Content-Type': 'application/json'
}

export const GET = (url = "", header = {}) => {
  let status = 500
  
  return fetch(url, {
    method: "GET",
    headers: {
      ...defaultHeader,
      ...header
    }
  })
  .then(res => {
    status = res.status
    return res.json()
  })
  .then(res => {
    return {
      status: status,
      data: res
    }
  })
  .catch(err => {
    throw err
  })
}

export const POST = (url = "", body = {}, header = {}) => {
  let status = 500
  
  return fetch(url, {
    method: "POST",
    headers: {
      ...defaultHeader,
      ...header
    },
    body: JSON.stringify(body)
  })
  .then(res => {
    status = res.status
    return res.json()
  })
  .then(res => {
    return {
      status: status,
      data: res
    }
  })
  .catch(err => {
    throw err
  })
}