import copyCode from "./copyCode"

function addStatusTable () {
  const userId = document.querySelector(".loginbar .username")?.innerHTML
  // loginID와 푼사람의 ID가 같은지 확인하기 위해서 특정함.
  const statusTable = document.getElementById("status-table")

  const commitColumn = document.createElement("th")
  commitColumn.innerHTML = "Alub-commit"
  // commit header 추가
  const commitRow = document.createElement("td")
  
  if (statusTable?.childNodes[0]?.childNodes[0]?.childNodes?.length === 9){
      statusTable?.childNodes[0]?.childNodes[0]?.appendChild(commitColumn)
  } // column이 여러번 생성되지 않도록 제한.
  
  var tableLength = statusTable?.childNodes[1]?.childNodes?.length;
  if (typeof(tableLength) === 'number') {
      // for문을 사용하여 table에 각각 칸을 만들어주는 작업 + 맞을경우 commit버튼추가
      for (var i=tableLength - 1; i>=0; i--){
          if (statusTable?.childNodes[1]?.childNodes[i]?.childNodes?.length === 9){
              const result = statusTable?.childNodes[1]?.childNodes[i]?.childNodes[3]?.childNodes[0]?.textContent
              if ((result.includes('맞') || result.includes('100'))
              && userId === statusTable?.childNodes[1]?.childNodes[i]?.childNodes[1]?.textContent){ 
                  const answerNumber= statusTable?.childNodes[1]?.childNodes[i]?.childNodes[0]?.textContent
                  let newButton = commitRow.cloneNode(true)
                  const commitForm = document.createElement("form")
                  commitForm.action = `https://acmicpc.net/source/${answerNumber}`
                  const commitButton = document.createElement("button")
                  commitButton.innerHTML = "Commit"

                  commitForm.append(commitButton)
                  // commit하는 버튼을 row에 알맞게 추가.
                  newButton.appendChild(commitForm)
  
                  // appending same element over and over하면 1개만 추가됨 => for문이 실행될때 마다 cloneNode를 통해서 새로운 node를 추가해야 정상적으로 실행.
                  statusTable?.childNodes[1]?.childNodes[i]?.appendChild(newButton)
              } else {
                  let newButton = commitRow.cloneNode(false)
                  // cloneNode(false)의 경우 세부내용 전부 지워짐.
                  // 칸 만들어주는 용 추가.
                  statusTable?.childNodes[1]?.childNodes[i]?.appendChild(newButton)
              }
          }
      }
  }
  console.log("커밋버튼추가") 
}
export default addStatusTable