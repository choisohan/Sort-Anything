
export async function getCSVObject(_path){
    return  fetch(_path)
        .then(response => response.text())
        .then( text => csvToJSON(text) )
}


function csvToJSON(csvText) {
    // Split the CSV text into an array of lines
    const lines = csvText.split('\n');
    
    // Get the column headers (first line)
    const headers = lines[0].split(',');
    
    // Initialize an array to store the JSON objects
    const jsonArray = [];
    
    // Loop through the lines (starting from the second line)
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');
      const jsonObject = {};
      
      // Loop through the columns
      for (let j = 0; j < headers.length; j++) {
        // Use the header as the key and the current line's value as the value
        jsonObject[headers[j].trim().toLowerCase()] = currentLine[j];
      }
      
      jsonArray.push(jsonObject);
    }
    
    return jsonArray;
  }
  
export function getRandomItemsFromArray(array, numItems) {
  var arr = [];
  while (arr.length < Math.min( array.length , numItems)){
    var rNumb = Math.floor( array.length * Math.random() )
    arr.push( rNumb )
  }
  return arr.map( i => array[i]); 
}
  

export function shuffleArray(_arr) {
  var array = [..._arr]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array; 
}

export function getRandomYearItem(_arr, count){
  var myObj = {};
  _arr.forEach(item=>{
    if(myObj[item.year]){
      myObj[item.year] = [...myObj[item.year], item]
    }else{
      myObj[item.year] = [item]
    }
  })

  var shuffledKeys = shuffleArray(Object.keys(myObj))
  shuffledKeys = shuffledKeys.slice(0, count);
  console.log( shuffledKeys )
  return shuffledKeys.map( key=> myObj[key][0])

}

export const getScore = (arr)=>{
  var _score = 100;     
  arr.forEach( (item, index)=>{
      const dist = Math.floor(Math.abs(item.year - item.yearAnswered));
      arr[index].distance = dist; 
      _score -= dist;
  })

}


export const colorArr = [ "99B898","FF847C","E84A5F","2A363B","F8B195","F67280","C06C84","6C5B7B","355C7D","A8E6CE","FFAAA6","FF8C94","A8A7A7","CC527A","E8175D","474747","363636","9DE0AD","45ADA8","547980","594F4F","FE4365","FC9D9A","F9CDAD","C8C8A9","83AF9B" ]
export const getRandomColor =()=>{
  const randIndex = Math.floor(Math.random() * colorArr.length)
  return '#'+colorArr[randIndex]
}