import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";

import { useLazyGetSummaryQuery } from "../services/article";

// The Demo component is responsible for fetching article summaries from the API
// and displaying the results to the user.
const Demo = () => {
  // State to store the current article's URL and its summary
  const [article, setArticle] = useState({ url: "", summary: "" });
  // State to store all articles that have been summarized
  const [allArticles, setAllArticles] = useState([]);
  // State to store the URL currently copied to the clipboard
  const [copied, setCopied] = useState("");

  // Hook to call the API using Redux Toolkit Query (lazy query)
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // When the component mounts, retrieve the list of articles from localStorage
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the API to get the article summary
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // Update the state with the new summary and the updated list of articles
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      // Save the updated list of articles to localStorage
      try {
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      } catch (error) {
        console.error("Failed to save articles to localStorage:", error);
      }
    }
  };

  // Function to handle copying the URL to the clipboard
  const handleCopy = (e, copyUrl) => {
    e.stopPropagation(); // Prevent event bubbling
    setCopied(copyUrl); // Mark the URL as the one currently copied
    // Copy the URL to the clipboard
    navigator.clipboard.writeText(copyUrl).catch((error) => {
      console.error("Failed to copy to clipboard:", error);
    });
    // Reset the "copied" state after 3 seconds
    setTimeout(() => setCopied(false), 3000);
  };

  // Render the component

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item) => (
            <div
              key={item.url}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div
                className="copy_btn"
                onClick={(e) => handleCopy(e, item.url)}
              >
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
