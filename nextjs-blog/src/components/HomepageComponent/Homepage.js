import React, { useState, useEffect } from 'react';

function Homepage() {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetchDatas();
    }, []);

    // Styles
    const mainblock = {
        background: '#ececed',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    }

    const homepageStyle = {
        position: 'relative',
        display: 'flex',
        height: '100%',
        width: '100%',
        maxWidth: '1000px',
        flexDirection: 'column',
        border: '1px solid #dbdee7',
        padding: '20px',
        marginBottom: '8px',
        background: '#fff5e0',
    }

    const buttonStyle = {
        position: 'relative',
        width: '200px',
        height: '40px',
        background: '#5050fa',
        color: '#fff',
        outline: 'none',
        border: '1px solid #eee',
        textalign: 'center',
        cursor: 'pointer',
    }

    const textStyle = {
        fontSize: '14px',
        fontColor: 'red'
    }

    const inputStyle = {
        height: '40px',
        width: '400px',
        marginBottom: '8px',
        padding: '0 10px'
    }

    const dateStyle = {
        fontSize: '12px',
        display: 'flex',
        position: 'relative',
    }

     // To fetch the values from API
    const fetchDatas = () => {
        fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/newsf6e2440.json').then(response => response.json()).then(datas => setData(datas))
    }

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    return (
        <div style={mainblock}>
            <h1>Welcome to NEWS Blog</h1>
            <input style={inputStyle} onChange={handleInput} type="text" placeholder="Type Publisher to search"></input>
            {
                data.filter((dat) => {
                    if ((input === '') || (dat.TITLE.toLowerCase().includes(input.toLowerCase()))) {
                        return dat
                    }
                })
                    .reverse().map((dat, index) => {
                        return (<div style={homepageStyle} key={index}>
                            <h3 style={textStyle}>{dat.ID}. {dat.TITLE}</h3>
                            <button style={buttonStyle} onClick={() => window.open(dat.URL)} target="_blank">{dat.PUBLISHER}</button><br />
                            <div style={dateStyle}>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(dat.TIMESTAMP)}</div>
                        </div>)
                    })
            }
        </div>
    )
}

export default Homepage