export default function errHandler(res, err) {
  if (err.message === "auth failed") {
    res.status(400).json({
      code: 400,
      name: "Bad request",
      message: "Email atau password salah"
    })
  }
  
  else if (err.message === "invalid method") {
    res.status(400).json({
      code: 400,
      name: "Bad request",
      message: "HTTP method tidak valid. Hanya menerima method " + err.onlyAccepted
    })
  }

  else if (err.message.includes("Unique constraint failed on the fields: (`email`)")) {
    res.status(400).json({
      code: 400,
      name: "Bad request",
      message: "Email sudah terdaftar"
    })
  }
  
  else {
    res.status(500).json(err)
  }
}