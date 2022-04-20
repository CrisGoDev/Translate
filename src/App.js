import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [showModal, setshowModal] = useState(null);
  const [inputLanguage, setinputLanguage] = useState("English");
  const [outputLanguage, setoutputLanguage] = useState("polish");
  const [Languages, setLanguages] = useState(null);
  const [textToTranslate, settextToTranslate] = useState("");
  const [translatedText, settranslatedText] = useState("")

  var validation = {};

  validation.language=false;
  validation.text=false;

  const handleClick = () => {
    setinputLanguage(outputLanguage);
    setoutputLanguage(inputLanguage);
  };

  const getLanguage = () => {
    if (validation.language === false) {
      validation.language = true;
      
      const options = {
        method: "GET",
        url: "https://google-translate20.p.rapidapi.com/languages",
        headers: {
          "X-RapidAPI-Host": "google-translate20.p.rapidapi.com",
          "X-RapidAPI-Key":
            "06689421e7mshbf3b8228c6d7a10p1c613djsn78e19ac784c2",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          validation.language = false;
          const arrayOfData = Object.keys(response.data.data).map(
            (key) => response.data.data[key]
          );
          setLanguages(arrayOfData);
        })
        .catch(function (error) {
          validation.language = false;
          console.error(error);
        });
    }
  };

  const translate = () => {

    console.log('estoy traduciendo')
    const options = {
      method: "GET",
      url: "https://google-translate20.p.rapidapi.com/translate",
      params: {
        text: textToTranslate,
        tl: outputLanguage,
        sl: inputLanguage,
      },
      headers: {
        "X-RapidAPI-Host": "google-translate20.p.rapidapi.com",
        "X-RapidAPI-Key": "06689421e7mshbf3b8228c6d7a10p1c613djsn78e19ac784c2",
      },
    };

    if(validation.text===false){
      validation.text=true
      axios
      .request(options)
      .then(function (response) {
        settranslatedText(response.data.data.translation)
        validation.text=false;
      })
      .catch(function (error) {
        console.error(error);
        validation.text=false;
      });
    }
  };



  useEffect(() => {
    getLanguage();
  }, []);

  return (
    <div className="App">
      {!showModal && (
        <>
          <TextBox
            selectedLanguage={inputLanguage}
            style={"input"}
            setshowModal={setshowModal}
            textToTranslate={textToTranslate}
            settextToTranslate={settextToTranslate}
            settranslatedText={settranslatedText}

          />

          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>

          <TextBox
            selectedLanguage={outputLanguage}
            setshowModal={setshowModal}
            translatedText={translatedText}
            settranslatedText={settranslatedText}
            style={"output"}
          />

          <div className="button-container" title="Traduce" onClick={translate}>
            <Button/>
          </div>
        </>
      )}

      {showModal && (
        <Modal
          Languages={Languages}
          setshowModal={setshowModal}
          choosenLanguage={
            showModal === "input" ? inputLanguage : outputLanguage
          }
          setchoosenLanguage={
            showModal === "input" ? setinputLanguage : setoutputLanguage
          }
        />
      )}
    </div>
  );
}

export default App;
