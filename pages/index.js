import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router"
import ButtonPrimary from "components/Button/Primary"
import { GET } from "libs/request"
import Header from "components/Header/Landing"
import config from "config/config"

const Home = ({ overview = [] }) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>PB-Learning</title>
        <meta property="og:title" content="PB-Learning" />
        <meta property="og:description" content="Belajar kapanpun dan di manapun dengan PB Learning" />
        <meta property="og:url" content="https://pb-learning.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <div className="max-w-screen-xl mt-20 px-10 xl:px-16 mx-auto">
        <div className="grid grid-flow-row grid-rows-2 pt-6 md:grid-rows-1 md:grid-flow-col md:grid-cols-2">
          <div className=" flex flex-col justify-center items-start row-start-2 md:row-start-1 mn:-mt-8">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-medium text-black-600 leading-normal">
              Belajar kapanpun dan di manapun dengan <strong>PB-Learning</strong>.
            </h1>
            <br />
            <p className="text-black-500 mt-2 mb-6 mn:mb-8">
              PB-Learning hadir untuk membantu mereka yang terkendala jarak
              dalam kegiatan belajar mengajar.
            </p>
            <ButtonPrimary onClick={() => router.push('/login')}>Mulai</ButtonPrimary>
          </div>
          <div className="w-full mn:h-8">
            <Image
              src="/assets/e-learning-illustration.jpg"
              priority
              alt="illustrasi"
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
              rounded-lg w-full grid grid-flow-row grid-cols-1
              py-9 divide-y-2 divide-gray-100 bg-white-500 z-10
              md:grid-flow-row md:grid-cols-3 md:divide-y-0 md:divide-x-0 
            "
          >
            {overview.map((count, index) => (
              <div
                key={index}
                className="
                  flex items-center py-4 w-8/12 px-4 mx-auto mn:px-0
                  md:justify-center md:py-6 md:w-auto md:mx-0
                "
              >
                <div className="flex mx-auto w-40 md:w-auto mn:w-full">
                  <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                    <Image
                      width={30}
                      height={30}
                      alt={count.name}
                      src={count.icon}
                      className="h-6 w-6"
                    />
                  </div>
                  <div className="flex flex-col mn:flex-row mn:items-center mn:justify-between">
                    <p className="text-xl text-black-600 font-bold mn:text-lg mn:mr-3">
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

export async function getServerSideProps() {
  const baseUrl = config.url.base

  const overview = await GET(baseUrl + "/api/general/count")

  return {
    props: {
      overview: overview.data,
    }
  }
}

export default Home;