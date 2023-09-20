import { logo } from "../assets";

// The Hero component displays a header with a logo and a button for GitHub
const Hero = () => {
  // Function to open the GitHub profile in a new tab
  const openGitHub = () => {
    const newTab = window.open("https://github.com/markhadi", "_blank");
    // Prevent potential attacks through window.opener
    if (newTab) {
      newTab.opener = null;
    }
  };

  // Render the component

  return (
    <header className="w-full flex flex-col justify-center items-center ">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz logo" className="w-28 object-contain" />

        <button
          type="button"
          onClick={openGitHub}
          aria-label="Visit GitHub profile"
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">Open AI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
