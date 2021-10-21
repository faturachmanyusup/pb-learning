import errHandler from "libs/errHandler";
import pg from "libs/pg";

export default async function count(req, res) {
  try {
    const userCount = await pg.user.count({})
    
    res.status(200).json([
      {
        name: "Pengguna",
        number: userCount,
        icon: "/assets/count-user.svg",
      },
      {
        name: "Lokasi",
        number: "20",
        icon: "/assets/count-location.svg",
      },
      {
        name: "Server",
        number: "5",
        icon: "/assets/count-server.svg",
      },
    ])
  } catch (err) {
    errHandler(res, err)
  }
}