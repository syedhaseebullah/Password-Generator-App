import { useState, useCallback, useEffect, useRef } from "react";

function App() {

  // ..................VARIABLES.........................
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  //.........................MAIN PASSWORD GENERATOR........................
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const num = "0123456789"
    const char = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`"
    if (numAllowed) str += num
    if (charAllowed) str += char

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, setPassword])

  //.........................................PASSWORD REFERENCE...............................

  const passwordRef = useRef(null)
  const copyPassword = useCallback(() => {
    passwordRef.current?.select()

    window.navigator.clipboard.writeText(password)
  }, [password])



  return (
    <>
      {/*...............................START........................................ */}
      <div className="min-h-screen bg-cyan-600 flex justify-center items-start">
        <div className="bg-gray-700 p-5 px-10 text-orange-600 mt-10  rounded-lg  flex flex-wrap flex-col">


          <h1 className="text-4xl text-center text-white mb-5">Password Generator</h1>

          {/* .............................INPUT & BUTTONS....................... */}
          <div className="flex ">
            {/* .......//DISPLAY....... */}
            <input ref={passwordRef} type="text" value={password} readOnly placeholder="Password" className="outline-none mb-5 font-semibold rounded-l-lg py-1 px-2 text-gray-700 bg-white w-full" />


            {/* ........//COPY ..........*/}
            <button className="bg-blue-700 mb-5 font-semibold cursor-pointer outline-none px-3 py-0.5 rounded-r-lg text-white transition-all duration-200 ease-in-out hover:bg-blue-800 hover:scale-105 active:scale-95"
              onClick={copyPassword}>Copy
            </button>
          </div>

          {/* .............................LOWER PART.............................. */}
          <div className="w-full">
            <div className="flex flex-row gap-x-5 flex-wrap">

              {/* .....SLIDER .....*/}
              <div className="flex items-center gap-x-1">
                <input type="range" min={8} max={100} value={length} className="cursor-pointer" onChange={(e) => setLength(e.target.value)} />
                <label><span className="w-20 font-semibold inline-block text-orange-600 font-mono">Length:{length}</span></label>
              </div>
              {/* ....NUMBERS ..........*/}
              <div className="flex items-center gap-x-1">
                <input type="checkbox" checked={numAllowed} className="cursor-pointer" id="numberInput" onChange={() => setNumAllowed((prev) => !prev)} />
                <label htmlFor="numberInput" className="font-semibold cursor-pointer">Numbers</label>
              </div>
              {/* ....CHARACTER..... */}
              <div className="flex items-center gap-x-1">
                <input type="checkbox" checked={charAllowed} className="cursor-pointer" id="characterInput" onChange={() => setCharAllowed((prev) => !prev)} />
                <label htmlFor="characterInput" className="font-semibold cursor-pointer">Characters</label>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
