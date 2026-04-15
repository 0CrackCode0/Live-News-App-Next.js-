"use client"
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import InfiniteScroll from 'react-infinite-scroll-component'

import NewsItem from "@/components/NewsItem"
export default function Home() {
  let [page, setPage] = useState(1)
  let [articles, setArticles] = useState([])
  let [totalResults, setTotalResults] = useState(0)

  let [q, setQ] = useState("All")
  let [language, setLanguage] = useState("en")
  let params = useSearchParams()

  async function getAPiData(q, language) {
    let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&language=${language}&pageSize=24&page=1&sortBy=publishedAt&apiKey=1d6318d3fb0246fa88ce54497e616a7c`)
    response = await response.json()
    if (response.status === "ok") {
      setArticles(response.articles)
      setTotalResults(response.totalResults)
    }
  }

  async function fetchData() {
    setPage(page + 1)
    let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&language=${language}&pageSize=24&page=1&sortBy=publishedAt&apiKey=1d6318d3fb0246fa88ce54497e616a7c`)
    response = await response.json()
    if (response.status === "ok") {
      setArticles(articles.concat(response.articles))
    }
  }


  useEffect(() => {
    let q = params.get("q") ?? "All"
    let language = params.get("language") ?? "en"
    setQ(q)
    setLanguage(language)
    getAPiData(q, language)
  }, [params])

  return (
    <>
      <div className="background text-center text-light p-2 mt-2 text-capitalize">{q} News Articles</div>
      <div className="container-fluid">
        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchData}
          hasMore={articles.length < totalResults}
          loader={<div className="d-flex justify-content-end m-5">
            <button className="btn btn-success" type="button" disabled>
              <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
              <span className="ms-2" role="status">loading more...</span>
            </button>
          </div>
          }
        >
          <div className="row">
            {
              articles.map((item, index) => {
                return <NewsItem
                  key={index}
                  source={item.source?.name}
                  title={item.title}
                  description={item.description}
                  date={item.publishedAt}
                  pic={item.urlToImage}
                  url={item.url}

                />
              })
            }
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}
