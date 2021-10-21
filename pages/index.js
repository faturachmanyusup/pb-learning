import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router"
import ButtonPrimary from "components/Button/Primary"
import { GET } from "libs/request"
import Header from "components/Header/Landing"
import config from "config/config"

const Home = ({ overview = [] }) => {
  const router = useRouter()

  const handleStart = () => {
    router.push('/login')
  }

  return (
    <>
      <Head>
        <title>PB-Learning</title>
        <meta property="og:title" key="login" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <Header />
      <div className="max-w-screen-xl mt-20 px-10 xl:px-16 mx-auto">
        <div className="grid grid-flow-row grid-rows-2 pt-6 md:grid-rows-1 sm:grid-flow-col sm:grid-cols-2">
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-medium text-black-600 leading-normal">
              Belajar kapanpun dan di manapun dengan <strong>PB-Learning</strong>.
            </h1>
            <br />
            <p className="text-black-500 mt-2 mb-6">
              PB-Learning hadir untuk membantu mereka yang terkendala jarak
              dalam kegiatan belajar mengajar.
              {/* PB Learning adalah platform lengkap untuk kegiatan belajar mengajar Anda.
              Platform yang aman dan mudah digunakan.
              Membantu pengajar mengelola, mengukur, dan memperkaya pengalaman belajar. */}
            </p>
            <ButtonPrimary onClick={handleStart}>Mulai</ButtonPrimary>
          </div>
          <div className="w-full">
            <Image
              src="/assets/e-learning-illustration.jpg"
              alt="Illustrasi"
              quality={100}
              width={612}
              height={383}
              layout="responsive"
            />
          </div>
        </div>
        <div className="relative w-full flex lg:mt-10">
          <div
            className="
            rounded-lg w-full grid grid-flow-row grid-cols-1 py-9 divide-y-2 divide-gray-100 bg-white-500 z-10
            sm:grid-flow-row sm:grid-cols-3 sm:divide-y-0 sm:divide-x-2
          "
          >
            {overview.map((count, index) => (
              <div
                key={index}
                className="
                  flex items-center py-4 w-8/12 px-4 mx-auto 
                  sm:justify-center sm:py-6 sm:w-auto sm:mx-0
                "
              >
                <div className="flex mx-auto w-40 sm:w-auto">
                  <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                    <img src={count.icon} className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xl text-black-600 font-bold">
                      {count.number}
                    </p>
                    <p className="text-lg text-black-500">{count.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const env = process.env.NODE_ENV
  const baseUrl = config[env].url.base

  const overview = await GET(baseUrl + "/api/general/count")

  return {
    props: {
      overview: overview.data,
    }
  }
}

export default Home;