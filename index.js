import fs from 'fs';


var nameArray = []

function formatFile(fName){

    // read file into string
    let text = fs.readFileSync(fName, { encoding: 'utf8', flag: 'r' })
    
    // convert string into array based on new line char
    text = text.split('\n')
    
    // variabale for holding all lines from file in one line
    let fullText = ""

    // convert to one line and remeove "=" at the end of each line
    for(let i=0; i < text.length; ++i){
        // when file gets to the end of html stop running
        if (text[i].replace(/\s+/g, "") === 
            'Content-Type: text/css\n'.replace(/\s+/g, "")){
                i = text.length
        } else {
            // append line to end of 
            fullText = fullText.concat(text[i].slice(0,text[i].length-2))
        }
    }

    // write to file for error checking
    fs.writeFile('Output.txt', fullText, (err) => {
          
        // In case of a error throw err.
        if (err) throw err;
    })

    return fullText
}

function findNames(text){

    // regex for values seaching for
    let reg = "break\">.{1,200}</span>"

    //find names
    const array = [...text.matchAll(reg)];

    return array
}

function addToNameArray(array){
    
    for(let i=0; i<array.length; ++i){
        nameArray.push(array[i][0])
    }
}

function initSomething(dName){
    // directory full of filles to be processed 
    
    // amout of file is the directory
    var dFiles = fs.readdirSync(dName).length
    

    // get the names from each file and add to array of names
    for(let i=0; i<dFiles; ++i){
        let text = formatFile(dName+"/"+i.toString()+".mhtml")
        let array = findNames(text)
        addToNameArray(array)
        
    }
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

function findMatches(){
    let array = nameArray.filter(onlyUnique)

    console.log("array length: ", array.length, ", inital length: ", nameArray.length)
}

    let holdName = "D1Vault"

  initSomething(holdName)

  findMatches()



function fileRename(dName){

    // DIRECTORY NAME
    // let dName = "vow"
    
    // amout of file is the directory
    var dFiles = fs.readdirSync(dName).length

    //get the names from each file and add to array of names
    for(let i=0; i<dFiles; ++i){
        fs.renameSync(dName+"/"+"King_s Fall World_s First Leaderboard _ D1 Raid Report"+(i+1).toString()+".mhtml", dName+"/"+i.toString()+".mhtml")

        
    }
}

// fileRename(holdName)

// make a sextoy that allows the user to see when the host is online so you can fap with them