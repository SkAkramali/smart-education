import "./css/welcompage.css"
const GetStartedBtn = () => {
  return (
    <button className="getStarted">Get Started</button>
  )
}
const HeroSection = () => {
  return(
    <div className="hero">
      <div>
        <p>Find Your Perfect</p>
        <p>Carrer Path</p>
      </div>
      <GetStartedBtn></GetStartedBtn>
    </div>
  )
}
const Welcompage = () => {
  return (
    <div>
     <HeroSection></HeroSection>
    </div>
  )
}

export default Welcompage