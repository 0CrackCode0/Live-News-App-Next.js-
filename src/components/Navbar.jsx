"use client"
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Navbar() {
    let [search, setSearch] = useState("")
    let [q, setQ] = useState("All")
    let [language, setLanguage] = useState("en")
    let params = useSearchParams()

    let navigate = useRouter()

    function postData(e) {
        e.preventDefault()
        navigate.push(`/?q=${search}&language=${language}`)
        setSearch("")
    }

    useEffect(() => {
        setQ(params.get("q") ?? "All")
        setLanguage(params.get("language") ?? "en")
    }, [params])
    return (
        <>
            <nav className="navbar navbar-expand-lg background sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light fw-bold" href={`/?q=All&language=${language}`}>Live News App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-light active" aria-current="page" href={`/?q=All&language=${language}`}>Home</Link>
                            </li>
                            <li className="nav-item"><Link className="nav-link text-light" href={`/?q=Politics&language=${language}`}>Politics</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" href={`/?q=Crime&language=${language}`}>Crime</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" href={`/?q=Education&language=${language}`}>Education</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" href={`/?q=Science&language=${language}`}>Science</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" href={`/?q=Technology&language=${language}`}>Technology</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" href={`/?q=Economics&language=${language}`}>Economics</Link></li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-light" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Others</a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href={`/?q=Sports&language=${language}`}>Sports</Link></li>
                                    <li><Link className="dropdown-item" href={`/?q=Cricket&language=${language}`}>Cricket</Link></li>
                                    <li><Link className="dropdown-item" href={`/?q=World&language=${language}`}>World</Link></li>
                                    <li><Link className="dropdown-item" href={`/?q=Market&language=${language}`}>Market</Link></li>
                                    <li><Link className="dropdown-item" href={`/?q=Health&language=${language}`}>Health</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-light" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Language</a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href={`/?q=${q}&language=hi`}>Hindi</Link></li>
                                    <li><Link className="dropdown-item" href={`/?q=${q}&language=en`}>English</Link></li>
                                    <li><Link className="dropdown-item" href={`/?q=${q}&language=ar`}>Arabic</Link></li>
                                    <li><Link className="dropdown-item" href={`/?q=${q}&language=fr`}>French</Link></li>
                                    <li><Link className="dropdown-item" href={`/?q=${q}&language=zh`}>Chinese</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={postData}>
                            <input className="form-control me-2" onChange={(e) => setSearch(e.target.value)} value={search} type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav >
        </>
    )
}
