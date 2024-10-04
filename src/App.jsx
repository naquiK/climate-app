import { useState, useEffect } from 'react'
import './App.css'
import srch from './assets/icons/search.svg'
import { useStateContext } from './Api/FetchApi'
import BgLayout from './Components/BgLayout'
import WeatherCard from './Components/WeatherCard'
import { MiniCard } from './Components/ImportFile'

function App() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false) // Step 1: Add loading state
  const { weather, thisLocation, values, place, setPlace } = useStateContext()

  const submitCity = () => {
    setLoading(true) // Step 2: Set loading to true
    setPlace(input)
    setInput('')
  }

  // Optional: Reset loading state when weather data changes
  useEffect(() => {
    if (weather) {
      setLoading(false) // Step 3: Reset loading state when data is fetched
    }
  }, [weather])
  if(loading){
    return(
      <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl text-center text-blue-800'>Weather App</h1>
        <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={srch} alt="search" className='w-[1.5rem] h-[1.5rem]' />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity()
              }
            }}
            type="text"
            placeholder='Search city'
            className='focus:outline-none w-full text-[#212121] text-lg'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BgLayout />
      <div><h1 className='text-center text-blue-800 text-3xl text-'>Loading..... Please Wait</h1></div>
      </div>
    )
  }

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
        <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={srch} alt="search" className='w-[1.5rem] h-[1.5rem]' />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity()
              }
            }}
            type="text"
            placeholder='Search city'
            className='focus:outline-none w-full text-[#212121] text-lg'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BgLayout />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        {loading ? ( // Step 4: Conditional rendering for loader
          <div className='loader'>Loading...</div> // You can replace this with any loader component
        ) : (
          <>
            <WeatherCard
              place={thisLocation}
              windspeed={weather.wspd}
              humidity={weather.humidity}
              temperature={weather.temp}
              heatIndex={weather.heatindex}
              iconString={weather.conditions}
              conditions={weather.conditions}
            />

            <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
              {values?.slice(1, 7).map(curr => (
                <MiniCard
                  key={curr.datetime}
                  time={curr.datetime}
                  temp={curr.temp}
                  iconString={curr.conditions}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App
