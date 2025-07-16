import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            student <span> job</span> tracking
          </h1>
          <p>
            Stay organized and in control of your job hunt with this simple and
            powerful job tracking tool. Easily log every job application,
            monitor your progress across stages like Applied, Interview, Offer,
            and Rejected, and set reminders for follow-ups. Whether you're
            applying to one job or a hundred, this app helps you stay focused
            and never miss an opportunity.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
