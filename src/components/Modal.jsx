import React from 'react'
import { useState } from 'react'

function Modal({ setshowModal,Languages, choosenLanguage,setchoosenLanguage }) {
  const [searchLanguage, setsearhLanguage] = useState('')


  const filteredLanguages = Languages.filter((language) =>
    language.toLowerCase().startsWith(searchLanguage.toLowerCase())
  )
  const handleChange = (e) => {
    setsearhLanguage(e.target.value)
  }

  const handleClick=(e)=>{
    setchoosenLanguage(e.target.textContent);
    setshowModal(null);
  }


  return (
    <div className="option-list">
      <div className="search-bar">
        <input  onChange={handleChange} />
        <div className="close-button" onClick={() => setshowModal(null)}>
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>
      </div>
      <div className="option-container">
        <ul>
          {filteredLanguages?.map((filteredLanguage, _index) => (
            <div className="list-item">
              <div className="icon">
                {choosenLanguage === filteredLanguage ? '✓' : ''}
              </div>
              <li
                key={_index}
                onClick={handleClick}
                stylea={{
                  color: choosenLanguage === filteredLanguage ? '#8ab4f8' : null,
                }}
              >
                {filteredLanguage}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Modal