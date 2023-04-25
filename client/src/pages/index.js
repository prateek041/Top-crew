// This is the landing page.
import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <div className=" nav-section flex flex-col md:flex-row">
      <div className="bg-gray-300 md:bg-white w-full md:w-64 flex-shrink-0 mr-10">
        < Navbar />
        <div>This is profile</div>
      </div>
      <div className="flex-1">This is a test</div>
    </div>
  )
}
