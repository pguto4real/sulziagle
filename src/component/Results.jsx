import React, { useEffect } from "react";
import { useResultContext } from "../context/ResultContextProvider";
import { Link, useLocation } from "react-router-dom";
import { Loading } from "./Loading";
import ReactPlayer from "react-player";
const Results = () => {
  const {
    results,
    getResults,
    searchTerm,
    setResults,
    loading: isLoading,
  } = useResultContext();
  const location = useLocation();
  useEffect(() => {

    setResults([])
    if (searchTerm) {
      if (location.pathname === "/videos") {
        
        getResults("videosearch", searchTerm);
      } else if (location.pathname === "/images") {
        getResults("imagesearch", searchTerm);
      } else if (location.pathname === "/news") {
        getResults("", searchTerm);
      } else {
        getResults("websearch", searchTerm);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.data?.result?.map(({ body, href, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <Link to={href} target="_blank">
                <p className="text-sm ">
                  {href.lenght > 30 ? href.substring(0, 30) : href}
                </p>
                <p
                  className="text-lg hover:underline dark:text-blue-300
                 text-blue-700"
                >
                  {title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.data?.result?.map(({ url, image, title }, index) => (
            <>
            {image&&(
            <div key={index} className="">
              <Link to={url} target="_blank" className="sm:p-3 p-5" key={index}>
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  height={100}
                  width={100}
                />
                <p className=" w-36 break-words text-sm mt-2">{title}</p>
              </Link>
            </div>)}
            </>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-between items-center space-y-6 sm:px-56">
          {results?.data?.news?.map(({ url, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <Link
                to={url}
                target="_blank"
                className="hover:underline"
                key={index}
              >
                <p className=" text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <div className="flex gap-4">
                  <Link
                    to={url}
                    target="_blank"
                    className="hover:underline"
                    key={index}
                  >
                    {url}
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap ">
          {results?.data?.result?.map(({ url, title, content }, index) => (
            <div key={index} className="p-2">

              {content && (<ReactPlayer
                url={content}
                controls
                width="355px"
                height="200px"
              />)}
            </div>
          ))}
        </div>
      );

      break;

    default:
      break;
  }
  return <div>Results</div>;
};

export default Results;
