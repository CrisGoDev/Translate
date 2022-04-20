import React from 'react'
import SelectDropdown from './SelectDropdown'

function TextBox({ stylea, selectedLanguage, setshowModal, translatedText, textToTranslate, settextToTranslate, settranslatedText }) {

    const handleClick=()=>{
      settranslatedText('');

      settextToTranslate('');
    }
  return (
    <div className={stylea}>

      <SelectDropdown
        style={stylea}
        setShowModal={setshowModal}
        selectedLanguage={selectedLanguage}

      />

      <textarea
        placeholder={stylea === 'input' ? 'Enter Text' : 'Translation'}

        disabled={stylea === 'output'}
        onChange={(e)=>settextToTranslate(e.target.value)}
        value={stylea==='input'?textToTranslate:translatedText}

      />
      {stylea==='input' &&(
        <div className='delete' title='ELimina Todo' onClick={handleClick}>x</div>
      )}
    </div>
  )
}

export default TextBox