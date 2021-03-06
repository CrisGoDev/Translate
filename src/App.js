import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";
import { useState, useEffect,Suspense } from "react";
import axios from "axios";

function App() {
  const [showModal, setshowModal] = useState(null);
  const [inputLanguage, setinputLanguage] = useState("English");
  const [outputLanguage, setoutputLanguage] = useState("polish");
  const [Languages, setLanguages] = useState(null);
  const [textToTranslate, settextToTranslate] = useState("");
  const [translatedText, settranslatedText] = useState("");

  var validation = {};

  validation.language = false;
  validation.text = false;
  validation.load = false;

  const handleClick = () => {
    setinputLanguage(outputLanguage);
    setoutputLanguage(inputLanguage);
  };

  function Loading() {
    const isLoading = validation.load;
    if (isLoading === true) {
      return <div className="lds-dual-ring"></div>;
    }
  }

  const translate = () => {
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

    if (validation.text === false) {
      validation.text = true;
      axios
        .request(options)
        .then(function (response) {
          settranslatedText(response.data.data.translation);
          validation.text = false;
          validation.load = false;
        })
        .catch(function (error) {
          console.error(error);
          validation.text = false;
          validation.load = false;
        });
    }
  };

  useEffect(() => {
    const getLanguage = () => {
      console.log("hola");
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
          // validation.language = false;
          const arrayOfData = Object.keys(response.data.data).map(
            (key) => response.data.data[key]
          );
          setLanguages(arrayOfData);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    getLanguage();
  }, [Languages]);

  return (
    <div className="App">
      {!showModal && (
        <>
          <TextBox
            selectedLanguage={inputLanguage}
            stylea={"input"}
            setshowModal={setshowModal}
            textToTranslate={textToTranslate}
            settextToTranslate={settextToTranslate}
            settranslatedText={settranslatedText}
          />

          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>

         

          <Suspense fallback={<div>Loading...</div>}>
          <TextBox
            selectedLanguage={outputLanguage}
            setshowModal={setshowModal}
            translatedText={translatedText}
            settranslatedText={settranslatedText}
            stylea={"output"}
            loadi={validation.load}
          />
          </Suspense>

          <Loading/>

          <div className="button-container" title="Traduce" onClick={translate}>
            <Button />
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
