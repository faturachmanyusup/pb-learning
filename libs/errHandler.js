export default function errHandler(res, err) {
  console.log(err.message, "<<<< ERROR")

  if (err.message === "auth failed") {
    res.status(400).json({
      name: "Bad request",
      message: "Email atau password salah"
    })
  }
  
  else if (err.message === "invalid method") {
    res.status(400).json({
      name: "Bad request",
      message: "HTTP method tidak valid. Hanya menerima method " + err.onlyAccepted
    })
  }

  else if (err.message === "unauthenticated") {
    res.status(401).json({
      name: "Unauthenticated",
      message: "Anda harus login terlebih dahulu"
    })
  }
 
  else if (err.message.includes("Unique constraint failed on the fields: (`email`)")) {
    res.status(400).json({
      name: "Bad request",
      message: "Email sudah terdaftar"
    })
  }

  else if (err.message === "empty class code") {
    res.status(400).json({
      name: "Bad request",
      message: "Code kelas tidak boleh kosong"
    })
  }

  else if (err.message === "class not found") {
    res.status(404).json({
      name: "Not Found",
      message: "Kelas tidak ditemukan"
    })
  }

  else if (err.message === "already joined before") {
    res.status(400).json({
      name: "Bad request",
      message: "Sudah pernah bergabung sebelumnya"
    })
  }

  else if (err.message === "restrict user join own class") {
    res.status(400).json({
      name: "Bad request",
      message: "Guru tidak dapat bergabung sebagai murid"
    })
  }

  else {
    res.status(500).json({
      code: 500,
      name: "Internal server error",
      message: "Internal server error"
    })
  }
}