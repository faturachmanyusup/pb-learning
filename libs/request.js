const defaultHeader = {
  'Content-Type': 'application/json'
}

export const GET = (url = "", body = {}, header = {}) => {
  return fetch(url, {
    method: "GET",
    headers: {
      ...defaultHeader,
      ...header
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .catch(err => {
    throw err
  })
}

export const POST = (url = "", body = {}, header = {}) => {
  return fetch(url, {
    method: "POST",
    headers: {
      ...defaultHeader,
      ...header
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .catch(err => {
    throw err
  })
}