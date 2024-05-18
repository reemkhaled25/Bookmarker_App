var sitename = document.getElementById("SiteName");
var siteurl = document.getElementById("SiteURL");
var siteslist = [];
if (localStorage.getItem("list")) {
  siteslist = JSON.parse(localStorage.getItem("list"))
  display()
}
function additem() {
  if (sitename.value && siteurl.value) {
    if (isUrlValid(siteurl.value)) {
      var site = {
        name: sitename.value,
        url: siteurl.value
      }
      siteslist.push(site)
      localStorage.setItem('list', JSON.stringify(siteslist))
      display()
      clearform()
    } else {
      window.alert("url is not correct")
      clearform()
    }
  } else {
    window.alert("Please, enter data in all fields")
    clearform()
  }
}
function display() {
  var temp = "";
  for (var i = 0; i < siteslist.length; i++) {
    temp += `<tr>
        <td>`+ (i + 1) + `</td>
        <td>`+ siteslist[i].name + `</td>
        <td><button class="btn visit" onclick="visit(`+ i + `)">
        <i class="fa-solid fa-eye me-1"></i>Visit
      </button></td>
        <td><button class="btn delete" onclick="removeitem(`+ i + `)">
          <i class="fa-solid fa-trash-can me-1"></i>Delete
        </button></td>
      </tr>`
  }
  document.getElementById('myData').innerHTML = temp;

}
function clearform() {
  sitename.value = "";
  siteurl.value = "";
}
function removeitem(x) {
  siteslist.splice(x, 1)
  localStorage.setItem('list', JSON.stringify(siteslist))
  display()
}
function isUrlValid(url) {
  var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if(res == null)
      return false;
  else
      return true;
}
function visit(index) {

  if(siteslist[index].url.startsWith("https://")){
    window.open(siteslist[index].url, "_blank")
  }else{
    var site_url="https://"+siteslist[index].url;
    window.open(site_url, "_blank")
  }
  
}
