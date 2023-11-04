import * as Papa from 'papaparse'

export async function sortCSV(files){

  var items = []; //{unit:'', path:''}
  Object.keys(files).forEach( key =>{
    items = items.concat(files[key].map( word => ({ unit: key , path: `/sort-anything/csv/${key}/${word}.csv`} )))
  })

  var keywordArr = {};  

  const promises = items.map( async item =>{
    var arr = await getCSVObject(item.path)    

    arr = arr.map( csvItem => {
      var keywords = (csvItem.keywords? csvItem.keywords.includes(',') ? csvItem.keywords.split(',').map(i=> i.trim()) : [csvItem.keywords.trim()]: []);
      keywords.forEach( a => {
        if(a in keywordArr){
          keywordArr[a].count += 1;
        } else{
          keywordArr[a] = {count: 1, unit : item.unit}
        }
      })
      return {...csvItem, value: parseFloat(csvItem.value), keywords : keywords }
    })
    return {...item, array : arr}
  })

  return await Promise.all(promises).then( dataArray =>{
    var sortedObj = {};
    dataArray.forEach( item => {
      if(item.unit in sortedObj){
        sortedObj[item.unit] =[...sortedObj[item.unit],...item.array]
      }else{
        sortedObj[item.unit] = item.array
      }
    })
    var outData =  { keywords : SortObjectToArray(keywordArr , 5)  , datas : sortedObj} 
    console.log( outData )
    return outData
  })

}

function SortObjectToArray  ( obj , maxCount ) {
  const sorted = Object.keys(obj).map( key => ({value : key, ...obj[key]})).filter( item => item.count > maxCount )
  sorted.sort( (a, b) => b.count - a.count )
  return sorted 
}

export async function getCSVObject(_path){
  return await fetch(_path)
    .then( async response => {
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      return results.data; 
    })
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