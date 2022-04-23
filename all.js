const addBtn = document.querySelector(".btn_add");
const txt = document.querySelector(".txt");
const list = document.querySelector(".list");
const tab = document.querySelector(".tab");
const listTodo = document.querySelector(".list_footer p span");
let toggleTab = "all";
let data = [];

//新增
function renderData() {
  let str = "";
  let count = 0;
  data.forEach(function (item, index) {
    if (item.checked == false) {
      //count+=1放在if裡 這樣轉true才不會也被計算到
      count += 1;
      //這邊屬於全部跟TODO
      if (toggleTab == "all" || toggleTab == "todo") {
        str += `<li>
              <label class="checkbox" for="">
                <input type="checkbox"  data-num="${index}"/>
                <span>${item.content}</span>
              </label>
              <a href="#" class="delete" data-num="${index}"></a>
            </li>`;
      }
    } else if (
      //篩選出有打勾的跟tab點到all 或是完成的 只要是有打勾的就不符合上面的false 就會加上checked
      (item.checked == true && toggleTab == "all") ||
      (item.checked == true && toggleTab == "done")
    ) {
      //如果checked=true 就會在input那加上checked 來讓他被畫線
      str += `<li>
      <label class="checkbox" for="">
        <input type="checkbox" data-num="${index}" checked/>
        <span>${item.content}</span>
      </label>
      <a href="#" class="delete" data-num="${index}"></a>
    </li>`;
    }
  });

  list.innerHTML = str;
  listTodo.textContent = count;
}
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (txt.value == "") {
    alert("請輸入內容");
    return;
  }
  let obj = {};
  obj.content = txt.value;
  obj.checked = false; //預設每項記事都是Todo //
  data.push(obj);
  txt.value = ""; //input裡面的值清空
  renderData();
});
//刪除
list.addEventListener("click", function (e) {
  let num = e.target.getAttribute("data-num");
  if (e.target.nodeName == "A" && e.target.getAttribute("class") == "delete") {
    //準確的選到A連結上的delete才會刪除
    e.preventDefault();
    data.splice(num, 1); //選到data-num的筆數刪除自己一筆
  } else {
    //如果沒點到delete就更改data.checked的狀態
    data[num].checked = !data[num].checked;
  }

  renderData();
});

//切換list
tab.addEventListener("click", function (e) {
  e.preventDefault();
  let tab = document.querySelectorAll(".tab li");
  tab.forEach(function (item) {
    item.setAttribute("class", ""); //li上的class變成空值
  });
  e.target.setAttribute("class", "active"); //點擊到的添加active
  toggleTab = e.target.getAttribute("data-tab"); //點到哪個tab data-tab就跟著改

  renderData();
});

const deleteAll = document.querySelector(".deleteAll");
deleteAll.addEventListener("click", function (e) {
  e.preventDefault;

  let newData = [];
  data.forEach(function (item) {
    if (item.checked == false) {
      //篩選出false 還沒被畫線 還沒被完成的
      // 推到新的資料 所以清除已完成項目也不是真正的清除只是資料被篩選掉而已
      newData.push(item);
    }
  });
  data = newData;
  renderData();
});

//用鍵盤新增
const input = document.querySelector('input');
input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
  e.preventDefault();
  if (txt.value == "") {
    alert("請輸入內容");
    return;
  }
  let obj = {};
  obj.content = txt.value;
  obj.checked = false; //預設每項記事都是Todo //
  data.push(obj);
  txt.value = ""; //input裡面的值清空
  renderData();
  }
});

