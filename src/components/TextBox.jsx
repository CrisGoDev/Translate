import React from 'react'
import SelectDropdown from './SelectDropdown'
import { useState } from 'react';

function TextBox({ style, selectedLanguage, setshowModal, translatedText, textToTranslate, settextToTranslate, settranslatedText }) {

    const handleClick=()=>{
      settranslatedText('');

      settextToTranslate('');
    }
  return (
    <div className={style}>

      <SelectDropdown
        style={style}
        setShowModal={setshowModal}
        selectedLanguage={selectedLanguage}

      />

      <textarea
        placeholder={style == 'input' ? 'Enter Text' : 'Translation'}

        disabled={style == 'output'}
        onChange={(e)=>settextToTranslate(e.target.value)}
        value={style=='input'?textToTranslate:translatedText}

      />
      {style=='input' &&(
        <div className='delete' title='ELimina Todo' onClick={handleClick}>x</div>
      )}
    </div>
  )
}

export default TextBox